import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateUserotpValidation = z.object({
  userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid user ID',
  }),
  otp: z.string(),
});

export const PatchUserotpValidation = z.object({
  userId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid user ID',
    })
    .optional(),
  otp: z.string().optional(),
});

export const RemoveUserotpValidation = z.object({
  userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid user ID',
  }),
});

export type CreateUserotpDTO = z.infer<typeof CreateUserotpValidation>;
export type PatchUserotpDTO = z.infer<typeof PatchUserotpValidation>;
export type RemoveUserotpDTO = z.infer<typeof RemoveUserotpValidation>;
