import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Profile() {
    const { user, error, isLoading } = useUser();
    if (isLoading) return <div className="items-center w-full mt-5 justify-center lg:justify-end space-y-6 flex md:mt-0">
        <div className='inline-flex w-fit justify-center items-center p-1 pr-2 text-sm font-medium border border-orange-900 rounded-full hover:shadow-xl group gap-x-2 bg-gradient-to-r hover:from-green-900 hover:to-green-700'>
            <p className={`inline-block ${user ? "p-1" : "px-3"}  bg-[#00000057] py-1 text-yellow-200 uppercase rounded-full  group-hover:bg-green-700`}>
                LOADING
            </p>
            <p className='flex items-center pr-1'>
                {user ? user.name : <>ACCOUNT</>}
                {user && <a href="/api/auth/logout">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                </a>}
            </p>
        </div>
    </div>;
    if (error) return <div>{error.message}</div>;

    return (

        <div className="items-center w-full mt-5 justify-center lg:justify-end space-y-6 flex md:mt-0">
            <div className='inline-flex w-fit justify-center items-center p-1 pr-2 text-sm font-medium border border-orange-900 rounded-full hover:shadow-xl group gap-x-2 bg-gradient-to-r hover:from-green-900 hover:to-green-700'>
                <a href="/api/auth/login" className={`inline-block ${user ? "p-1" : "px-3"}  bg-[#00000057] py-1 text-yellow-200 uppercase rounded-full  group-hover:bg-green-700`}>
                    {user ? <img src={user?.picture} alt={user?.name} className='h-6 rounded-full' /> : <>LOG IN</>}
                </a>
                <p className='flex items-center pr-1'>
                    {user ? user.name : <>ACCOUNT</>}
                    {user && <a href="/api/auth/logout">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </a>}
                </p>
            </div>
        </div>


    );
}