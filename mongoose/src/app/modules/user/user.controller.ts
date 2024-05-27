import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (error) {
    // res.status(400).json({
    //   success: false,
    //   message: (error as any).message || 'not valid json',
    //   error: error,
    // });
    next(error)
  }
};
export const userController = {
  createStudent,
};
