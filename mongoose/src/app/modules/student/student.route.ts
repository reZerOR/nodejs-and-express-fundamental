import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// will call controller function
router.post('/create-student', StudentController.createStudent);
router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudents);
router.delete('/:studentId', StudentController.deleteSingleStudents);

export const StudentRoutes = router;
