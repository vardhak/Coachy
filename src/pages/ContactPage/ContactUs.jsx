import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

function ContactUs() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isSending, setIsSending] = useState(false)

    const sendMessage = async (e) => {
        e.preventDefault()
        setIsSending(true)

        const cleanedMessage = message
            .trim()                         // Remove leading/trailing whitespace
            .replace(/\s+/g, ' ')           // Replace multiple spaces/newlines with a single space

        try {
            const res = await axios.post(`${BASE_URL}/sendContactMessage`, {
                name: name.trim(),
                email: email.trim(),
                message: cleanedMessage
            })

            if (res.status === 200) {
                toast.success('Message sent successfully!')
                setName('')
                setEmail('')
                setMessage('')
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.')
            console.error(error)
        } finally {
            setIsSending(false)
        }
    }


    return (
        <div className='pt-16'>
            <div className='grid min-[800px]:grid-cols-2 grid-cols-1 px-4 py-10 w-[88%] mx-auto gap-y-6'>
                <div className='flex flex-col justify-center items-start gap-y-10 h-full rounded-lg bg-primary text-white p-5'>
                    <div>
                        <h1 className='text-2xl font-semibold'>Call Us</h1>
                        <p>+91-0772907171</p>
                        <p>+91-0772907171</p>
                    </div>
                    <div>
                        <h1 className='text-2xl font-semibold'>Location</h1>
                        <p>121 Rock Sreet, 21 Avenue, New York, NY 92103-9000</p>
                    </div>
                    <div>
                        <h1 className='text-2xl font-semibold'>Email</h1>
                        <p>admin@coachy.com</p>
                    </div>
                </div>

                <div className='text-center'>
                    <div className='flex justify-center items-center flex-col w-[90%] mx-auto'>
                        <h1 className='text-4xl'>Have any question?</h1>
                        <p className='text-slate-500 text-xl my-3 max-w-[300px]'>Our email address will not be published. Required fields are marked*</p>
                    </div>

                    <form onSubmit={sendMessage} className='flex justify-center items-center flex-col max-w-[400px] mx-auto'>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full border-b-2 border-black p-2 m-2'
                            placeholder='Enter Your Name'
                        />
                        <input
                            type='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full border-b-2 border-black p-2 m-2'
                            placeholder='Enter Valid Email'
                        />
                        <textarea
                            rows={4}
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='w-full border-b-2 border-black p-2 m-2'
                            placeholder='Write Message'
                        />
                        <input
                            type="submit"
                            disabled={isSending}
                            className={`w-xs mt-5 cursor-pointer bg-primary text-white p-2 rounded-lg`}
                            value={isSending ? "Sending..." : "Send Message"}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
