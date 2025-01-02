'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import { fetchData } from '../../utils/api';
import { useTranslation } from 'react-i18next';
const Ourbranch = () => {
    const { t ,i18n} = useTranslation()
    return (
        <section className='lg:px-28 py-14 bg-gray-100'>
            <h3 className='text-center text-4xl font-semibold'>{t("Our Branch")}</h3>

            <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-7xl mt-6 ">
        {/* الخريطة */}
        <div className="">
          <img src="../assets/capture.png" alt="" className='h-full w-full object-cover' />
        </div>

        {/* معلومات الاتصال */}
        <div className="grid grid-cols-2 gap-4">
          {/* رقم الهاتف */}
          <div className="bg-white rounded-lg text-center shadow p-4 h-36">
            <h2 className="text-xl text-center  font-bold mb-2">Adress</h2>
            <p>باسيون طريق القناطر نزلة الدائري شارع المعهد الأزهري</p>
          </div>
          <div className="bg-white rounded-lg text-center shadow p-4 h-36">
            <h2 className="text-xl text-center font-bold mb-2">Adress</h2>
            <p>باسيون طريق القناطر نزلة الدائري شارع المعهد الأزهري</p>
          </div>
          <div className="bg-white rounded-lg text-center shadow p-4 h-36">
            <h2 className="text-xl text-center font-bold mb-2">Adress</h2>
            <p>باسيون طريق القناطر نزلة الدائري شارع المعهد الأزهري</p>
          </div>
          {/* Adress */}
          <div className="bg-white rounded-lg text-center shadow p-4 h-36">
            <h2 className="text-xl text-center font-bold mb-2">Adress</h2>
            <p>باسيون طريق القناطر نزلة الدائري شارع المعهد الأزهري</p>
          </div>

          {/* البريد الإلكتروني */}
          <div className="bg-white rounded-lg text-center shadow p-4 h-36">
            <h2 className="text-xl text-center font-bold mb-2">Adress</h2>
            <p>باسيون طريق القناطر نزلة الدائري شارع المعهد الأزهري</p>
          </div>
          <div className="bg-white rounded-lg text-center shadow p-4 h-36">
            <h2 className="text-xl text-center font-bold mb-2">Adress</h2>
            <p>باسيون طريق القناطر نزلة الدائري شارع المعهد الأزهري</p>
          </div>
        </div>
      </div>
        </section>
    )
}

export default Ourbranch;