import fs from 'fs/promises';
import path from 'path';
import { parse } from 'csv';
import mongoose from 'mongoose';
import http from 'http';

// import csvFile from './assets/MOCK_DATA.csv';

const user = mongoose.model(
  'UserQ2',
  new mongoose.Schema({
    // _id: { type: String },
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

function getReqData(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      // listen to data sent by client
      req.on('data', (chunk) => {
        // append the string version to the body
        body += chunk.toString();
      });
      // listen till the end
      req.on('end', () => {
        // send back the data
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

const userController: Record<string, http.RequestListener> = {
  async find(req, res) {
    try {
      const users = await user.find({});

      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify(users));
    } catch (e) {
      res.writeHead(500);

      res.end(JSON.stringify({ message: e }));
    }
  },
  async create(req, res) {
    try {
      const reqBody = await getReqData(req);
      const newUser = JSON.parse(reqBody);

      const createdUser = await user.create(newUser);

      res.writeHead(201, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify(createdUser));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify({ message: e }));
    }
  },
  async update(req, res) {
    try {
      const reqBody = await getReqData(req);
      const updatedField = JSON.parse(reqBody);

      const id = req.url.split('/')[2];
      console.log('id', id);

      const updatedUser = await user.updateOne(
        { _id: id },
        { $set: { ...updatedField } }
      );

      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify(updatedUser));
    } catch (e) {
      res.writeHead(500);

      res.end(JSON.stringify({ message: e }));
    }
  },
  async delete(req, res) {
    try {
      const id = req.url.split('/')[2];

      const targetUser = await user.findOne({ _id: id });

      if (!targetUser) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(
          JSON.stringify({ message: `User with id ${id} is not found` })
        );
      }

      const delResult = await user.deleteOne({ _id: id });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(delResult));
    } catch (e) {
      res.writeHead(500);

      res.end(JSON.stringify({ message: e }));
    }
  },
};

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  if (req.url.match(/\/user\/?[0-9]{0,}/)) {
    switch (method) {
      case 'GET':
        userController.find(req, res);
        break;
      case 'POST':
        userController.create(req, res);
        break;
      case 'PUT':
        userController.update(req, res);
        break;
      case 'DELETE':
        userController.delete(req, res);
        break;
      default:
        res.writeHead(404);
        res.end(`${url} with method ${method} is not found`);
    }
  } else {
    res.writeHead(404);
    res.end(`${url} with method ${method} is not found`);
  }
});

export function q2() {
  connect().then(() => {
    const port = process.env.PART_2_Q_2_PORT || 9709;
    server.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
  });
}
