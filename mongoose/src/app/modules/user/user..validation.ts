
import { z } from 'zod';

const userSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .min(8, 'password can not be less then 8 char')
    .max(20, "password can't be more than 20 char"),
  needsPasswordChange: z.boolean().optional().default(true),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  role: z.enum(['student', 'faculty', 'admin']),
  isDeleted: z.boolean().optional().default(false),
});

export const UserValidation = {
  userSchema,
};
