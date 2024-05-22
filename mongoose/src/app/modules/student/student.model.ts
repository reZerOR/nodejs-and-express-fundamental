import { Schema, model, connect } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  StudentMethod,
  // StudentMethodModel,
  // StudentMethods,
  UserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { boolean } from 'zod';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    // trim: true,
    // maxlength: [10, 'firstname cannot be more than 10 char'],
    // required: true,
    // validate: {
    //   validator: function (value: string) {
    //     const firstName =
    //       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    //     return firstName === value;
    //   },
    //   message: "{VALUE} is not capitalize format"
    // },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  address: { type: String, required: true },
  contactNo: { type: String, required: true },
});
const studentSchema = new Schema<Student, StudentMethod>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true, maxlength: 20 },
  name: { type: userNameSchema, required: true },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: String },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuardianSchema, required: true },
  profileImg: { type: String },
  isActive: { type: String, enum: ['active', 'blocked'], default: 'active' },
  isDeleted: { type: Boolean, default: false },
});
// virtual




// middlewere
studentSchema.pre('save', async function (next) {
  console.log(this, 'pre hook: we will save data');
  //hasing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  console.log(this, 'pre hook: we saved data');
  next();
});

studentSchema.pre('find', function(next){
  this.find({isDeleted: {$ne: true}})
  next()
})
studentSchema.pre('findOne', function(next){
  this.find({isDeleted: {$ne: true}})
  next()
})
studentSchema.statics.isUserExists = async (id: string) => {
  const exitingUser = await StudentModel.findOne({ id });
  return exitingUser;
};

// for creating instance model

// studentSchema.methods.isUserExists = async (id:string) =>{
//   const exitingUser = await StudentModel.findOne({id})
//   return exitingUser
// }

export const StudentModel = model<Student, StudentMethod>(
  'Student',
  studentSchema
);
