import config from '../../config';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: Student) => {
  // create a user object
  const userData: Partial<TUser> = {
    password: password || (config.default_password as string),
    role: 'student',
    id: '203010001',
  };

  const newUser = await UserModel.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference id
    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
