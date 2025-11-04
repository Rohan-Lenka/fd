import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateUsersValidation = z.object({
  firstName: z.string({ required_error: 'firstName is required' }),
  lastName: z.string({ required_error: 'lastName is required' }),
  gender: z.enum(['male', 'female', 'other']).optional(),
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z.string().min(6),
  phone: z.string({ required_error: 'Phone is required' }),
  role: z.number().int().optional().default(1), // 1, 2, 3
  status: z.number().int().optional().default(1), // 0, 1
  lastLoginAt: z.date().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  org: z
    .string()
    .refine((val) => !val || Types.ObjectId.isValid(val), {
      message: 'Invalid organization ID',
    })
    .optional()
    .nullable(),
  address: z.string().optional(),
  avatarUrl: z.string().optional(),
  createdBy: z
    .string()
    .refine((val) => !val || Types.ObjectId.isValid(val), {
      message: 'Invalid creator ID',
    })
    .optional(),
  deleted: z.boolean().optional().default(false),
  deletedBy: z
    .string()
    .refine((val) => !val || Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export const PatchUsersValidation = z.object({
  firstName: z.string().optional(),
  latName: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  phone: z.string().optional(),
  role: z.number().int().optional(),
  status: z.number().int().optional(),
  lastLoginAt: z.date().optional().nullable(),
  updatedAt: z.date().optional(),
  org: z
    .string()
    .refine((val) => !val || Types.ObjectId.isValid(val), {
      message: 'Invalid organization ID',
    })
    .optional()
    .nullable(),
  address: z.string().optional(),
  avatarUrl: z.string().optional(),
  refreshToken: z.string().optional(),
  deleted: z.boolean().optional(),
  deletedBy: z
    .string()
    .refine((val) => !val || Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export const RemoveUsersValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid user ID',
  }),
  deletedBy: z
    .string()
    .refine((val) => !val || Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export type CreateUsersDTO = z.infer<typeof CreateUsersValidation>;
export type PatchUsersDTO = z.infer<typeof PatchUsersValidation>;
export type RemoveUsersDTO = z.infer<typeof RemoveUsersValidation>;
