"use client"

import Profile from '@/components/signin/Profile';
import { CardGiftcardOutlined, CurrencyExchangeOutlined, CurrencyExchangeTwoTone, FileUploadOutlined, MessageOutlined, PaymentOutlined, TokenOutlined, WalletRounded } from '@mui/icons-material';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ERC20ABI from "@/libraries/ERC20ABI.json";
import tokenTreatsCoreABI from "@/libraries/TokenTreatsCoreABI.json";
import { optimism } from '@/libraries/DeployedAddresses';
import { OptimismgGoerliUselessToken } from '@/libraries/CryptoAddresses';
// const ethers = require("ethers")
import { ethers } from "ethers";

export default function Home() {
  const [state, setState] = useState(false)
  const [tokenIn, setTokenIn] = useState("")
  const [myTreats, setMyTreats] = useState("")
  const [receiver, setReceiver] = useState("")
  const [tokenOut, setTokenOut] = useState("")
  const [amountIn, setAmountIn] = useState("")
  const [newtorkOut, setNetworkOut] = useState("")
  const [message, setMessage] = useState("")
  const [provider, setProvider] = useState(null)
  const [ERC20Token, setERC20Token] = useState("")
  const [tokenTreatsCore, setTokenTreatsCore] = useState("")

  const navigation = [
    { title: "Features", path: "javascript:void(0)" },
    { title: "Integrations", path: "javascript:void(0)" },
    { title: "Customers", path: "javascript:void(0)" },
    { title: "Pricing", path: "javascript:void(0)" }
  ]

  const footerNavs = [
    {
      href: 'javascript:void()',
      name: 'Terms'
    },
    {
      href: 'javascript:void()',
      name: 'License'
    },
    {
      href: 'javascript:void()',
      name: 'Privacy'
    },
    {
      href: 'javascript:void()',
      name: 'About us'
    }
  ]

  useEffect(() => {
    const initProvider = async () => {
      // Use Test Token on Goerli
      const testTokenIn = OptimismgGoerliUselessToken.OUT1;
      setTokenIn(testTokenIn); // Set Default Coin for testing
      console.log("TestToken set as TokenIn set. OK.");

      if (window.ethereum) {
        try {
          console.log("Setting Provider.");
          await window.ethereum.enable();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider);
          console.log("Provider set.");

          const ERC20Token = new ethers.Contract(tokenIn, ERC20ABI, provider.getSigner());
          setERC20Token(ERC20Token);
          console.log("ERC20 instance set.");

          // OP-GOERLI
          const tokenTreatsCore = new ethers.Contract(optimism.CoreGoerli, tokenTreatsCoreABI, provider.getSigner());
          setTokenTreatsCore(tokenTreatsCore);
          console.log("TokenTreatsCore instance set.");

        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("Please install MetaMask.");
      }
    };

    initProvider();
  }, [tokenIn]);

  const handleApproval = async () => {
    try {
      // Check if instances are set
      if (provider && tokenTreatsCore && ERC20Token && tokenIn) {
        const signer = provider.getSigner();
        const walletAddress = await signer.getAddress();

        console.log(`Approving token spending ${amountIn} token ${tokenIn}`);

        // Check if enough balance
        if (amountIn.lt(await ERC20Token.balanceOf(walletAddress))) {
          console.log("Insufficient tokens; Your current balance is:", amountIn);
          return;
        }

        // Prompt to approve token
        const approveTokenSpending = await ERC20Token.approve(optimism.CoreGoerli, amountIn);
        await approveTokenSpending.wait();
        return true;

        console.log(`Token spending approved successful.`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendTreats = async () => {
    const approved = handleApproval();
    if (approved) {
      try {
        if (provider && tokenTreatsCore && tokenIn && amountIn) {
          const signer = provider.getSigner();
          const walletAddress = await signer.getAddress();
          // Format amount with 10**18 decimals
          const amountInDecimals = ethers.BigNumber.from(amountIn).mul(ethers.BigNumber.from(10).pow(18));
          console.log(`AddressIn: ${walletAddress}; TokenIn: ${tokenIn}; AmountIn: ${amountInDecimals}`);

          // Check if enough balance
          const balance = await ERC20Token.balanceOf(walletAddress);
          console.log(`Balance: ${balance}; Amount: ${amountInDecimals.toString()}`);
          if (amountInDecimals.gt(balance)) {
            console.log("Insufficient tokens; Your current balance is:", ethers.utils.formatUnits(balance, decimals));
            return;
          }

          // Prompt to pay; Default Setting: Fungible Deposit, No File Upload
          const transaction = await tokenTreatsCore.createTreats(receiver, tokenIn, amountInDecimals, message, "", true);
          await transaction.wait();


          console.log("Treats created successfully");
          alert("Treats created successfully")
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchTreats = async () => {
      if (tokenTreatsCore) {
        try {
          console.log(`Fetching Treats...`);
          const signer = provider.getSigner();
          const walletAddress = await signer.getAddress();
          const treatIds = await tokenTreatsCore.getMyTreats(walletAddress);
          console.log(`Fetched Treats:`, treatIds);
          setMyTreats(treatIds);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchTreats();
  }, [tokenTreatsCore]);



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
          className=''
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
          <nav className={`pb-5 md:text-sm ${state ? "absolute bg-[#ffb012] h-[55vh] lg:h-full top-0 inset-x-0  shadow-lg rounded-xl mx-2 mt-2 md:shadow-none md:border-none md:mx-0 md:mt-0 md:relative md:bg-transparent" : ""}`}>
            <div className="items-center  max-w-screen-xl px-5 mx-auto gap-x-14 md:flex md:px-8">
              <Brand />
              <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                <ul className="items-center justify-center w-full flex-1 space-y-6 md:flex md:space-x-6 md:space-y-0">
                  {
                    navigation.map((item, idx) => {
                      return (
                        <li key={idx} className="text-white hover:text-gray-900">
                          <a href={item.path} className="block text-center w-full lg:w-fit">
                            {item.title}
                          </a>
                        </li>
                      )
                    })
                  }
                </ul>
                <Profile />
              </div>
            </div>
          </nav>
        </header>
        <section>
          <div className="max-w-screen-xl gap-16 px-4 mx-auto py-28 md:px-8 md:flex">
            <div className='flex-none max-w-lg space-y-10'>
              <a href="/deck" className='inline-flex items-center p-1 pr-6 text-sm font-medium border border-orange-900 rounded-full hover:shadow-xl group gap-x-6 bg-gradient-to-r hover:from-green-900 hover:to-green-700'>
                <span className='inline-block px-3 py-1 bg-[#00000057] text-yellow-200 uppercase rounded-full group-hover:bg-green-700'>
                  DECK
                </span>
                <p className='flex items-center'>
                  Why Tokentreats?
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </p>
              </a>
              <h1 className="font-sans text-4xl font-extrabold  md:text-6xl gradient">
                We make your <span className='text-green-900'>loyalty</span> dreams come true.
              </h1>
              <hr />
              <p className='text-lg font-bold lg:max-w-[28vw]'>
                from <span className='font-black'>fungibles</span> to <span className='font-black'>non-fungibles</span>, tokentreats lets you craft and define your dream rewards!
              </p>
              <div className='flex items-center gap-x-3 sm:text-sm'>
                <a href="/api/auth/login" className="flex button items-center justify-center ">
                  Join the waitlist
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </a>
                <a target='_blank' href="https://optimism-goerli-bedrock.easscan.org/attestation/attestWithSchema/0x238eeeb688987a65408aa7257d67fa066b0ea4b4f3d86a1d2f7d4b476ae5ef48" className="flex items-center justify-center px-4 py-2 font-medium text-gray-700 duration-150 gap-x-1 hover:text-gray-900 md:inline-flex">
                  Who Loves Treats? Attest!
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div className='grid w-full lg:grid-cols-2 gap-10 lg:gap-0 rounded-[30px] mt-10 lg:mt-[50vh]'>
              {/* Replace with your image */}
              <div className='w-full grid content-between col-span-1 p-5 rounded-[30px] bg-gradient-to-b lg:bg-gradient-to-br from-[#ffc41284]  to-transparent'>
                <h1 className='text-3xl font-bold gradient'>Surprise Your<br />Loyal Members</h1>

                <p className='text-sm'>QuickSend lets you brighten someone's day in a flash. Wallet address, USD amount, a dash of thoughtfulness – and voila, tokens and smiles are on their way!</p>
              </div>
              <div className='h-full gap-5 grid content-between w-full aspect-square col-span-1 p-5 card'>
                <form className='grid gap-2'>
                  <div className='p-1 border gap-1 group justify-between items-center inline-flex border-orange-700 rounded-full w-full text-center'>
                    <div className='inline-block bg-gray-800 hover:bg-green-900 text-sm p-2 text-yellow-200 uppercase rounded-full  group-hover:bg-green-700'>
                      <WalletRounded />
                    </div>
                    <input
                      required
                      value={receiver}
                      onChange={(e) => setReceiver(e.target.value)}
                      className='w-full text-base font-bold placeholder:text-left rounded-[30px] px-3 gradient h-full' placeholder='Receiver Address' />
                  </div>
                  <div className='p-1 gap-1 border group justify-between items-center inline-flex border-orange-700 rounded-full w-full text-center'>
                    <div className='inline-block bg-gray-800 hover:bg-green-900 text-sm p-2  text-yellow-200 uppercase rounded-full  group-hover:bg-green-700'>
                      <PaymentOutlined />
                    </div>
                    <select
                      required
                      value={tokenIn}
                      onChange={(e) => setTokenIn(e.target.value)}
                      className="w-full text-base font-bold placeholder:text-left rounded-[30px] px-3 gradient h-full"
                    >
                      <option value="">TestToken In Use</option>
                      <option value="USDT">USDT</option>
                      <option value="USDC">USDC</option>
                      <option value="DAI">DAI</option>
                      <option value="ETH">ETHEREUM</option>
                    </select>
                  </div>
                  <div className='p-1 gap-1 border group justify-between items-center inline-flex border-orange-700 rounded-full w-full text-center'>
                    <div className='inline-block bg-gray-800 hover:bg-green-900 text-sm p-2  text-yellow-200 uppercase rounded-full  group-hover:bg-green-700'>
                      <CurrencyExchangeOutlined />
                    </div>
                    <input type='number'
                      required
                      value={amountIn}
                      onChange={(e) => setAmountIn(e.target.value)}
                      className='w-full text-base font-bold placeholder:text-left rounded-[30px] px-3 gradient h-full' placeholder='Token Amount' />
                  </div>
                  <div className='p-1 gap-1 border group justify-between items-center inline-flex border-orange-700 rounded-full w-full text-center'>
                    <div className='inline-block bg-gray-800 hover:bg-green-900 text-sm p-2  text-yellow-200 uppercase rounded-full  group-hover:bg-green-700'>
                      <MessageOutlined />
                    </div>
                    <input
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className='w-full pl-3 text-base font-bold placeholder:text-left rounded-[30px] px-3 py-1 gradient' placeholder='Insert Message' />
                  </div>

                </form>
                <button onClick={sendTreats} className='p-2 group justify-center items-center inline-flex border-orange-700 rounded-full w-full text-center'>
                  QuickSend Treats
                </button>
                <p className='text-xs'>NOTE: Testnet Network is set to <a href='https://goerli-optimism.etherscan.io/address/0xDe58ED7409e96f71A7FC0871162Bb5ba99B3E7f9' target='_blank' className='underline'>Optimism Goerli</a> with <a href='https://goerli-optimism.etherscan.io/address/0x32307adfFE088e383AFAa721b06436aDaBA47DBE' target='_blank' className='underline'>ERC20TestToken</a>.</p>
              </div>
              <div className='h-full w-full gap-5 grid content-between aspect-square col-span-1 p-5 card'>
                <h2 className='text-2xl font-bold gradient'>One, Two, Treats!</h2>
                <h2 className='text-lg font-bold gradient'>Redeem Your Treats Today</h2>
                <form className='grid gap-2'>
                  <div className='p-1 gap-1 border group justify-between items-center inline-flex border-orange-700 rounded-full w-full text-center'>
                    <div className='inline-block bg-gray-800 hover:bg-green-900 text-sm p-2  text-yellow-200 uppercase rounded-full  group-hover:bg-green-700'>
                      <CardGiftcardOutlined />
                    </div>
                    <input
                      value=""
                      onChange={(e) => setTreatId(e.target.value)}
                      className='w-full text-base font-bold placeholder:text-left rounded-[30px] px-3 gradient h-full' placeholder='TREAT ID' />
                  </div>
                  <div className='p-1 gap-1 border group justify-between items-center inline-flex border-orange-700 rounded-full w-full text-center'>
                    <div className='inline-block bg-gray-800 hover:bg-green-900 text-sm p-2  text-yellow-200 uppercase rounded-full  group-hover:bg-green-700'>
                      <TokenOutlined />
                    </div>
                    <select
                      value={newtorkOut}
                      onChange={(e) => setNetworkOut(e.target.value)}
                      className="w-full text-base font-bold placeholder:text-left rounded-[30px] px-3 gradient h-full"
                    >
                      <option value="">Select Network</option>
                      <option value="Ethereum">Ethereum</option>
                      <option value="Optimism">Optimism</option>
                      <option value="Arbitrum">Arbitrum</option>
                      <option value="Base">Base</option>
                      <option value="Goerli">[TEST] Goerli</option>
                      <option value="Goerli">[TEST] Optimism Goerli</option>
                    </select>
                  </div>
                  <div className='p-1 border gap-1 group justify-between items-center inline-flex border-orange-700 rounded-full w-full text-center'>
                    <div className='inline-block bg-gray-800 hover:bg-green-900 text-sm p-2 text-yellow-200 uppercase rounded-full  group-hover:bg-green-700'>
                      <CurrencyExchangeOutlined />
                    </div>
                    <input
                      value={tokenOut}
                      onChange={(e) => setTokenOut(e.target.value)}
                      className='w-full text-base font-bold placeholder:text-left rounded-[30px] px-3 gradient h-full' placeholder='Token Address' />
                  </div>
                </form>
                <button href="/" className='p-2 group justify-center items-center inline-flex border-orange-700 rounded-full w-full text-center'>
                  Redeem Treats
                </button>
              </div>
              <div className='h-full w-full aspect-square p-5 rounded-[30px] bg-gradient-to-t lg:bg-gradient-to-tl from-[#ffc4128c] to-[transparent]'>
                <h1><span className='italic font-bold'>Pick, Redeem, Repeat</span> – TokenTreats Fuses Blockchain Tokens, Verifiable Credentials, Digital Identities, NFT Marketplaces, Cross-Chain Messaging, and Decentralized Finance into a Single Hub for Your Loyalty Journey!</h1>
                <h2></h2>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="pt-10">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 ">
          <div className="space-y-6 sm:max-w-lg sm:mx-auto sm:text-center grid">
            <img
              src="/xlogo.svg"
              width={200}
              height={50}
              alt="Token Treats Logo"
              className="w-52 sm:mx-auto"
            />
            <p>
              Redefining Loyalty with Personalized Blockchain Rewards
            </p>
            <div className="items-center gap-x-3 space-y-3 sm:flex sm:justify-center sm:space-y-0">
              <a href="api/auth/login" className="block py-2 px-4 text-center text-white font-medium button duration-150 shadow-lg hover:shadow-none">
                Get Early Access
              </a>
            </div>
          </div>
          <div className="mt-10 py-10 items-center justify-between sm:flex">
            <p>© 2022 TokenTreats. All rights reserved.</p>
            <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
              {
                footerNavs.map((item, idx) => (
                  <li className="text-gray-800 hover:text-yellow-200 duration-150">
                    <a key={idx} href={item.href}>
                      {item.name}
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
