import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import getBaseUrl from '../utils/baseURL'
import { useNavigate } from 'react-router-dom'

const SellerLogin = () => {
    const [message, setMessage] = useState("")
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/seller`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const auth = response.data;
            if(response.status === 200) {
                localStorage.setItem('sellerToken', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('sellerToken')
                    alert('Token has expired! Please login again.');
                    navigate("/")
                }, 3600 * 1000);

                alert("Seller Login successful!")
                navigate("/seller-dashboard")
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage(error.response?.data?.message || "Connection error. Please try again.") 
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-100">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Seller Portal</h2>
                    <p className="mt-2 text-sm text-gray-600">Access your seller dashboard</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <input 
                                {...register("username", { required: true })}
                                type="text"
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                            />
                        </div>
                        <div className="mb-4">
                            <input 
                                {...register("password", { required: true })}
                                type="password"
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {message && <p className="text-red-500 text-sm text-center">{message}</p>}

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Access Seller Dashboard
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SellerLogin
