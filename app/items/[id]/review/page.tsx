'use client';

import Loading from '@/app/loading';
import Item from './components/Item';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DefaultProps {
  params: {
    id: string;
  };
}

interface Review {
  _id: string;
  productNo: string;
  writer: string;
  title: string;
  content: string;
  orderedSize: number;
  userHeight: number;
  userWeight: number;
}

export default function Review(props: DefaultProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    params: { id },
  } = props;
  const pathname = usePathname();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/items/${id}/review`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const reviews: Review[] = await res.json();
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
    <div className='grid h-fit mt-[6rem] mb-20 text-xs'>
      <h1 className='text-4xl text-center mb-10 tracking-[1.25rem] font-extralight'>
        REVIEW
      </h1>
      <div className='w-2/5 mx-auto font-normal'>
        {reviews.map((review, idx) => {
          return <Item key={review._id} review={{ ...review, idx }} />;
        })}
        <Link
          href={`${pathname}/write`}
          className='float-right mt-7 font-bold tracking-tighter'
        >
          WRITE
        </Link>
      </div>
    </div>
  );
}
