'use client'
import { navbarLink } from '@/data'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from '../../public/assets/logo.png'
import { useTranslation } from 'react-i18next'
import { fetchData } from '../../utils/api'
import LanguageChanger from './LanguageChanger'

const SecondNav = ({ showmenuIcon }) => {
     const {t ,i18n}= useTranslation()
  const [isFixed, setIsFixed] = useState(false);

  const handleFixed = () => {

    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }


  useEffect(() => {

    if (window.scrollY >= 100) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }

    handleFixed()

  }, [])


  const [settings, setData] = useState('')
  useEffect(() => {
      const settingFetch = async () => {
          const data = await fetchData(`api/settings`, i18n.language)
          setData(data?.data)

      }

      settingFetch()
  }, [])
  return (
    <>
      {
        showmenuIcon === false && (<section
          className={`w-full z-50   ${isFixed ? 'fixed top-0 bg-black py-1 ' : 'bg-black top-32'
            }`}>
          <div className='flex  items-center w-full justify-between px-28 '>
            <div>
            <Link href={'/'}className="">
              <img alt='logo' className={"w-24"} src={settings?.logo} />
              </Link>
            </div>

            <div className='flex gap-10 '>
              {
                navbarLink.map((link, index) => (
                  <div key={index}>
                    <Link href={link.path} className='text-white text-lg hover:text-primary_Color_dark hover:font-semibold'>{t(link.name)}</Link>
                  </div>
                ))
              }

            </div>
            <LanguageChanger />
          </div>

        </section>)
      }


    </>

  )
}

export default SecondNav