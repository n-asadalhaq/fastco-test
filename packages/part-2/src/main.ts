/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import mongoose from 'mongoose';
import * as path from 'path';
import multer from 'multer';
// import { userRoute } from './routes';
import userRoute from './routes/user';
import { logger } from './middlewares/log-ip-and-timestamp';

const mongoUrl = 'mongodb://root:secret@localhost:27017/admin';
const upload = multer({ dest: path.join(__dirname, 'assets') });

const app = express();

app.set('trust proxy', true);

app.use('/', logger);
app.use('/user', [upload.single('file'), userRoute]);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

const port = process.env.PORT || 3333;
const server = app.listen(port, async () => {
  await mongoose.connect(mongoUrl, { autoCreate: true });
  console.log('Successfully connected to Mongodb ...');
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
