import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'

const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

function App() {

  const [loading, setLoading] = useState(false)
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('random user');

  const getRandomPerson = async () => {
    setLoading(true)
    const response = await fetch(url);

    const randomPerson = await response.json();

    const {
      name,
      email,
      dob,
      location,
      cell,
      picture,
      login } = randomPerson.results[0];

    const person = {
      name: `${name.first} ${name.last}`,
      email,
      age: dob.age,
      street: `${location.street.name} ${location.street.number}`,
      password: login.password,
      phone: cell,
      image: picture.large
    }

    setPerson(person);
    setTitle('name');
    setValue(person.name)

    setLoading(false)
  }

  useEffect(() => {
    getRandomPerson();
  }, [])

  const onMouseOverHandler = (e) => {
    if (e.target.classList.contains('icon')) {
      setTitle(e.target.dataset.label)
      setValue(person[title])
    }
  }

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img src={(person && person.image) || defaultImage} alt="person" />
          <p className="user-title">
            My {title} is
          </p>
          <p className="user-value">
            {value}
          </p>
          <div className="values-list">
            <button className="icon" onMouseOver={onMouseOverHandler} data-label="name">
              <FaUser />
            </button>
            <button className="icon" onMouseOver={onMouseOverHandler} data-label="email">
              <FaEnvelopeOpen />
            </button>
            <button className="icon" onMouseOver={onMouseOverHandler} data-label="age">
              <FaCalendarTimes />
            </button>
            <button className="icon" onMouseOver={onMouseOverHandler} data-label="street">
              <FaMap />
            </button>
            <button className="icon" onMouseOver={onMouseOverHandler} data-label="phone">
              <FaPhone />
            </button>
            <button className="icon" onMouseOver={onMouseOverHandler} data-label="password">
              <FaLock />
            </button>
          </div>
          <button className="btn" onClick={getRandomPerson}>
            {loading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>
    </main >
  )
}

export default App
