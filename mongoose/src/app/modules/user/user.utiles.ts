import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { UserModel } from './user.model';

const findLastStudent = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId: string = (0).toString();

  const lastStudent = await findLastStudent();
  const lastStudentSemesterCode = lastStudent?.substring(4, 6); 
  const lastStudentYear = lastStudent?.substring(0, 4);
  const currentSemesterCode = payload.code;
  const curerentYear = payload.year;
  if (
    lastStudent &&
    lastStudentSemesterCode === currentSemesterCode &&
    curerentYear === lastStudentYear
  ) {
    console.log('1');

    currentId = lastStudent?.substring(6);
  }
  let incrementId: string = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
