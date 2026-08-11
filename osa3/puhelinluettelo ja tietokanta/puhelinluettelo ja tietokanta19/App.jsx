personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        showNotification(`Added ${returnedPerson.name}`)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        const serverMessage = error.response?.data?.error
        showNotification(
          serverMessage || `Failed to add ${personObject.name}`,
          'error'
        )
      })
