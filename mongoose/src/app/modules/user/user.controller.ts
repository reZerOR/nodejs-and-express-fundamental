import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import { sendResponse } from '../../utiles/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
export const userController = {
  createStudent,
};
