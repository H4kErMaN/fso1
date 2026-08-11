const Person = ({ person, deletePerson }) => (
  <p>
    {person.name} {person.number}
    {' '}
    <button onClick={deletePerson}>delete</button>
  </p>
)

const Persons = ({ persons, deletePerson }) => (
  <div>
    {persons.map(person => (
      <Person
        key={person.name}
        person={person}
        deletePerson={() => deletePerson(person)}
      />
    ))}
  </div>
)

export default Persons
