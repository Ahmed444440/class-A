'use client'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { useTranslation } from 'react-i18next';

const MainBackground = () => {
    const {t}=useTranslation()
    const path = usePathname()
    const pathSegments = path.split('/').filter((item) => item);
    const pathName = decodeURIComponent(pathSegments[pathSegments.length - 1])
    const NewPathName =pathName.replace(/-/g, ' ')


    return (
        <div className='text-center relative w-full h-[45vh] lg:h-[45vh] '>
            <Image
                src='/assets/header.jpg'
                alt='img'
                layout='fill'
                objectFit='cover'
                quality={100}
                className='w-full h-full'
                sizes="(max-width: 600px) 150vw,
               (max-width: 1200px) 50vw,
               "
            />
            <div className='absolute inset-0  bg-black  bg-opacity-70' />
            <div className=''>
                <div className='absolute w-full top-[35%]'>
                    <h1 className='font-serif text-center text-4xl text-white font-semibold py-10 capitalize'>{t(NewPathName.toUpperCase())}</h1>
                    {/* <div className='text-white text-[9px] lg:text-[13px]'>{path?.startsWith('/') && (
                        <div className='flex items-center gap-2'>
                            <svg width={16} className='fill-white ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" /></svg>
                            <Link href={'/'} className='hover:text-primary_Color_Light'>{t("Home")}</Link>


                            <div className='flex items-center'>
                                {pathSegments
                                    .filter((segment) => segment !== 'ar' && segment !== 'singleproduct') // Filter out 'ar' and 'singleproduct'
                                    .map((item, index) => {
                                        const filteredSegments = pathSegments.filter((segment) => segment !== 'ar' && segment !== 'singleproduct');
                                        const href = `/${filteredSegments.slice(0, index + 1).join('/')}`;
                                        const isLast = index === filteredSegments.length - 1;

                                        return isLast ? (
                                            <li key={index} className="flex items-center">
                                                <span className='mx-2'>/</span>
                                                <span className="text-white">{decodeURIComponent(t(item))}</span>
                                            </li>
                                        ) : (
                                            <li key={index} className="flex items-center">
                                                <Link href={href}>
                                                    <p className="text-white  ">
                                                        <span className='mx-2'>/</span>
                                                        <span className='hover:text-primary_Color_Meduim'> {decodeURIComponent(t(item))}</span>
                                                    </p>
                                                </Link>
                                            </li>
                                        );
                                    })}
                            </div>



                        </div>
                    )}</div> */}
                </div>
            </div>
        </div>
    )
}

export default MainBackground