import fs from 'fs/promises';
import path from 'path';
import { parse } from 'csv';
import mongoose, { deleteModel } from 'mongoose';

// import csvFile from './assets/MOCK_DATA.csv';

const user = mongoose.model(
  'UserQ1',
  new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    ip_address: String,
  })
);

function connect() {
  return mongoose.connect(process.env.MONGO_CLOUD_URL);
}

function clearCollection() {
  user.deleteMany({});
}

async function exportCsv() {
  try {
    const csvPath = path.join(__dirname, 'assets', 'MOCK_DATA.csv');
    const csvFile = await fs.readFile(csvPath);

    parse(csvFile, { columns: true, trim: true }, (err, data) => {
      console.log('data', data);
      const writeOps = data.map(
        ({
          id, // ignore id, let mongodb create a new one
          ...document
        }) => ({
          insertOne: {
            document,
          },
        })
      );

      user.bulkWrite([...writeOps]).then(() => {
        console.log(
          `successfully insert ${writeOps.length} into UserQ1 collection`
        );
      });
    });
  } catch (e) {
    console.error('Error exporting csv', e);
    process.exit(1);
  }
}

export function q1() {
  connect().then(() => {
    exportCsv();
  });
}
