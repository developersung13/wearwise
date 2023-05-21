import { connectDB } from '@/util/database/dbConnection';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { id },
    } = req;

    const db = (await connectDB).db('shop');

    switch (req.method) {
      case 'POST':
        const postResult = await db.collection('review').insertOne(req.body);
        if (!postResult) {
          res.status(404).json({ message: 'Cannot post the data.' });
          return;
        }
        res.status(200).redirect(`/items/${req.body.productId}/review`);
        break;
      case 'GET':
        const getResult = await db.collection('review').find().toArray();
        if (!getResult) {
          res.status(404).json({ message: 'Items not found.' });
          return;
        }

        const filteredResult = getResult.filter(
          (getResult) => getResult.productNo === id
        );
        let reviews = filteredResult.map((review) => ({
          _id: review._id.toString(),
          productNo: review.productNo,
          writer: review.writer,
          title: review.title,
          content: review.content,
          orderedSize: review.orderedSize,
          userHeight: review.userHeight,
          userWeight: review.userWeight,
        }));

        // 리뷰 작성 고객의 성명 중 첫 글자를 제외한 나머지 문자들은 '*' 문자로 마스킹 처리 후 저장
        reviews.forEach((item) => {
          item.writer = item.writer[0] + '*'.repeat(3);
        });

        res.status(200).json(reviews);
        break;
      default:
        return;
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
}
