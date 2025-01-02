'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import { fetchData } from '../../utils/api';
import { useTranslation } from 'react-i18next';
import LoaderComponent from'./LoaderComponent';

const Blogs = () => {

    const truncateText = (text, wordCount) => {
        return text?.split(' ').slice(0, wordCount).join(' ') + '...';
    };

    const breakpoints = {
        1024: {
            slidesPerView: 3,
            spaceBetween: 20,

        },
        768: {
            slidesPerView: 2,
            spaceBetween: 10,

        },
        320: {
            slidesPerView: 1,
            spaceBetween: 0,

        },
        310: {
            slidesPerView: 1,
            spaceBetween: 0,

        },
    };


    const [loading, setLoading] = useState(true)
    const { t, i18n } = useTranslation()
    const [blogs, setData] = useState([])
    useEffect(() => {
        const fetchBlog = async () => {
            const response = await fetchData(`api/blogs`, i18n.language)
            setData(response?.data)
            setLoading(false)
        }

        fetchBlog()
    }, [])


    return (
        <section className='lg:px-28 py-20'>

            <h3 className='text-center text-4xl font-semibold'>{t("Our Blogs")}</h3>
            {
                loading || blogs.length == 0? (
                    <LoaderComponent/>
                ) : (<Swiper
                    slidesPerView={3}
                    breakpoints={breakpoints}
                    autoplay={{ delay: 4000 }}
                    speed={1000}
                    loop={true}
                    modules={[Navigation, Autoplay, Pagination]}

                >
                    <div>
                        {blogs?.map((item, index) => (
                            <SwiperSlide key={index} className=" mt-5">
                                {/* "bg-white rounded-lg shadow-md overflow-hidden */}
                                <div className="text-center lg:text-start">
                                    <div className="p-1">
                                        <img className='mx-auto  object-cover' alt={'img'} src={item?.photo} />
                                        <h2 className="text-xl font-bold text-slate-800  mb-2 mt-5">{t(item?.title)}</h2>
                                        <div className=" text-[15px] text-dark_gray  font-[500] " dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize((truncateText(t(item?.details || ''), 20))) }} />
                                        <div className='my-10'>
                                            <Link href={`/blogs/${item.slug}`} className={'text-black border-2 border-gray-400   hover:border-primary_Color_Light hover:text-primary_Color_Light py-3 px-4'} >
                                                {t("Read More")}
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </div>

                </Swiper>)
            }


        </section>
    )
}

export default Blogs