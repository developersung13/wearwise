import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <div className='flex text-[10px] tracking-[-1px] py-12 px-5 leading-[1.175rem]'>
      <div className='w-2/3'>
        <p>© WEAR WISE</p>
        <p>
          <span className='mr-2'>
            43, BOMON-RO 31NA-GIL, GEONGBUK-GU, SEOUL REPUBLIC OF KOREA
          </span>
          <span className='mr-2'>BUSINESS NUMBER:125-22-00512</span>
          <span className='mr-2'>NUMBER:2020-SEOULSEONGBUK-0108</span>
        </p>
        <p>
          <span className='mr-2'>COMPANY: AP LAB COMPANY Inc.</span>
          <span className='mr-2'>OWNER: Sung Yeol-Am</span>
          <span className='mr-2'>TEL:070-1276-8362</span>
          <span className='mr-2'>EMAIL: developersung13@gmail.com</span>
        </p>
      </div>
      <div className='ml-7 tracking-tighter'>
        <Link href='/about' className='mr-9'>
          ABOUT
        </Link>
        <Link href='/legal'>LEGAL</Link>
      </div>
    </div>
  );
}
