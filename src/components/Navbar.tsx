import React from 'react';   
import { StateButton } from './StateButtons';
import Link from 'next/link';
 
export default function Navbar() {
    return (
       <nav>
        <a href="/">Home</a>
        <StateButton  />
       </nav>
    )
  }