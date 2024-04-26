"use client";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";;

export default async function Dashboard(){
    const session = await getServerSession();
    console.log("ttttt",session);
    if(!session){
        redirect("/");
    }
    return <>
    <p>Ola</p></>
}