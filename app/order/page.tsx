'use client';

import React, { useEffect, useState } from 'react';
import Item from './components/Item';
import Loading from '../loading';

interface Item {
  _id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  size: number;
  orderNo: number;
  orderStatus: string;
  orderedDate: string;
  productNo: string;
}

export default function Order() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/orders');
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const items: Item[] = await res.json();
        setItems(items);
        setLoading(true);
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    };
    fetchItems();
  }, []);

  if (!loading) return <Loading />;

  return (
    <div className='grid h-fit mt-[6rem] mb-20 text-xs'>
      <h1 className='text-4xl text-center tracking-[1.25rem] font-extralight'>
        ORDER
      </h1>
      <div className='flex flex-col items-center flex-wrap font-light '>
        {items.map((item) => {
          return <Item key={item._id} item={item} />;
        })}
      </div>
    </div>
  );
}
