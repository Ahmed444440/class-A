import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const Subscription = () => {
    const { t, i18n } = useTranslation()

    const [formData, setFormData] = useState({
        email: '',
    });
    const [responseMessage, setResponseMessage] = useState('');

    const ResponseMessage = ({ message }) => {
        if (!message) return null;

        return (
            <div className="py-2 mx-32  font-semibold">
                <p className={`text-lg ${message === 'Message sent successfully!' ? 'text-white' : 'text-black'}`}>
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
            const response = await fetch('https://api.classafoods.com/api/submit-subscriptions', requestOptions);

            const result = await response.json();
            console.log(result)

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
        <section>
            <div className='bg-primary_Color_Light '>
                <div className='block lg:flex justify-between  items-center text-center lg:text-start lg:mx-28 py-10'>
                    <div>
                        <h3 className='text-3xl text-white'>{t("Subscribe for")}<span className='text-black font-bold '>{t("News")}</span>{t("letter")}</h3>
                    </div>
                    <form onSubmit={handleSubmit} className='block lg:flex items-center gap-5'>
                        <input type='email' id='email' name='email' required value={formData.email} onChange={handleChange} className='block  m-auto  py-4 my-5 px-5 w-[90%] lg:w-full ' placeholder={t("Email")} />
                        <button type='submit' className='border-2 text-white border-white py-[15px] px-6'>{t("Subscribe")}</button>

                    </form>




                </div>
                
                <div className='flex justify-end '>
                    <ResponseMessage message={responseMessage} />
                </div>
            </div>
        </section>
    )
}

export default Subscription