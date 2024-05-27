import { z } from 'zod';

const userSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'password must be string',
    })
    .min(8, 'password can not be less then 8 char')
    .max(20, "password can't be more than 20 char")
    .optional(),
});

export const UserValidation = {
  userSchema,
};
