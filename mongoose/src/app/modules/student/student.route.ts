import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// will call controller function
router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudents);
router.delete('/:studentId', StudentController.deleteSingleStudents);
router.patch('/:studentId', StudentController.updateSingleStudent);

export const StudentRoutes = router;
