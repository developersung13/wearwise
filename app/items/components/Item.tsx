import Link from 'next/link';
import React from 'react';

interface Props {
  item: {
    _id: string;
    name: string;
    price: number;
    maxSize: number;
    prodImageCnt: number;
    prodDescription: string;
    prodWarningDescription: string;
  };
}

export default function Item({ item }: Props) {
  return (
    <Link href={`/items/${item._id}`} className='w-1/4'>
      <div className='pb-[4.5rem] p-1'>
        <img src={`/images/items/${item._id}.jpg`} alt={`${item.name}`} />
        <div className='pl-3'>
          <h4 className='text-neutral-500 tracking-wide font-light text-sm mt-2'>
            {item.name}
          </h4>
          <strong className='font-normal text-sm'>
            ₩ {item.price.toLocaleString()}
          </strong>
        </div>
      </div>
    </Link>
  );
}
