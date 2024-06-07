import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TAcademicFaculty } from './academicFaculty.interface';
import { academicFacultyModel } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (paylod: TAcademicFaculty) => {
  const result = await academicFacultyModel.create(paylod);
  return result;
};

const getAllAcademicFacultiesFromDB = async () => {
  const result = await academicFacultyModel.find();
  return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await academicFacultyModel.findById(id);
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  paylod: Partial<TAcademicFaculty>
) => {
  const result = await academicFacultyModel.findOneAndUpdate(
    {
      _id: id,
    },
    paylod,
    { new: true }
  );
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  updateAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
};
