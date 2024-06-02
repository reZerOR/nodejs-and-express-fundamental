import { Router } from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import { validateRequest } from '../../middlwares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.academicSemesterValidationSchema),
  AcademicSemesterController.createAcademicSemester
);

export const AcademicSemesterRoutes = router;
