'use client';

import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Example icons
import { usePathname } from 'next/navigation';
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const router = usePathname();

  return (
    <header className="p-1 rounded-full mb-5 w-full bg-white">
      {console.log('router', router)}
      <nav className="relative flex items-center justify-between p-0 px-3  min-h-[40px]">
        <a
          href="#"
          className="flex-shrink-0"
        >
          {' '}
          <img
            src="/images/logo.svg"
            alt="Company Logo"
            className="inline-block align-middle h-8 w-auto"
          />
        </a>
        <div className="lg:hidden">
          {' '}
          <button
            onClick={toggleMobileMenu}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-controls="navbarNav"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <XMarkIcon
                className="block h-6 w-6"
                aria-hidden="true"
              />
            ) : (
              <Bars3Icon
                className="block h-6 w-6"
                aria-hidden="true"
              />
            )}
          </button>
        </div>

        {/* --- Collapsible Menu Section --- */}
        <div
          className={`
            absolute top-full justify-between inset-x-0 p-2 transition transform origin-top  lg:p-0 lg:relative lg:top-auto lg:inset-x-auto lg:flex lg:items-center lg:flex-grow lg:w-auto bg-white lg:bg-transparent rounded-b-2xl lg:rounded-none z-20
            ${isMobileMenuOpen ? 'block' : 'hidden'}
          `}
          id="navbarNav" // ID for aria-controls
        >
          <button
            onClick={toggleMobileMenu}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 lg:hidden"
            aria-label="إغلاق القائمة"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <ul className="flex flex-col list-none lg:flex-row lg:items-center lg:mx-auto lg:gap-4 mx-auto">
            <li className="mb-2 lg:mb-0">
              <a
                className={
                  'block py-2 px-3 text-xl font-semibold  ' +
                  (router === '/'
                    ? '!text-[#6E38FF] hover:!text-[#6E38FF]'
                    : ' !text-gray-700 hover:!text-gray-900')
                } // Active link style
                href="/"
              >
                الرئيسية
              </a>
            </li>
            <li className="mb-2 lg:mb-0">
              <a
                className={
                  'block py-2 px-3 text-xl font-semibold  ' +
                  (router === '/about'
                    ? '!text-[#6E38FF] hover:!text-[#6E38FF]'
                    : ' !text-gray-700 hover:!text-gray-900')
                }
                href="/about"
              >
                من نحن
              </a>
            </li>
            <li className="mb-2 lg:mb-0">
              <a
                className={
                  'block py-2 px-3 text-xl font-semibold  ' +
                  (router === '/our-services'
                    ? '!text-[#6E38FF] hover:!text-[#6E38FF]'
                    : ' !text-gray-700 hover:!text-gray-900')
                }
                href="/our-services"
              >
                خدماتنا
              </a>
            </li>
            <li className="mb-2 lg:mb-0">
              <a
                className={
                  'block py-2 px-3 text-xl font-semibold  ' +
                  (router === '/contact-us'
                    ? '!text-[#6E38FF] hover:!text-[#6E38FF]'
                    : ' !text-gray-700 hover:!text-gray-900')
                }
                href="/contact-us"
              >
                تواصل معنا
              </a>
            </li>
          </ul>

          <a
            href="#"
            className="block w-full text-center lg:w-auto  lg:mt-0 lg:ms-3 px-5 py-2 rounded-full text-base font-semibold login-btn text-black border-0 transition-colors !text-[#F4F30E]"
          >
            تسجيل الدخول
          </a>
        </div>
      </nav>
    </header>
  );
}
