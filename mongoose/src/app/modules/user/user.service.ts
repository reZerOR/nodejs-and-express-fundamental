import { error } from 'console';
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utiles';
import mongoose from 'mongoose';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: Student) => {
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester
  );
  if (!admissionSemester) {
    throw new Error('admission semester not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create a user object
    const userData: Partial<TUser> = {
      password: password || (config.default_password as string),
      role: 'student',
      id: await generateStudentId(admissionSemester),
    };

    // transaction 1
    const newUser = await UserModel.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference id

    // transection 2
    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
};
