'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const Form = () => {

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
        body: formdata ,
        redirect: "follow",
       };                      
      const response = await fetch('https://api.classafoods.com/api/contact-submit', requestOptions);

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
    <form onSubmit={handleSubmit} className=''>
      <div className=''>
        <input type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required className='block border-[1px] text-gray-700 placeholder:text-gray-700  border-slate-200  py-3 my-5 px-5 w-full' placeholder={t('Name' )}/>
        <input type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required className='block border-[1px] text-gray-700 placeholder:text-gray-700  border-slate-200  py-3 my-5 px-5 w-full' placeholder={t('Email')} />
        <input type='number'
          id='phone'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          required className='block border-[1px] text-gray-700 placeholder:text-gray-700  border-slate-200  py-3 my-5 px-5 w-full' placeholder={t('Phone')} />
      </div>
      <textarea id='message'
        name='message'
        value={formData.message}
        onChange={handleChange}
        required className='block border-[1px] text-gray-700 placeholder:text-gray-700  border-slate-200  py-3 my-5 px-5 w-full' cols={5} placeholder={t('Message')} />
      <div>
        <button type='submit' className='bg-primary_Color_Light text-white px-10 py-3 float-end hover:bg-primary_Color_dark hover:text-lg'>{t("Send")}</button>
      </div>
      
      <div>
        <ResponseMessage message={responseMessage} />
      </div>
    </form>
  )
}

export default Form