'use client'
import React, { useState } from 'react'
import Subscription from './Subscription'
import { useTranslation } from 'react-i18next';

const Contact = () => {

     const { t, i18n } = useTranslation()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [responseMessage, setResponseMessage] = useState('');

    const ResponseMessage = ({ message }) => {
        if (!message) return null;

        return (
            <div className="mt-6 text-center">
                <p className={`text-lg ${message === 'Message sent successfully!' ? 'text-green-900' : 'text-red-500'}`}>
                    {message}
                </p>
            </div>
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {


            const myHeaders = new Headers();
            myHeaders.append("Accept-Language", i18n.language);
            myHeaders.append("Cookie", "laravel_session=qqnKJa8kJEfXJDFZdRxVxOndbiYVEz6rjs4uLiyr");


            const formdata = new FormData();
            formdata.append("name", formData.name);
            formdata.append("phone", formData.phone);
            formdata.append("email", formData.email);
            formdata.append("message", formData.message);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow",
            };
            const response = await fetch('https://api.classafoods.com/api/contact-submit', requestOptions);

            const result = await response.json();
            // console.log(result)

            if (response.status && result.data) {
                setResponseMessage('Message sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            } else {
                setResponseMessage('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setResponseMessage('An error occurred. Please try again.', error);
        }

        setTimeout(() => {
            setResponseMessage('')
        }, 3000)
    };
    return (
        <section className='contact-bg'>
            <div className=' block lg:flex  gap-20 items-center lg:mx-28 py-20'>
                <div className='lg:w-[50%]'>
                {/* <h3 className='lg:text-3xl text-start ms-10 lg:ms-0 text-[25px] w-[75%] font-semibold lg:leading-[75px]'> */}

                    <h3 className='text-[25px] text-start ms-10 lg:ms-0 lg:text-[45px] w-[75%] font-semibold lg:leading-[75px]'>
                        {/* If you have questions,contact us */}
                       {t("If you have an inquiry, we are happy to receive your inquiry at any time.")}
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className='lg:w-[50%] mx-5 lg:mx-0'>
                    <input onChange={handleChange} type='text' name='name' id='name' value={formData.name} required className='block border-[1px] text-gray-700 placeholder:text-gray-700  border-slate-200  py-3 my-5 px-5 w-full' placeholder={t('Name' )}/>
                    <input onChange={handleChange} type='email' name='email' id='email' value={formData.email} required className='block border-[1px] text-gray-700 placeholder:text-gray-700  border-slate-200  py-3 my-5 px-5 w-full' placeholder={t('Email')} />
                    <input onChange={handleChange} type='text' name='phone' id='phone' value={formData.phone} required className='block border-[1px] text-gray-700 placeholder:text-gray-700  border-slate-200  py-3 my-5 px-5 w-full' placeholder={t('Phone')} />
                    <textarea onChange={handleChange} name='message' id='message' value={formData.message} required className='block border-[1px] text-gray-700 placeholder:text-gray-700  border-slate-200  py-3 my-5 px-5 w-full' placeholder={t('Message')} cols={5} />
                    <div className='flex justify-end'>
                        <button type='submit' className=' bg-primary_Color_Light hover:bg-primary_Color_dark text-white  text-lg py-2 px-10'>{t("Send")}</button>

                    </div>

                    <div>
                        <ResponseMessage message={responseMessage} />
                    </div>
                </form>



            </div>


            {/* red subscribe */}
        

        </section>
    )
}

export default Contact