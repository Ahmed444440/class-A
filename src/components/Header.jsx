'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  Disclosure,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { fetchData } from '../../utils/api';
import LanguageChanger from './LanguageChanger';
import { navbarLink } from '@/data';
import { useTranslation } from 'react-i18next';

const HeaderTwo = () => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await fetchData('api/settings', i18n.language);
      setSettings(data?.data);
    };
    fetchSettings();
  }, [i18n.language]);

  return (
    <header className="bg-red-600 shadow-md sticky top-0 z-50 w-full">
      {/* Desktop and Tablet Navbar */}
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-6"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="">
            <img alt="logo" className="w-16 md:w-20" src={settings?.logo} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <Bars3Icon aria-hidden="true" className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:gap-x-6">
          {navbarLink.map((link) => (
            <Popover key={link.name} className="relative">
              <PopoverButton className="flex outline-none items-center text-lg font-medium text-white hover:text-primary transition-all duration-300">
  <Link href={link.path} className="mr-2">
    {t(link.name)}
  </Link>
  {link.links && Array.isArray(link.links) && (
    <ChevronDownIcon
      aria-hidden="true"
      className=" w-4 h-4 text-gray-200"
    />
  )}
</PopoverButton>

              {link.links && Array.isArray(link.links) && (
                <PopoverPanel className="absolute z-10 mt-2 w-40 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/10">
                  <div className="py-2">
                    {link.links.map((subLink, subIndex) => (
                      typeof subLink === 'string' ? (
                        <Link
                          key={subIndex}
                          href={`${link.path}/${subLink.replace(/\s+/g, '-').toLowerCase()}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-all duration-200"
                        >
                          {t(subLink)}
                        </Link>
                      ) : (
                        <div key={subIndex}>
                          <div className="px-4 py-2 text-sm text-gray-700 font-semibold">{t(subLink.name)}</div>
                          <div className="pl-4">
                            {subLink.subLinks.map((subSubLink, subSubIndex) => (
                              <Link
                                key={subSubIndex}
                                href={`${link.path}/${subSubLink.replace(/\s+/g, '-').toLowerCase()}`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-all duration-200"
                              >
                                {t(subSubLink)}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </PopoverPanel>
              )}
            </Popover>
          ))}
        </div>

        {/* Language Changer */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <LanguageChanger />
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        as="div"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <Dialog.Panel className="fixed inset-0 z-10 w-full bg-white p-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="">
              <img alt="logo" className="w-16 md:w-20" src={settings?.logo} />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon aria-hidden="true" className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {navbarLink.map((link) => (
              <Disclosure key={link.name} as="div" className="mb-4">
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-md">
                  <Link href={link.path}>{t(link.name)}</Link>
                  {link.links && !Array.isArray(link.links) && (
                    <ChevronDownIcon
                      className="w-5 h-5 text-gray-500"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
                {link.links && Array.isArray(link.links) && (
                  <Disclosure.Panel className="pl-4">
                    {link.links.map((subLink, subIndex) => (
                      typeof subLink === 'string' ? (
                        <Link
                          key={subIndex}
                          href={`${link.path}/${subLink.replace(/\s+/g, '-').toLowerCase()}`}
                          className="block py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {t(subLink)}
                        </Link>
                      ) : (
                        <div key={subIndex}>
                          <div className="px-4 py-2 text-sm text-gray-700 font-semibold">{t(subLink.name)}</div>
                          <div className="pl-4">
                            {subLink.subLinks.map((subSubLink, subSubIndex) => (
                              <Link
                                key={subSubIndex}
                                href={`${link.path}/${subSubLink.replace(/\s+/g, '-').toLowerCase()}`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                {t(subSubLink)}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </Disclosure.Panel>
                )}
              </Disclosure>
            ))}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default HeaderTwo;
