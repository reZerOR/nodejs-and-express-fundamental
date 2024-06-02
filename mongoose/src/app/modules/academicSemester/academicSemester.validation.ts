import { z } from 'zod';
import { month } from './academicSemester.model'

const academicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Summer', 'Fall']),
    code: z.enum(['01', '02', '03']),
    year: z.string(),
    startMonth: z.enum([...month] as [string, ...string[]]),
    endMonth: z.enum([...month] as [string, ...string[]]),
  }),
});

export const AcademicSemesterValidation = {
  academicSemesterValidationSchema,
};
