import { RequestHandler } from 'express';
import { catchAsync } from '../../utiles/catchAsync';
import { sendResponse } from '../../utiles/sendResponse';
import httpStatus from 'http-status';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester created successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
