import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
body: z.object({
  name: z.string({
    invalid_type_error: 'academic faculty must be string',
  }),
})
});

export const AcademicFacultyValidation = {
  academicFacultyValidationSchema,
};
