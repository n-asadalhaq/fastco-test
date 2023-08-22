import mongoose from 'mongoose';
const { Schema } = mongoose;

export const log = mongoose.model(
  'log',
  new Schema({
    ip: String,
    timestamp: Date,
  })
);
