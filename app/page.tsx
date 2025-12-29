import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'
import { title } from 'process'
import React from 'react'
import {events} from '@/lib/constants'
// import EventCard from '@/components/EventCard'
// import Navbar from '@/components/Navbar'



function page() {
  // throw new Error("My Principal page error");
  return (

    <>
      {/* <Navbar/> */}
     <section className='text-center'>
      <h1>
      The hub of every Developer <br />
      Events you can't miss!!
      </h1>
      <p className='text-center mt-5'>
        Tech Talks, Workshops, Hackathons, Meetups, and Conferences <br />
        Discover, Connect, and Grow with the Developer Community <br />
        Stay Updated with the Latest Trends and Innovations in Tech <br />
        Join Us and Elevate Your Developer Journey!
      </p>
      <ExploreBtn/>

      <div className='mt-20 space-y-7'>
        
        <h3>Featured Events</h3>
        <ul className='events'>
          {events.map((event)=>{
            return <li key={event.title}>
              <EventCard {...event} />

            </li>
          })}
        </ul>
      
      </div>


     </section>
    </>
  )
}

export default page