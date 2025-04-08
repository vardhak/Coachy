import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import axios from 'axios'

function ContactMsgBox({ id, name, email, message, viewed: initialViewed }) {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [showPopup, setShowPopup] = useState(false)
    const [viewed, setViewed] = useState(initialViewed)

    const handleView = async () => {
        setShowPopup(true)
        if (!viewed) {
            try {
                await axios.put(`${BASE_URL}/contactMessage/markViewed/${id}`)
                setViewed(true)
            } catch (err) {
                console.error("Error updating viewed status", err)
            }
        }
    }

    return (
        <div className="">
            {!viewed && (
                <div className='relative top-4 right-0 bg-green-400 text-green-100 w-[20px] h-[20px] rounded-full flex justify-center items-center text-xs z-10'>
                    1
                </div>
            )}

            <div className='border shadow-md rounded-lg flex justify-between items-center p-4'>
                <div>
                    <h1 className='uppercase text-xl font-semibold'>{name}</h1>
                    <p className='text-slate-500'>{email}</p>
                </div>
                <Button className='cursor-pointer' onClick={handleView}>
                    View
                </Button>
            </div>

            {showPopup && (
                <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
                    <div className='bg-white w-[450px] h-[400px] overflow-y-auto shadow-xl rounded-lg flex flex-col justify-between py-5 px-6'>
                        <h1 className='text-2xl uppercase text-center mb-2'>Message</h1>
                        <p className='text-slate-700 overflow-y-auto flex-grow mb-4 text-lg'>{message}</p>
                        <Button
                            className='bg-red-500 text-white hover:bg-red-600 cursor-pointer'
                            onClick={() => setShowPopup(false)}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ContactMsgBox
