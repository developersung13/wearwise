'use client';

import Loading from '@/app/loading';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface DefaultProps {
  params: {
    id: string;
  };
}

interface Item {
  _id: string;
  name: string;
  price: number;
  maxSize: number;
  prodImageCnt: number;
  prodDescription: string;
  prodWarningDescription: string;
}

interface Review {
  _id: string;
  productNo: string;
  writer: string;
  title: string;
  content: string;
}

export default function Detail(props: DefaultProps) {
  const [item, setItem] = useState<Item>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    params: { id },
  } = props;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/items/${id}`);
        const res_2 = await fetch(`/api/items/${id}/review`);
        if (!res.ok && !res_2.ok) throw new Error(`HTTP error ${res.status}`);
        const item: Item = await res.json();
        const reviews: Review[] = await res_2.json();
        setItem(item);
        setReviews(reviews);
        setLoading(true);
      } catch (err) {
        console.error('Error fetching item: ', err);
      }
    };
    fetchItem();
  }, []);

  if (!loading) return <Loading />;

  return (
    <div className='flex justify-center'>
      <div className='w-1/2'>
        {Array.from({ length: item?.prodImageCnt as number }, (_, idx) => (
          <img
            key={idx}
            src={`/images/items/${item?._id}/${idx + 1}.jpg`}
            alt=''
          />
        ))}
      </div>
      <div className='w-1/2 p-8 pt-12 sticky top-0 h-1/2'>
        <p>{item?.name}</p>
        <p className='font-light text-xs mt-[-0.05rem] mb-7'>
          ₩ {item?.price.toLocaleString()}
        </p>
        <div>
          <p className='font-bold text-xs tracking-[-0.025rem]'>SIZE</p>
          <ul className='flex gap-4 font-normal text-[13px] mt-2 mb-8'>
            {Array.from({ length: item?.maxSize as number }, (_, idx) => (
              <li key={idx}>{idx + 1}</li>
            ))}
          </ul>
        </div>
        <div className='text-xs font-bold mb-8'>
          <button className='border border-black py-[0.35rem] px-20 mr-2'>
            BUY
          </button>
          <button className='border border-black py-[0.35rem] px-20 mt-'>
            CART
          </button>
        </div>
        <div className='font-light text-xs leading-[1.175rem] text-[10px] tracking-[-0.05rem]'>
          <div>
            <pre className='mb-5'>{item?.prodDescription}</pre>
            {item?.prodWarningDescription && (
              <pre className='text-[red]'>{item?.prodWarningDescription}</pre>
            )}
          </div>
          <div className='grid leading-4 font-normal mt-5'>
            <Link href={``}>Q & A ({0})</Link>
            <Link href={`/items/${id}/review`}>REVIEW ({reviews.length})</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
