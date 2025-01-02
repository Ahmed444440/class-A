
import { iconsNavbar, navbarLink } from '@/data';
import Link from 'next/link';
import React from 'react';
import { fetchApi, fetchData } from '../../utils/api';
import initTranslations from '@/app/i18n';

const Footer = async ({ params }) => {
    const i18nNamespaces = ["home"];

    const { locale } = params
    const { t } = await initTranslations(locale, i18nNamespaces)
    const response = await fetchData(`api/settings`, locale)
    const setting = response?.data



    // api/social-media

    const res = await fetchApi(`api/social-media`, locale)
    const social = res?.data


    return (
        <section className='bg-footer relative lg:px-14 z-0'>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-90 z-10"></div>

            {/* Content */}
            <div className='relative z-20 block lg:flex items-center  gap-10  text-center lg:text-start'>

                <div className='lg:w-[50%] text-center'>
                    <div className='py-10 text-center m-auto'>
                        <img alt='logo' className='w-56 m-auto' src={setting?.logo} />
                    </div>
                    <p className="text-dark_gray text-lg ">{t(setting?.footer)}</p>

                    <div className='justify-center flex lg:gap-10 py-10 mx-10 lg:mx-0'>
                        {
                            iconsNavbar?.map((icon, index) => (
                                <div className='m-auto lg:m-0 ' key={index}>
                                    <Link target='_blank' href={
                                        icon.name === 'FaceBook' ? social.facebook :
                                            icon.name === 'Instagram' ? '/' :
                                                icon.name === 'Twitter' ? social.twitter :
                                                    icon.name === 'Google' ? '/' :
                                                        icon.name === 'LinkedIn' ? social.linkedin : '/'
                                    } className=' fill-white hover:fill-primary_Color_Light cursor-pointer'>{icon.icon}</Link>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* <div className='lg:w-[20%] lg:py-10'>
                    <div className='mt-10'>{
                        navbarLink.map((item, index) => (
                            <div className='my-4' key={index}>
                                <Link className='text-white  hover:text-primary_Color_Light text-lg font-semibold' href={item.path}>{t(item.name)}</Link>
                            </div>
                        ))
                    }
                    </div>
                </div> */}

                <div className='lg:w-[50%] py-10  '>
                    <div className='lg:flex gap-2 lg:items-start justify-start'>
                        <div className='flex gap-3 justify-center '>
                            <svg width={20} className=' fill-primary_Color_Light' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" /></svg>
                            <p className='text-dark_gray text-lg   '>{t("Address")}:</p>
                        </div>

                        <div className='block'>
                            {
                                setting?.addresses.map((item, index) => (
                                    <p key={index} className='font-bold  text-white'>{item}</p>

                                ))
                            }   </div>
                    </div>

                    <div className='lg:flex gap-2 my-10 justify-center lg:justify-start'>
                        <div className='flex gap-3 justify-center '>
                            <svg width={18} className="fill-primary_Color_Light"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>

                            <p className='text-dark_gray text-lg  mt-3 '>{t("Email")}:</p>

                        </div>

                        <div className='block '>
                            {
                                setting?.contact_emails?.map((item, index) => (
                                    <p key={index} className='font-bold  text-white'>{item}</p>

                                ))
                            }

                        </div>
                    </div>


                    <div className='lg:flex gap-2 items-start  justify-center lg:justify-start'>

                        <div className='flex gap-3 justify-center '><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            className=" mt-1 fill-primary_Color_Light"
                            viewBox="0 0 512 512"
                        >
                            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                        </svg>
                            <p className='text-dark_gray text-lg   '>{t("phone")}: </p>

                        </div>

                        <div className='block '> {
                            setting?.phones?.map((item, index) => (
                                <p key={index} className='font-bold text-white py-1'>{item}</p>

                            ))
                        }
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Footer;