import { Router } from 'express';
import { validateRequest } from '../../middlwares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { academicFacultyController } from './academicFaculty.controller';

const router = Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyController.createAcademicFaculty
);

router.get('/:facultyId', academicFacultyController.getSingleAcademicFaculty);
router.patch(
  '/:facultyId',
  validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyController.updateAcademicFaculty
);

router.get('/', academicFacultyController.getAllAcademicFaculty);

export const AcademicFacultyRoutes = router
