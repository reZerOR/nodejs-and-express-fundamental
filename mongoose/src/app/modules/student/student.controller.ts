import { RequestHandler } from 'express';
import { StudentServices } from './student.service';
import { sendResponse } from '../../utiles/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utiles/catchAsync';

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);
  sendResponse(res, {
    success: true,
    message: 'Students are retrived succesfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleStudents: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(id);
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
    const { id } = req.params;
    const result = await StudentServices.deleteSingleStudentsFromDB(id);
    sendResponse(res, {
      success: true,
      message: 'Student is deleted successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateSingleStudent: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { student } = req.body;
    const result = await StudentServices.updatedSingleStudentsFromDB(
      id,
      student
    );
    sendResponse(res, {
      success: true,
      message: 'Student is updated successfully',
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
  updateSingleStudent,
};
