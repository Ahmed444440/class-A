import MainBackground from '@/components/MainBackground'
import React from 'react'
import { fetchData } from '../../../../utils/api';
import initTranslations from '@/app/i18n';
import Vision from '@/components/icons/Vision';
import Mission from '@/components/icons/Mission';
import Values from '@/components/icons/Values';




export async function generateMetadata({ params }) {
    const { locale } = params

    return {
        title: locale === 'ar' ? 'معلومات عن | Class A' : locale === 'en' ? "Information about  | Class A" : '',
        description: locale === 'ar' ? 'معلومات عن | Class A' : locale === 'en' ? "Information about  | Class A" : '',
        other: {
            title: locale === 'ar' ? 'معلومات عن | Class A' : locale === 'en' ? "Information about  | Class A" : '',
        }

    }
}

const About = async ({ params }) => {
    const i18nNamespaces = ["home"];

    const { locale } = params

  const { t } = await initTranslations(locale, i18nNamespaces)

  const philosophyData = await fetchData(`api/business`, locale)
  const Philosophy = philosophyData?.data

  const Datas = await fetchData(`api/business-models`, locale)
  const business = Datas?.data


    const Data = await fetchData(`api/about-us`, locale)
    const aboutData = Data?.data



    return (
        <section>
            <MainBackground />
            <div>
                <div className=' lg:mt-10 mt-0 px-5 lg:px-5 py-5'>
                    
                    <div className='block lg:flex justify-between '>
                        <div className=' w-full lg:w-[45%]  text-center lg:text-start'>
                            <h3 className='text-xl lg:text-3xl'>{t(aboutData?.title)}</h3>
                            <div className='pt-5 pb-10 text-meduim_gray  text-[15px] leading-8' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t(aboutData?.details)) }} />
                            {/* <p className='pt-5 pb-10 text-meduim_gray  text-[15px] leading-8 '>{t(aboutData?.details)}</p> */}
                        </div>
                        <div className='w-full h-full lg:w-[50%] mt-10 lg:mt-0'>
                            <img className='object-cover' src={aboutData?.photo} />

                        </div>

                    </div>
                </div>
            </div>
            <h3 className='text-3xl text-center lg:text-4xl py-10 px-3 lg:px-0'>{t("Our Vision , Mission and Values")}</h3>
            <div className='lg:mt-10 mt-0 px-5 lg:px-5 py-5 grid grid-cols-1 lg:grid-cols-3  gap-5'>
            {
              business?.map((item, index) => (
                <div key={index} className={`${index == 2 ?'lg:':''}  my-5 lg:mt-0 border-gray-300 border-[1px] rounded-lg text-center p-5`}>
                  {index == 0 ? (<Vision />) : index == 1 ? (<Mission />) : (<Values />)}
                  <h4 className='font-semibold text-xl'>{t(item?.title)}</h4>
                  <div className='text-[16px] text-gray-600 py-3' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t(item?.details )) }} />

                </div>
              ))
            }
          </div>
        </section>
    )
}

export default About