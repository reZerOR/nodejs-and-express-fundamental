import { error } from 'console';
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utiles';

const createStudentIntoDB = async (password: string, payload: Student) => {
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester
  );
  if(!admissionSemester){
    throw new Error('admission semester not found')
  }
  // create a user object
  const userData: Partial<TUser> = {
    password: password || (config.default_password as string),
    role: 'student',
    id: await generateStudentId(admissionSemester),
  };

  const newUser = await UserModel.create(userData);

  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; //reference id
    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
