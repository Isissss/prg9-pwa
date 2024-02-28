import React from 'react';   
import { StateButton } from './StateButtons';
import Link from 'next/link';
import Image from 'next/image';
 
export default function Navbar() {
    return (
       <nav className='bg-[#d3104c] p-2 flex flex-row items-center'> 
         <Image src="/logo.svg" unoptimized alt="logo" className='mr-5' width={150} height={220} /> 
         <Link href='/' className='text-xl text-white hover:underline'> Projects </Link> 
       </nav>
    )
  }