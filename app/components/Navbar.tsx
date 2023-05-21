import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav className='font-light p-6 flex gap-[1.5rem] md:flex-row fixed top-0 tracking-tighter'>
      <Link href='/' className='tracking-wide mr-5 font-normal'>
        wearwise
      </Link>
      <Link href='/items'>ITEMS</Link>
      <Link href='/cart'>CART</Link>
      <Link href='/order'>ORDERS</Link>
    </nav>
  );
}
