"use client"
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
// import {axios} from "axios"



export default function LoginPage(){
    const [user,setUser] = React.useState({
        // username:"",
        email:"",
        password:""
    })
    const onLogin = async()=>{}

   return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="">Login Page</h1>
            <hr />
            {/* <label htmlFor="username" >Username</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" 
            type="text"
            id="username"
            value={user.username}
            onChange={(e)=>setUser({...user, username:e.target.value})}
            placeholder="username"/> */}

            <label htmlFor="email" >Email</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" 
            type="email"
            id="email"
            value={user.email}
            onChange={(e)=>setUser({...user, email:e.target.value})}
            placeholder="email"/>
            <label htmlFor="password" >Password</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" 
            type="password"
            id="password"
            value={user.password}
            onChange={(e)=>setUser({...user, password:e.target.value})}
            placeholder="password"/>

        <button 
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="submit">Login</button>
        <p>Dont't have an account? <Link className="text-blue-500" href={"/signup"}>Sign up</Link></p>
        </div>)
}