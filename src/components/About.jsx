import initTranslations from '@/app/i18n'
import Link from 'next/link'
import React from 'react'
import { fetchData } from '../../utils/api';
import DOMPurify from 'isomorphic-dompurify';


const About = async ({ params }) => {

    const truncateText = (text, wordCount) => {
        return text?.split(' ').slice(0, wordCount).join(' ') + '...';
    };
    const i18nNamespaces = ["home"];

    const { locale } = params


    const { t } = await initTranslations(locale, i18nNamespaces)
    const Data = await fetchData(`api/about-us`, locale)
    const aboutData = Data?.data

    return (
        <section className='bg-light_gray pt-4'>
            
            <div className='lg:mt-10 mt-0 px-5 lg:px-5 py-5'>
                <div className='block lg:flex justify-between '>
                    <div className=' w-full lg:w-[45%]  text-center lg:text-start'>
                        <h3 className='text-xl lg:text-3xl'>{t(aboutData?.title)}</h3>
                        <div className='pt-5 pb-10 text-meduim_gray  text-[15px] leading-8 ' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t(truncateText(aboutData?.details || '', 50))) }} />
                        <Link href={'/about'} className='bg-primary_Color_Light hover:bg-primary_Color_dark px-5 py-3 text-white'>{t("Read More")} </Link>
                    </div>
                    <div className='w-full lg:w-[50%] mt-10 lg:mt-0'>
                        <img className='object-cover w-full h-full' src={aboutData?.photo} />

                    </div>

                </div>
            </div>


        </section>
    )
}

export default About