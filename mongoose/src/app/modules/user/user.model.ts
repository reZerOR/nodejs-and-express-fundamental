import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  console.log(this, 'pre hook: we will save data');
  //hasing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
userSchema.post('save', function (doc, next) {
  doc.password = '';
  console.log(this, 'pre hook: we saved data');
  next();
});

export const UserModel = model<TUser>('User', userSchema);
