import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrived succesfully',
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
    res.status(200).json({
      success: true,
      message: 'Student is retrived succesfully',
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
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully succesfully',
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
