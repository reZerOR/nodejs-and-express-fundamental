import { z } from 'zod';

const academicDepartementValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'academic Department must be string',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic faculty is required',
    }),
  }),
});
const updateAcademicDepartementValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'academic Department must be string',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic faculty is required',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  academicDepartementValidationSchema,
  updateAcademicDepartementValidationSchema,
};
