import Mission from '@/components/icons/Mission'
import Values from '@/components/icons/Values'
import Vision from '@/components/icons/Vision'
import MainBackground from '@/components/MainBackground'
import Link from 'next/link'
import React from 'react'
import { fetchData } from '../../../../utils/api'
import initTranslations from '@/app/i18n'
import DOMPurify from 'isomorphic-dompurify'





export async function generateMetadata({ params }) {
  const { locale } = params

  return {
      title: locale === 'ar' ? 'اهدافنا و رؤيتنا و مهمتنا عن | Class A' : locale === 'en' ? "the vision , mission  and our goals   about  | Class A" : '',
      description: locale === 'ar' ? 'اهدافنا و رؤيتنا و مهمتنا عن | Class A' : locale === 'en' ? "the vision , mission  and our goals   about  | Class A" : '',
      other: {
          title: locale === 'ar' ? 'اهدافنا و رؤيتنا و مهمتنا عن | Class A' : locale === 'en' ? "the vision , mission  and our goals   about  | Class A" : '',
      }

  }
}




const Business = async ({ params }) => {

  const i18nNamespaces = ["home"];

  const { locale } = params



  const { t } = await initTranslations(locale, i18nNamespaces)

  const philosophyData = await fetchData(`api/business`, locale)
  const Philosophy = philosophyData?.data

  const Data = await fetchData(`api/business-models`, locale)
  const business = Data?.data





  return (
    <section>
      <MainBackground />

      <div className='lg:mx-28 py-20'>

        <div className='text-center'>
          <h3 className='text-4xl'>{t("Our Philosophy")}</h3>
          <div className='text-[17px] py-4 text-gray-600 mx-10 ' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t(Philosophy?.details )) }} />
        </div>

        <div className='text-center'>
          <h3 className='text-3xl lg:text-4xl py-10 px-3 lg:px-0'>{t("Our Vision , Mission and Values")}</h3>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mx-3 lg:mx-0'>
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

          {/* Value */}
          {/* <div className=' mx-3 lg:mx-0 border-gray-300 border-[1px] rounded-lg text-center p-5 my-10 '>
            <Values />
            <h3 className='text-2xl font-semibold py-3'>Values</h3>

            <div className='lg:flex gap-10 '>
              <ul className='text-start'>
                <li className='py-3'>
                  <h4 className='text-lg font-semibold'>.Innovation & Creativity </h4>
                  <p className='text-[16px] text-gray-700 py-2'>
                    Innovation & Creativity penetrates our business to the deep core.
                  </p>
                </li>


                <li className='py-3'>
                  <h4 className='text-lg font-semibold'>.First Mover </h4>
                  <p className='text-[16px] text-gray-700 py-2'>

                    Being the first movers by introducing an innovative product is our focus.
                  </p>
                </li>


                <li className='py-3'>
                  <h4 className='text-lg font-semibold'>.Sustainability</h4>
                  <p className='text-[16px] text-gray-700 py-2'>
                    Our commitment to becoming a sustainable business.
                    Four pillars keep our business sustainability:

                  </p>
                  <ul>
                    <li className='text-[15px] text-gray-600 '>•	Integration with our organizations purpose,

                      <li className='text-[15px] text-gray-600 '>• Educate & empower our people,
                      </li>
                      <li className='text-[15px] text-gray-600 '>•	Engage & collaborate with our stakeholders and partners.</li>
                    </li>              <li className='text-[15px] text-gray-600 '>•	Align into our operations,</li>
                  </ul>



                </li>

              </ul>

              <ul className='text-start'>
                <div className='py-3'>
                  <h4 className='text-lg font-semibold'>.Agility </h4>
                  <p className='text-[16px] text-gray-700 py-2'>We will remain agile.</p>
                </div>

                <div className='py-3'> <h4 className='text-lg font-semibold'>.Quality </h4>
                  <p className='text-[16px] text-gray-700 py-2'>Highest possible standards are our credo.</p></div>

                <div className='py-3'>
                  <h4 className='text-lg font-semibold'>.Respect</h4>
                  <p className='text-[16px] text-gray-700 py-2'> We treat our employees family members, customers, and stakeholders with respect.</p>
                </div>

                <div>
                  <h4 className='text-lg font-semibold'>7.Loyalty </h4>
                  <p className='text-[16px] text-gray-700 py-2'>Loyalty is a fundamental aspect of our business.</p>
                </div>


                <div>
                  <h4 className='text-lg font-semibold'>.Teamwork </h4>
                  <p className='text-[16px] text-gray-700 py-2'>We won together. </p>
                </div>
              </ul>
            </div>

          </div> */}
        </div>


      </div>

    </section>
  )
}

export default Business