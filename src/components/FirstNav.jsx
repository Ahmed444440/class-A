"use client"
import { iconsNavbar } from '@/data'
import React, { useEffect, useState } from 'react'
import LanguageChanger from './LanguageChanger'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { fetchApi, fetchData } from '../../utils/api'

const FirstNav = ({ showmenuIcon }) => {


    const { t, i18n } = useTranslation()
    const [setting, setData] = useState([])
    const [social, setSocial] = useState([])

    useEffect(() => {
        const fetchSetting = async () => {
            const response = await fetchData(`api/settings`, i18n.language)
            setData(response?.data)
        }

        const fetchSocial = async () => {
            const res = await fetchApi(`api/social-media`, i18n.language)
            setSocial(res?.data)
        }

        fetchSocial()
        fetchSetting()




    }, [])





    return (
        <>
            {
                showmenuIcon === false && (<section className='flex justify-between items-center px-28 py-6'>
                    <div className='flex gap-5'>
                        {
                            iconsNavbar?.map((icon, index) => (
                                <div className='' key={index}>
                                    <Link href={
                                        icon.name === 'FaceBook' ? social.facebook || '/' :
                                            icon.name === 'Instagram' ? '/' :
                                                icon.name === 'Twitter' ? social.twitter || '/' :
                                                    icon.name === 'Google' ? '/' :
                                                        icon.name === 'LinkedIn' ? social.linkedin || '/' : '/'} className='hover:fill-primary_Color_Light cursor-pointer'>{icon.icon}</Link>
                                </div>
                            ))
                        }
                    </div>

                    <div className='flex  items-center gap-10'>

                        <div className='flex gap-5 items-center'>
                            <div className='px-1 py-[5px] rounded-lg bg-dark_gray'>

                                <svg width={23} className="fill-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>
                            </div>

                            <div>
                                <div>
                                    {
                                        setting?.contact_emails?.map((item ,index) => (
                                            <Link key={index} href={`mailto:${item}`}> 
                                                 <p className='text-dark_gray text-xl'>{item}</p>
                                            </Link>
                                        ))
                                    }
                                </div>
                                <p className='text-dark_gray text-[15px]'>{t("Our email")}</p>
                            </div>
                        </div>



                        {/* <div className='flex gap-5 items-center'>
                            <div className='px-2 py-2 rounded-lg bg-dark_gray'>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={20}
                                    className="fill-white"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                                </svg>
                            </div>
                            <div>
                                {
                                    setting?.photos?.map((item) => (
                                        <p className='text-dark_gray text-xl'>{item}</p>

                                    ))
                                }
                                <p className='text-dark_gray text-[15px]'>9:00 A.M - 5:00 P.M</p>
                            </div>
                        </div> */}

                        {/* <div>
                            <Link href={'/'} className='bg-primary_Color_Light  hover:bg-primary_Color_dark  text-white py-3 px-10 text-center text-lg'>Contact</Link>
                        </div> */}
                        <LanguageChanger />
                    </div>

                </section >)
            }

        </>

    )
}

export default FirstNav