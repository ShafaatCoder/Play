"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios";
import toast from "react-hot-toast";
// import {axios} from "axios"




export default function SignupPage(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        username:"",
        email:"",
        password:""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])
    const [loading, setLoading] = React.useState(false);
    const onSignup = async()=>{
        try{
            setLoading(true);
            const respose = await axios.post("/api/users/signup", user);
            console.log("Signup successful", respose.data);
            router.push("/login");

        }catch(error: any){
            console.log("Signup failed", error);
            toast.error(error.message)


        }finally{
            setLoading(false);
        }

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="">{loading?"sign up":"processing"}</h1>
            <hr />
            <label htmlFor="username" >Username</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" 
            type="text"
            id="username"
            value={user.username}
            onChange={(e)=>setUser({...user, username:e.target.value})}
            placeholder="username"/>

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
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="submit">{buttonDisabled?"No Signup":"Signup"}</button>
        <p>Already have an account? <Link className="text-blue-500" href={"/login"}>Login</Link></p>
        </div>)

}