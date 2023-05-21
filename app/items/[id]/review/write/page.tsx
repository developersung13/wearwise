'use client';

import Loading from '@/app/loading';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

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

const WriteReview: React.FC<DefaultProps> = (props: DefaultProps) => {
  const {
    params: { id },
  } = props;
  const [item, setItem] = useState<Item>();
  const [loading, setLoading] = useState(false);
  const [reviewInfo, setReviewInfo] = useState({
    productNo: id,
    writer: '',
    title: '',
    content: '',
    orderedSize: -1,
    userHeight: -1,
    userWeight: -1,
  });
  const [options, setOptions] = useState<JSX.Element[]>([]);
  const router = useRouter();

  const addOptions = () => {
    let options = [];
    options.push(<option key='0'>구매 사이즈 선택</option>);
    if (item?.maxSize) {
      for (let k = 1; k <= item.maxSize; k++)
        options.push(<option key={k}>{k}</option>);
      setOptions(options);
    }
  };

  const writeReviewHandler = async () => {
    try {
      const res = await fetch(`/api/items/${id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewInfo), // 서버로 보낼 데이터
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    } catch (err) {
      console.error('Error fetching item: ', err);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`/api/items/${id}`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const item: Item = await res.json();
        setItem(item);
        setLoading(true);
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    addOptions();
  }, [item]);

  if (!loading) return <Loading />;

  return (
    <div className='w-1/2 mx-auto grid h-fit mt-[6rem] mb-20 text-xs'>
      <div className='text-center'>
        <h5 className='text-left text-base mb-3'>REVIEW</h5>
        <div className='border border-neutral-800 h-[8rem] flex items-center p-4'>
          <img
            src={`/images/items/${id}.jpg`}
            style={{ width: 'auto', height: '100px' }}
          />
          <div className='ml-10 h-full text-left '>
            <p className='tracking-[-0.025rem]'>{item?.name}</p>
            <p className='font-light mt-[0.1rem]'>
              ₩ {item?.price.toLocaleString()}
            </p>
            <div className='font-bold mt-8'>
              <Link href={`/items/${id}`}>상품상세보기</Link>
            </div>
          </div>
        </div>
      </div>
      <div className='grid mt-7 gap-6'>
        <input
          type='text'
          placeholder='제목'
          className='border-b border-neutral-800 pb-3 placeholder-neutral-900 outline-none'
          onChange={(e) =>
            setReviewInfo({ ...reviewInfo, title: e.target.value })
          }
        />
        <input
          type='text'
          placeholder='내용'
          className='border-b border-neutral-800 pb-3 placeholder-neutral-900 outline-none'
          onChange={(e) =>
            setReviewInfo({ ...reviewInfo, content: e.target.value })
          }
        />
        <input
          type='text'
          placeholder='작성자'
          className='border-b border-neutral-800 pb-3 placeholder-neutral-900 outline-none'
          onChange={(e) =>
            setReviewInfo({ ...reviewInfo, writer: e.target.value })
          }
        />
        <div className='flex space-x-5'>
          <input
            type='number'
            placeholder='키(cm)'
            className='border-b border-neutral-800 pb-3 placeholder-neutral-900 outline-none w-3/5'
            onChange={(e) =>
              setReviewInfo({
                ...reviewInfo,
                userHeight: parseInt(e.target.value),
              })
            }
          />
          <input
            type='text'
            placeholder='몸무게(kg)'
            className='border-b border-neutral-800 pb-3 placeholder-neutral-900 outline-none w-3/5'
            onChange={(e) =>
              setReviewInfo({
                ...reviewInfo,
                userWeight: parseInt(e.target.value),
              })
            }
          />
          <select
            name='구매사이즈'
            className='border-b border-neutral-800 pb-3 placeholder-neutral-900 outline-none w-1/3'
            onChange={(e) =>
              setReviewInfo({
                ...reviewInfo,
                orderedSize: parseInt(e.target.value),
              })
            }
          >
            {options}
          </select>
        </div>
      </div>
      <div className='flex space-x-4 font-bold mt-12'>
        <button className='w-1/2 h-7' onClick={() => router.back()}>
          취소
        </button>
        <button className='w-1/2 h-7' onClick={() => writeReviewHandler()}>
          등록
        </button>
      </div>
    </div>
  );
};

export default WriteReview;
