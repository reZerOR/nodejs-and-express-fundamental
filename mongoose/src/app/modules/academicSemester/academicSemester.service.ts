import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  type TSemesterNameCodeMapper = {
    [key: string]: string;
  };

  const semesterNameCodeMapper: TSemesterNameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };

  if (semesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code');
  }
  const result = await AcademicSemesterModel.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
