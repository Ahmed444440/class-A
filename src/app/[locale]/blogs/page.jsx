import initTranslations from '@/app/i18n'
import MainBackground from '@/components/MainBackground'
import { services } from '@/data'
import DOMPurify from 'isomorphic-dompurify'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { fetchData } from '../../../../utils/api'



export async function generateMetadata({ params }) {
    const { locale } = params
    const response = await fetchData('api/blogs', locale)
    const categories = response.data
  
  
    return {
      title: categories.meta_title  || "",
      description: categories.meta_title || "",
      other: {
        title: categories.meta_details || "",
      }
  
    }
  }



const Blogs = async ({ params }) => {

    const truncateText = (text, wordCount) => {
        return text?.split(' ').slice(0, wordCount).join(' ') + '...';
    };

    const i18nNamespaces = ["home"];

    const { locale } = params


    const { t } = await initTranslations(locale, i18nNamespaces)
    const Data = await fetchData(`api/blogs`, locale)
    const brands = Data?.data

    return (
        <section>

            <MainBackground />

            <div>
                <div className='grid grid-cols-1 lg:grid-cols-2  gap-10 lg:mx-28 py-10'>
                    {brands?.map((item, index) => (
                        <div key={index} className=" mt-5 border-2 border-gray-100 rounded-xl shadow-lg">
                            {/* "bg-white rounded-lg shadow-md overflow-hidden */}
                            <div className="">
                                <div className="text-center">
                                    <img className='mx-auto  w-72 h-72 lg:w-full object-cover' alt={'img'} src={item.photo} />
                                    <div className='px-16 py-5'>
                                        <h2 className="text-xl font-bold text-slate-800  ">{t(item.title)}</h2>
                                        <div className=" text-[15px] text-dark_gray  font-[500] " dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(t(truncateText(item.details, 20)), {
                                                ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'li', 'ol', 'span'],
                                                ALLOWED_ATTR: ['href', 'target', 'style']
                                            })
                                        }} />
                                        <div className='my-5'>
                                            <Link href={`/blogs/${item.slug}`} className={'text-white  bg-primary_Color_Light hover:bg-primary_Color_dark py-3 px-4'} >
                                                {t("Read More")}
                                            </Link>
                                        </div></div>


                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}

export default Blogs