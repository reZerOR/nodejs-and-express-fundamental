import httpStatus from 'http-status';
import { catchAsync } from '../../utiles/catchAsync';
import { sendResponse } from '../../utiles/sendResponse';
import { academicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is Created succesfully',
    data: result,
  });
});
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.getAllAcademicDepartmentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Departments fethced  succesfully',
    data: result,
  });
});
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department fethced  succesfully',
    data: result,
  });
});
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const {departmentId } = req.params;
  const result =
    await academicDepartmentServices.updateAcademicDepartmentIntoDB(
      departmentId,
      req.body
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department updated succesfully',
    data: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
