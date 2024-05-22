import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (studentData: Student) => {
  if (await StudentModel.isUserExists(studentData.id)) {
    throw new Error('User already exits');
  }
  const result = await StudentModel.create(studentData);

  // const student = new StudentModel(studentData);
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exits')
  // }
  // const result = student.save();
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentsFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};
const deleteSingleStudentsFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, {isDeleted: true});
  return result;
};
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteSingleStudentsFromDB
};
