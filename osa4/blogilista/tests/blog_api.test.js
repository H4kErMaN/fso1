const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

let token = null
let userId = null

const setupUserAndLogin = async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'testuser', name: 'Test User', passwordHash })
  const savedUser = await user.save()
  userId = savedUser._id

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'testuser', password: 'sekret' })
  token = loginResponse.body.token
}

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await setupUserAndLogin()

    // Alkublogit liitetään testikäyttäjälle
    const blogsWithUser = helper.initialBlogs.map(blog => ({
      ...blog,
      user: userId
    }))
    await Blog.insertMany(blogsWithUser)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('unique identifier property of blogs is named id', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]

    assert.ok(firstBlog.id, 'blog should have id property')
    assert.strictEqual(firstBlog._id, undefined, 'blog should not have _id property')
  })

  describe('addition of a new blog', () => {
    test('a valid blog can be added with a valid token', async () => {
      const newBlog = {
        title: 'Async/await simplifies making async calls',
        author: 'Full Stack Open',
        url: 'https://fullstackopen.com/osa4/',
        likes: 3,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert.ok(titles.includes('Async/await simplifies making async calls'))
    })

    test('adding fails with status 401 if token is not provided', async () => {
      const newBlog = {
        title: 'Blog without token',
        author: 'No One',
        url: 'https://example.com',
        likes: 0,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert.ok(!titles.includes(blogToDelete.title))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
