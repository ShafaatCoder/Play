"use client"
import React from 'react'
import Image from 'next/image'
const ExploreBtn = () => {
  return (
    <div>

    <button type='button'
            id='explore-btn'
        className='mt-7 mx-auto'
    onClick={()=>console.log("Clicked")}>
        
        <a href="#events">Explore Events 
            <Image src="/icons/arrow-down.svg" height={24} width={24} alt="arrow down" className='inline-block ml-2'/>
        </a>
        
        </button>    

    </div>
  )
}

export default ExploreBtn