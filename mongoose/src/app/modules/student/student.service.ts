import path from 'path';
import { StudentModel } from './student.model';
import mongoose from 'mongoose';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import { UserModel } from '../user/user.model';
import { Student } from './student.interface';
import { log } from 'console';

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentsFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};
const updatedSingleStudentsFromDB = async (
  id: string,
  payload: Partial<Student>
) => {
  const { name, guardian, localGuardian, ...remainingData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingData };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  });
  console.log(result);

  return result;
};
const deleteSingleStudentsFromDB = async (id: string) => {
  const isStudentExists = await StudentModel.isUserExists(id);
  console.log(isStudentExists);

  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Not Student found');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    console.log('1');
    console.log(deletedStudent);

    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    console.log(deletedUser);

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed create Delete user');
  }
};
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteSingleStudentsFromDB,
  updatedSingleStudentsFromDB,
};
