'use client';

import Loading from '@/app/loading';
import { useEffect, useState } from 'react';

interface Review {
  _id: string;
  productNo: string;
  writer: string;
  title: string;
  content: string;
  orderedSize: number;
  userHeight: number;
  userWeight: number;
  idx: number;
}

interface Props {
  review: Review;
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

export default function Item({ review }: Props) {
  const [item, setItem] = useState<Item>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/items/${review.productNo}/review`);
        const res_2 = await fetch(`/api/items/${review.productNo}`);
        if (!res.ok && !res_2.ok) throw new Error(`HTTP error ${res.status}`);
        const reviews: Review[] = await res.json();
        const itemInfo: Item = await res_2.json();
        setItem(itemInfo);
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
    <div className='p-[0.5rem] mt-[-0.05rem] border-t border-b border-neutral-400'>
      <div className='flex h-[5rem] items-center'>
        <div className='basis-[10%]'>{reviews.length - review.idx}</div>
        <img
          src={`/images/items/${review.productNo}.jpg`}
          alt={`${item?.name}`}
          style={{ width: 'auto', height: '80px' }}
        />
        <div className='basis-11/12 grid h-full place-content-start p-2'>
          <h4 className='tracking-[-0.025rem] text-xs font-light'>
            {item?.name}
          </h4>
          <p className='font-light'>
            제목 :<span className='ml-1 font-medium'>{review.title}</span>
          </p>
          <p className='font-light'>
            내용 :<span className='ml-1 font-medium'>{review.content}</span>
          </p>
          <div className='flex font-light mt-1'>
            <span className='text-neutral-500'>키 : {review.userHeight}cm</span>
            <span className='before:content-["/"] mx-1 text-neutral-700' />
            <span className='text-neutral-500'>
              몸무게 : {review.userWeight}kg
            </span>
            <span className='before:content-["/"] mx-1 text-neutral-700' />
            <span className='text-neutral-500'>
              구매 사이즈 : {review.orderedSize}
            </span>
          </div>
        </div>
        <div className='basis-[15%] text-right'>
          <p>{review.writer}</p>
        </div>
      </div>
    </div>
  );
}
