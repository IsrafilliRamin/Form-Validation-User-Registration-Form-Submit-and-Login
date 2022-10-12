import React from 'react'
import home from "../home.jpg"
import "../App.css"
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='home'>
      <img src={home} alt="img" />
      <Link className='homebtn' to="/">Go To back</Link>
    </div>
  )
}

export default Home
