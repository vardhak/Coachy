import React, { useEffect, useState } from 'react';
import ContactMsgBox from './ContactMsgBox';
import axios from 'axios';

function DashContactMsg() {
    const [messages, setMessages] = useState([]);
    const BASE_URL = import.meta.env.VITE_BASE_URL;


    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/getMessages`);
                setMessages(res.data);
            } catch (err) {
                console.error('Error fetching messages:', err);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="top-18 relative">
            <h1 className='text-3xl font-semibold capitalize'>Contact Messages Box</h1>

            <div className='grid mt-5 grid-cols-1 gap-4'>
                {messages.map(msg => (
                    <ContactMsgBox
                        key={msg._id}
                        id={msg._id}
                        name={msg.name}
                        email={msg.email}
                        message={msg.message}
                        viewed={msg.viewed}
                    />
                ))}
            </div>
        </div>
    );
}

export default DashContactMsg;
