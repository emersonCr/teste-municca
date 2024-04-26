"use client";

import { redirect } from 'next/navigation'
import React,{useState} from "react";

export default async function RegisterForm() {
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState(null);
    const _register = (e)=>{
        e.preventDefault();
        console.log("ccccc");
        redirect("/dashboard");
    }
    const register = async (e)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password")
        }

        try{
            const response = await fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar os dados');
            }

            
            console.log(response)

            const responseData = await response.json();

            setResponseMessage(responseData.message);
            redirect("/");

        } catch (error) {
            setError(error.message);
        }
        
    }

    return <>
        <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-lg w-full space-y-8 bg-gray-100 p-5 border-solid border-1 border-gray-200 shadow-lg shadow-gray-500/50">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Faça seu Cadastro
          </h2>
        </div>
            <form onSubmit={_register} >
            <div className="mt-5">
                <div className="w-full py-1">
                    <label>Nome</label>
                </div>
                <div>
                    <input type="text" name="name" className="input input-primary w-full" />
                </div>
            </div>    
            <div className="mt-5">
                <div className="w-full py-1">
                    <label>Email</label>
                </div>
                <div>
                    <input type="email" name="email" className="input input-primary w-full" />
                </div>
            </div>
            <div className="mt-5">
            <div className="py-1">
                <label>Senha</label>
            </div>
            <div>
            <input name="password" className="input input-primary w-full" />
            </div>
            </div>
            <div className=" mb-20 mt-10 py-2">

            <button type="submit"  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Cadastrar</button>
            </div>
            </form>
        </div>
        </div>
    </>   
}