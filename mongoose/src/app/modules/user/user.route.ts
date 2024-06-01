import express from 'express';
import { userController } from './user.controller';
import studentValidationSchema from '../student/student.validation';
import { validateRequest } from '../../middlwares/validateRequest';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidationSchema),
  userController.createStudent
);

export const UserRoutes = router;
