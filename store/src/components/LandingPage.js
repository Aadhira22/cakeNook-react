import React from 'react'
import CakeList from './Cakes/Cakes'
import Hero from './Hero/Hero'
import FeaturesSection from "./info";

const LandingPage = () => {
  return (
    <>
        <Hero />
        <CakeList />
        <FeaturesSection/>
    </>
  )
}

export default LandingPage