import express from 'express';
import { userController } from './user.controller';
import studentValidationSchema from '../student/student.validation';
import { validateRequest } from '../../middlwares/validateRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidationSchema),
  userController.createStudent
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  userController.createAdmin,
);

export const UserRoutes = router;
