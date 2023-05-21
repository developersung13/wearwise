import { ConnectOptions, MongoClient } from 'mongodb';

const options = { useNewUrlParser: true } as ConnectOptions;
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(
      process.env.MONGODB_URI as string,
      options
    ).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(
    process.env.MONGODB_URI as string,
    options
  ).connect();
}

export { connectDB };
