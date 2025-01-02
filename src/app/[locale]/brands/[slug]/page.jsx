import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { brandImages, produscts, services } from '@/data'
import DOMPurify from 'isomorphic-dompurify'
import MainBackground from '@/components/MainBackground'
import initTranslations from '@/app/i18n'
import { fetchData } from '../../../../../utils/api'
import LoaderComponent from '@/components/LoaderComponent'



export async function generateMetadata({ params }) {
    const slug = params.slug

    const { locale } = params
    const response = await fetchData(`api/single-category/${slug}`, locale)
    const categories = response.data
  
  
    return {
      title: categories.meta_title  || "",
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
    const Data = await fetchData(`api/single-category/${slug}`, locale)
    const brandsDetails = Data?.data




    return (
        <section>

            <MainBackground />

            <div className=' px-5 lg:px-5'>
                {/* <div className='block lg:flex justify-between '>
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

                </div> */}




                <div className='py-10'>

                    <div className='text-center'>
                        <h1 className='text-primary_Color_dark py-3 font-semibold text-[25px]'>{t(brandsDetails?.title)}</h1>
                        <div className="w-4/5 m-auto text-meduim_gray  text-[15px] leading-6 " dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(t(brandsDetails.details), {
                                ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'li', 'ol', 'span'],
                                ALLOWED_ATTR: ['href', 'target', 'style']
                            })
                        }} />
                        <h3 className='text-4xl font-semibold mt-4'>{t("Our Product")}</h3>
                    </div>


                    {
                        brandsDetails?.products?.length == 0? <>
                          <p className='text-center pt-20 capitalize text-xl text-gray-500 font-semibold'> NO data found</p>
                        </> : (<div className='grid grid-cols-1 lg:grid-cols-4  lg:gap-4 lg:mx-10 py-10'>
                            {brandsDetails?.products?.map((item, index) => (
                                <div key={index} className=" mt-5  border-2 border-gray-100 rounded-xl shadow-lg">
                                    <div className="">
                                        <div className="text-center">
                                            <img className='mx-auto w-72 h-72 lg:w-full' alt={'img'} src={item.photo} />
                                            <div className='py-2'> <h2 className="text-xl font-bold text-slate-800  mb-2 mt-5">{t(item.title)}</h2>
                                                <div className=" text-[15px] text-dark_gray  font-[500] " dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(t(truncateText(item.details, 20)), {
                                                        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'li', 'ol', 'span'],
                                                        ALLOWED_ATTR: ['href', 'target', 'style']
                                                    })
                                                }} />
                                                <div className='my-4'>
                                                    <Link href={`/brands/${t(brandsDetails?.slug)}/${t(item.slug)}`} className={'text-white  bg-primary_Color_Light hover:bg-primary_Color_dark py-3 px-4'} >
                                                        {t("Read More")}
                                                    </Link>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>)
                    }




                </div>


            </div>

        </section>
    )
}

export default BrandDetails