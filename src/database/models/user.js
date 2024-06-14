import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      default: '',
    },
    avatar: {
      type: Object,
      default: {},
    },
    age: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    about: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose?.models?.User || mongoose.model('User', userSchema);

export default User;
