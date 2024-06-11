import { Router } from 'express';
import { validateRequest } from '../../middlwares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepartment.controller';

const router = Router();

router.post(
  '/create-academic-department',
  // validateRequest(
  //   AcademicDepartmentValidation.academicDepartementValidationSchema
  // ),
  academicDepartmentController.createAcademicDepartment
);

router.get(
  '/:departmentId',
  academicDepartmentController.getSingleAcademicDepartment
);
router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartementValidationSchema
  ),
  academicDepartmentController.updateAcademicDepartment
);

router.get('/', academicDepartmentController.getAllAcademicDepartment);

export const AcademicDepartmentRoutes = router;
