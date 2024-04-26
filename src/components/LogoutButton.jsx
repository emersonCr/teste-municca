"use client"
import { signOut } from "next-auth/react"

export default ({foo}) => <button onClick = { () => signOut() }type="button" className="btn btn-primary">logout</button>