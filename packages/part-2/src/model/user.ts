import mongoose, { mongo } from 'mongoose';
const { Schema } = mongoose;

export const user = mongoose.model(
  'user',
  new Schema({
    name: String, // String is shorthand for {type: String}
    email: String,
    status: {
      type: String,
      enum: ['active', 'inactive'],
    },
  })
);
