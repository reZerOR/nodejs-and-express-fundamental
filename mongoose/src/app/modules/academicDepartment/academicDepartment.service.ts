import { TAcademicDepartment } from './academicDepartment.interface';
import { academicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (paylod: TAcademicDepartment) => {
  const result = await academicDepartmentModel.create(paylod);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await academicDepartmentModel
    .find()
    .populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await academicDepartmentModel
    .findById(id)
    .populate('academicFaculty');
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  paylod: Partial<TAcademicDepartment>
) => {
  const result = await academicDepartmentModel.findOneAndUpdate(
    {
      _id: id,
    },
    paylod,
    { new: true }
  );
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
