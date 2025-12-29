import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Navbar = () => {
  return (
    <header>
        <nav>
            <Link  href="/"className='logo' >
            <Image src="/icons/logo.png" height={24} width={24} alt="logo"/>
            <p>Dev Event</p>
            </Link>
            <ul>
            <li><Link href="#events">Events</Link></li>
            <li><Link href="#about">About</Link></li>
            <li><Link href="#contact">Contact</Link></li>
            </ul>
        </nav>
        
        
        </header>
  )
}

export default Navbar