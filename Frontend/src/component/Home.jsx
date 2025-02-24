import React from 'react'
import Navbar from './Navbar'
import Header from './components/Header'
import Categories from './components/Categories'
import LatestJobs from './components/LatestJobs'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Header/>
      <Categories/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}
