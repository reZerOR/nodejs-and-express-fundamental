import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import { sendResponse } from '../../utiles/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utiles/catchAsync';

const getAllStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    success: true,
    message: 'Students are retrived succesfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleStudents: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(studentId);
    sendResponse(res, {
      success: true,
      message: 'Student is retrived succesfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleStudents: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentsFromDB(studentId);
    sendResponse(res, {
      success: true,
      message: 'Student is deleted successfully succesfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const StudentController = {
  getAllStudents,
  getSingleStudents,
  deleteSingleStudents,
};
