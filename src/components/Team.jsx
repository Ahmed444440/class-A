'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import 'swiper/css/navigation' // Ensure this is included
import "swiper/css/pagination";
import 'swiper/css/autoplay'
import { useTranslation } from 'react-i18next';
import LoaderComponent from './LoaderComponent';
import { fetchData } from '../../utils/api';

const Team = () => {


    const [loading, setLoading] = useState(true)
    const { t ,i18n} = useTranslation()
    const [team, setData] = useState([])
    useEffect(() => {
        const fetchTeam = async () => {
            const response = await fetchData(`api/teams`, i18n.language)
            setData(response?.data)
            setLoading(false)
        }

        fetchTeam()
    }, [])

    console.log(team)
    return (
        <section className='py-20 lg:px-28'>
            {/* images */}
            <h3 className='text-center text-4xl font-semibold'>{t("Our Team")}</h3>
            {
                loading ? (<LoaderComponent />) : (<div className='py-10'>
                    <Swiper
                        className=''
                        modules={[Autoplay]}
                        spaceBetween={10}
                        slidesPerView={1}
                        speed={2000}
                        loop={true}
                        autoplay={{ delay: 50 }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                        }}

                    >
                        {team.map((partner, index) => (
                            <SwiperSlide key={index}>
                                <img className='w-[250px] h-[250px] rounded-full m-auto' src={partner.photo} alt={`Partner ${index + 1}`} />
                                <p className='text-center py-2 font-semibold text-lg'>{t(partner.title)}</p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>)
            }

        </section>
    )
}

export default Team