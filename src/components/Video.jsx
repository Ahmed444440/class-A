'use client'
import React, { useEffect, useState } from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import Link from 'next/link';
import { fetchData } from '../../utils/api';
import { useTranslation } from 'react-i18next';

const Video = () => {
    const [showImage, setShowImage] = useState(true);

    const { t, i18n } = useTranslation()

    const [mediaData, setData] = useState([])
    useEffect(() => {
        const fetchSlider = async () => {
            const media = await fetchData(`api/videos`, i18n.language)
            setData(media?.data)

        }

        fetchSlider()
    }, [])

    return (
        <section className='bg-partner ' >

            <div className='lg:mx-28 py-20 lg:flex relative z-20 '>

                <div className='m-auto lg:m-0 w-[90%] lg:w-[100%] border-[1px] border-light_gray border-opacity-15 lg:p-16'>
                    <div className='lg:w-[100%]  text-center '>
                        <h3 className='text-white text-xl lg:text-3xl font-semibold pt-5 pb-10'>{t("Innovations & Integration to lead the market.")}
                        </h3>
                      
                        <div className='py-14'>
                            <Link href={'/media'} className='border-2 px-10 py-3 shadow-lg text-black font-semibold text-lg  bg-white'>{t("Show Videos")}</Link>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default Video