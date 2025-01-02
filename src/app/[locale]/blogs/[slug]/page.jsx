import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { brandImages, produscts, services } from '@/data'
import DOMPurify from 'isomorphic-dompurify'
import MainBackground from '@/components/MainBackground'
import initTranslations from '@/app/i18n'
import { fetchData } from '../../../../../utils/api'



export async function generateMetadata({ params }) {
    const slug = params.slug

    const { locale } = params
    const response = await fetchData(`api/single-blog/${slug}`, locale)
    const categories = response.data


    return {
        title: categories.meta_title || "",
        description: categories.meta_title || "",
        other: {
            title: categories.meta_details || "",
        }

    }
}


const BrandDetails = async ({ params }) => {


    const truncateText = (text, wordCount) => {
        return text?.split(' ').slice(0, wordCount).join(' ') + '...';
    };

    const i18nNamespaces = ["home"];

    const { locale } = params
    const slug = params.slug


    const { t } = await initTranslations(locale, i18nNamespaces)
    const Data = await fetchData(`api/single-blog/${slug}`, locale)
    const brandsDetails = Data?.data




    return (
        <section>

            <MainBackground />

            <div className=' px-5 lg:px-28 py-20'>
                <div className='block lg:flex justify-between '>
                    <div className=' w-full lg:w-[45%]  text-center lg:text-start'>
                        <h3 className='text-xl lg:text-3xl font-semibold'>{t(brandsDetails?.title)}</h3>
                        <div className=" text-meduim_gray  text-[18px] leading-10 " dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(t(brandsDetails.details), {
                                ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'li', 'ol', 'span'],
                                ALLOWED_ATTR: ['href', 'target', 'style']
                            })
                        }} />
                    </div>
                    <div className='w-full lg:w-[45%] mt-10 lg:mt-0'>
                        <img className='object-cover' src={brandsDetails?.photo} />

                    </div>

                </div>

            </div>

        </section>
    )
}

export default BrandDetails