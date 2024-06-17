import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import { sendResponse } from '../../utiles/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utiles/catchAsync';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Student is created succesfully',
      data: result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});
export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
};
