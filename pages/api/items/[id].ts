import { connectDB } from '@/util/database/dbConnection';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req;

  try {
    const db = (await connectDB).db('shop');
    const result = await db
      .collection('items')
      .findOne({ _id: new ObjectId(id as string) });
    if (!result) {
      res.status(404).json({ message: 'Item not found.' });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
}
