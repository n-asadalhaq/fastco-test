import { Router } from 'express';
import model from '../model';

const route = Router();

route.get('/', async (req, res) => {
  const users = await model.user.find();

  res.status(200).json(users);
});

route.post('/upload-file', async (req, res) => {
  try {
    console.log('req.file', req.file);
    return res.status(201).send({
      message: 'file successfully uploaded',
    });
  } catch (e) {
    return res.status(500).send({ message: 'upload file failed', error: e });
  }
});

route.post('/', async (req, res) => {
  const users = req.body;

  res.status(200).json(users);
});

export default route;
