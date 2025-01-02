'use client'
import initTranslations from '@/app/i18n'
import MainBackground from '@/components/MainBackground'
import DOMPurify from 'isomorphic-dompurify'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { fetchData } from '../../utils/api'
const SliderProduct =  ({ slides, params }) => {
    const { locale } = params || {};  // التأكد من وجود params قبل الوصول إلى locale
    const [i18n, setI18n] = useState(null);

    useEffect(() => {
        const fetchDataAsync = async () => {
            if (!locale) return; // إذا لم يكن locale موجودًا، لا تبدأ عملية جلب البيانات.

            const i18nNamespaces = ["home"];
            const i18nTranslations = await initTranslations(locale, i18nNamespaces);
            setI18n(i18nTranslations);
        };
        console.log(slides);  // التأكد من البيانات المرسلة إلى المكون
        fetchDataAsync();
    }, [locale, slides]);

    // إضافة شرط التحقق من وجود البيانات ووجود الـ `slides`
    if (!i18n || !slides || slides.length === 0) return <p>Loading...</p>;

    return (
        <section>
            <MainBackground />
            <div className='bg-light_gray'>
                <div className='lg:pt-10 mt-0 px-5 lg:px-5 py-5'>
                    <div className='block lg:flex justify-between'>
                        <div className='w-full h-full lg:w-[50%] mt-10 lg:mt-0'>
                            <Swiper
                                className="static h-5/6 lg:h-[70vh]"
                                dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                                key={i18n.language}
                                loop={true}
                                autoplay={{ delay: 5000 }}
                                effect="fade"
                                pagination={{ clickable: true }}
                                modules={[Navigation, Autoplay, EffectFade]}
                                navigation={{
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                }}
                            >
                                <div className={`swiper-button-next text-white`}></div>
                                <div className={`swiper-button-prev text-white`}></div>
                                
                                        <SwiperSlide key={index} className="swiper-slide h-[200px]">
                                            <img className='w-full h-80' src={slides?.photo} alt={`Slide ${index}`} />
                                        </SwiperSlide>
                                
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SliderProduct;

