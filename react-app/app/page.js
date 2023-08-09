"use client"

import { CurrencyExchangeOutlined, FileUploadOutlined, MessageOutlined, WalletRounded } from '@mui/icons-material';
import Image from 'next/image'
import Link from 'next/link';
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
          <nav className={`pb-5 md:text-sm ${state ? "absolute h-screen top-0 inset-x-0 bg-[#ffc412] shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-0 md:mt-0 md:relative md:bg-transparent" : ""}`}>
            <div className="items-center max-w-screen-xl px-4 mx-auto gap-x-14 md:flex md:px-8">
              <Brand />
              <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                <ul className="items-center justify-center w-full flex-1 space-y-6 md:flex md:space-x-6 md:space-y-0">
                  {
                    navigation.map((item, idx) => {
                      return (
                        <li key={idx} className="text-gray-700 hover:text-gray-900">
                          <a href={item.path} className="block text-center w-full lg:w-fit">
                            {item.title}
                          </a>
                        </li>
                      )
                    })
                  }
                </ul>
                <div className="items-center justify-end space-y-6 md:flex md:mt-0">
                  <a href="javascript:void(0)" className='inline-flex items-center p-1 pr-2 text-sm font-medium border border-orange-900 rounded-full hover:shadow-xl group gap-x-2 bg-gradient-to-r hover:from-green-900 hover:to-green-700'>
                    <span className='inline-block px-3 py-1 text-yellow-200 uppercase rounded-full  group-hover:bg-green-700'>
                      CONNECT
                    </span>
                    <p className='flex items-center'>
                      ACCOUNT
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <section>
          <div className="max-w-screen-xl gap-16 px-4 mx-auto py-28 md:px-8 md:flex">
            <div className='flex-none max-w-lg space-y-10'>
              <a href="javascript:void(0)" className='inline-flex items-center p-1 pr-6 text-sm font-medium border border-orange-900 rounded-full hover:shadow-xl group gap-x-6 bg-gradient-to-r hover:from-green-900 hover:to-green-700'>
                <span className='inline-block px-3 py-1 text-yellow-200 uppercase rounded-full group-hover:bg-green-700'>
                  News
                </span>
                <p className='flex items-center'>
                  Read the launch post from here
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </p>
              </a>
              <h1 className="font-sans text-4xl font-extrabold  md:text-6xl gradient">
                We make your <span className='text-green-900'>loyalty</span> dreams come true.
              </h1>
              <hr />
              <p className='text-lg font-bold max-w-[28vw]'>
                from <span className='font-black'>fungibles</span> to <span className='font-black'>non-fungibles</span>, tokentreats lets you craft and define your dream rewards!
              </p>
              <div className='flex items-center gap-x-3 sm:text-sm'>
                <button href="javascript:void(0)" className="flex items-center justify-center ">
                  Get started
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
                <a href="javascript:void(0)" className="flex items-center justify-center px-4 py-2 font-medium text-gray-700 duration-150 gap-x-1 hover:text-gray-900 md:inline-flex">
                  Talk to Us
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div className='grid w-full grid-cols-2 rounded-[30px] lg:mt-[50vh]'>
              {/* Replace with your image */}
              <div className='w-full grid content-between col-span-1 p-5 rounded-[30px] bg-gradient-to-br from-[#ffc41284]  to-transparent'>
                <h1 className='text-3xl font-bold gradient'>Surprise Your<br />Loyal Members</h1>

                <p className='text-sm'>QuickSend lets you brighten someone's day in a flash. Wallet address, USD amount, a dash of thoughtfulness – and voila, tokens and smiles are on their way!</p>
              </div>
              <div className='h-full grid content-between w-full aspect-square col-span-1 p-5 card'>
                <form className='grid gap-2'>
                  <div className='p-1 border gap-1 group justify-between items-center inline-flex border-orange-700 rounded-full w-full text-center'>
                    <button className='inline-block text-sm p-2 text-yellow-200 uppercase rounded-full  group-hover:bg-green-700'>
                      <WalletRounded />
                    </button>
                    <input className='w-full text-base font-bold placeholder:text-left rounded-[30px] px-3 gradient h-full' placeholder='Wallet Address' />
                  </div>
                  <div className='p-1 gap-1 border group justify-between items-center inline-flex border-orange-700 rounded-full w-full text-center'>
                    <button className='inline-block text-sm p-2  text-yellow-200 uppercase rounded-full  group-hover:bg-green-700'>
                      <CurrencyExchangeOutlined />
                    </button>
                    <input type='number' className='w-full text-base font-bold placeholder:text-left rounded-[30px] px-3 gradient h-full' placeholder='Value in USD' />
                  </div>
                  <div className='p-1 gap-1 border group justify-between items-center inline-flex border-orange-700 rounded-full w-full text-center'>
                    <button className='inline-block text-sm p-2  text-yellow-200 uppercase rounded-full  group-hover:bg-green-700'>
                      <MessageOutlined />
                    </button>
                    <input className='w-full pl-3 text-base font-bold placeholder:text-left rounded-[30px] px-3 py-1 gradient' placeholder='Insert Message' />
                  </div>
                  <div className='p-1 gap-1 border group justify-between items-center inline-flex border-orange-700 rounded-full w-full text-center'>
                    <button className='inline-block text-sm p-2  text-yellow-200 uppercase rounded-full  group-hover:bg-green-700'>
                      <FileUploadOutlined />
                    </button>
                    <input className='w-full text-base font-bold placeholder:text-left rounded-[30px] px-3 py-1 gradient' placeholder='Attach Media Files' />
                  </div>

                </form>
                <button href="/" className='p-2 group justify-center items-center inline-flex border-orange-700 rounded-full w-full text-center'>
                  QuickSend Your Treats
                </button>
              </div>
              <div className='h-full w-full grid content-between aspect-square col-span-1 p-5 card'>
                <h2 className='text-2xl font-bold gradient uppercase'>One, Two, Treat!</h2>
                <h1 className='text-lg font-bold mt-10 uppercase text-center'><span className='border border-green-900 bg-[#00000027] rounded-full px-4 py-2 '>Redeem</span> your rewards</h1>
              </div>
              <div className='h-full w-full aspect-square p-5 rounded-[30px] bg-gradient-to-tl from-[#ffc4128c] to-[transparent]'>
                <h1>Pick, Redeem, Repeat – We Puts Rewards, Credentials, Digital Idenity, NFT Marketplaces, and DeFi Exchanges in Your Hands!</h1>
                <h2></h2>
              </div>

            </div>
          </div>
        </section>
      </div>

    </div>
  )
}
