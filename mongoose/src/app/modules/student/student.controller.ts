import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import { sendResponse } from '../../utiles/sendResponse';
import httpStatus from 'http-status';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    sendResponse(res, {
      success: true,
      message: 'Students are retrived succesfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

const deleteSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
