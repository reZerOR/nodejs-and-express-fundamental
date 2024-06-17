import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// will call controller function
router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudents);
router.delete('/:id', StudentController.deleteSingleStudents);
router.patch('/:id', StudentController.updateSingleStudent);

export const StudentRoutes = router;
