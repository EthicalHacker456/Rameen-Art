import {Link} from '@inertiajs/react';  
import React, { PropsWithChildren , useState} from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';



export default function NavLayout({ children }: PropsWithChildren) {

    const [Open, setOpen] = useState(false);

    return (
      <div className='bg-black min-h-screen'> 

       {/*Navbar Area  */}
        <nav className='fixed w-full bg-black/30 backdrop-blur px-6 py-6 z-20'>

            <div className='container flex justify-between items-center'>
                <div className='text-2xl text-white'>Reactor</div>

                <ul className='flex space-x-10 items-center'>
                    <li>
                        <Link href='#' className='text-white hover:scale-110 transition-all duration-300'>Home</Link>
                    </li>
                    <li>
                        <Link href='#' className='text-white'>Work</Link>
                    </li>
                    <li>
                        <Link href='#' className='text-white'>Services</Link>
                    </li>
                    <li>
                        <Link href='#' className='text-white'>Marketplace</Link>
                    </li>
                    <li>
                        <Link href='#' className='text-white'>Blogs</Link>
                    </li>
                    <li>
                        <Link href='#' className='text-white'>Solutions</Link>
                    </li>
                    <li>
                        <Link href='#' className='text-white'>Contact Us</Link>
                    </li>
                    <li>
                        <Link href='#' className='bg-white rounded-4xl  px-4 py-3 font-bold flex gap-2'>Work With Us<ArrowRightIcon className=' h-6 w-6'/></Link>
                    </li>
                </ul>
            </div>
        </nav>
        {/*Content Area  */}
        <div className='container pt-24'>
            {children}  
        </div>
    </div>
    );
}
