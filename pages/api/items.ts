import { connectDB } from '@/util/database/dbConnection';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = (await connectDB).db('shop');
    const result = await db.collection('items').find().toArray();
    if (!result) {
      res.status(404).json({ message: 'Items not found.' });
      return;
    }

    switch (req.method) {
      case 'POST':
        break;
      case 'GET':
        const items = result.map((item) => ({
          _id: item._id.toString(),
          name: item.name,
          price: item.price,
          maxSize: item.maxSize,
        }));
        res.status(200).json(items);
        break;
      default:
        return;
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
}
