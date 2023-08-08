"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function Home() {
  const [state, setState] = useState(false)

  // Replace javascript:void(0) paths with your paths
  const navigation = [
    { title: "Features", path: "javascript:void(0)" },
    { title: "Integrations", path: "javascript:void(0)" },
    { title: "Customers", path: "javascript:void(0)" },
    { title: "Pricing", path: "javascript:void(0)" }
  ]

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, [])

  const Brand = () => (
    <div className="flex items-center justify-between py-5 md:block">
      <a href="javascript:void(0)">
        <img
          src="/xlogo.svg"
          width={200}
          height={50}
          alt="Token Treats Logo"
        />
      </a>
      <div className="md:hidden">
        <button className="text-gray-500 menu-btn hover:text-gray-800"
          onClick={() => setState(!state)}
        >
          {
            state ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )
          }
        </button>
      </div>
    </div>
  )

  return (
    <div className='relative'>
      <div className='absolute inset-0 min-h-screen blur-2xl' style={{ background: "linear-gradient(143.6deg, rgba(166,124,0, 0) 20.79%, rgba(255,191,0, 0.26) 40.92%, rgba(255,220,115, 0) 70.35%)" }}></div>
      <div className='relative'>
        <header>
          <div className={`md:hidden ${state ? "mx-2 pb-5" : "hidden"}`}>
            <Brand />
          </div>
          <nav className={`pb-5 md:text-sm ${state ? "absolute top-0 inset-x-0 bg-white shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-0 md:mt-0 md:relative md:bg-transparent" : ""}`}>
            <div className="items-center max-w-screen-xl px-4 mx-auto gap-x-14 md:flex md:px-8">
              <Brand />
              <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                <ul className="items-center justify-center flex-1 space-y-6 md:flex md:space-x-6 md:space-y-0">
                  {
                    navigation.map((item, idx) => {
                      return (
                        <li key={idx} className="text-gray-700 hover:text-gray-900">
                          <a href={item.path} className="block">
                            {item.title}
                          </a>
                        </li>
                      )
                    })
                  }
                </ul>
                <div className="items-center justify-end mt-6 space-y-6 md:flex md:mt-0">
                  <a href="javascript:void(0)" className="flex items-center justify-center px-4 py-2 font-medium text-white bg-gray-800 rounded-full gap-x-1 hover:bg-green-900 active:bg-gray-900 md:inline-flex hover:shadow-md">
                    Sign in
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <section>
          <div className="max-w-screen-xl gap-16 px-4 mx-auto text-orange-100 py-28 md:px-8 md:flex">
            <div className='flex-none max-w-lg space-y-10'>
              <a href="javascript:void(0)" className='inline-flex items-center p-1 pr-6 text-sm font-medium border border-orange-900 rounded-full hover:shadow-xl group gap-x-6 bg-gradient-to-r hover:from-green-900 hover:to-green-700'>
                <span className='inline-block px-3 py-1 text-yellow-200 uppercase rounded-full group-hover:text-black group-hover:bg-green-700'>
                  News
                </span>
                <p className='flex items-center'>
                  Read the launch post from here
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </p>
              </a>
              <h1 className="font-sans text-4xl font-extrabold text-gray-800 sm:text-5xl">
                We Make Your Loyalty Dreams Come True
              </h1>
              <p>
                Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
              </p>
              <div className='flex items-center gap-x-3 sm:text-sm'>
                <a href="javascript:void(0)" className="flex items-center justify-center px-4 py-2 font-medium text-white duration-150 bg-gray-800 rounded-full hover:shadow-xl gap-x-1 hover:bg-green-800 active:bg-gray-900 md:inline-flex">
                  Get started
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="javascript:void(0)" className="flex items-center justify-center px-4 py-2 font-medium text-gray-700 duration-150 gap-x-1 hover:text-gray-900 md:inline-flex">
                  Talk to Us
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div className='grid w-full grid-cols-2 space-y-10 text-gray-800'>
              {/* Replace with your image */}
              <div className='h-full w-full aspect-square shadow-lg hover:shadow-sm col-start-2 p-5 bg-[#ffc412b3] rounded-[30px] border border-orange-300'>
                <h1>FOOLPROOF</h1>
              </div>
              <div className='h-full w-full aspect-square shadow-lg hover:shadow-sm p-5 bg-[#ffc412b3] rounded-[30px] border border-orange-300'>
                <h1>PERSONALIZED</h1>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
