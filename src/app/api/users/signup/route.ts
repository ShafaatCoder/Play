import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    try{
        await connect();
        const body = await request.json();
        const {username, email, password} = body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json({message:"User already exists"}, {status:400});
        } 
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        });
        await newUser.save();
        return NextResponse.json({message:"User created successfully",
            success: true,status:201});
    }   
    catch(error){
        console.log("Error in signup route:", error);
        return NextResponse.json({message:"Internal Server Error"}, {status:500});
    }   
}
