import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateVendorsValidation = z.object({
  darkStoreId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid darkStore ID',
  }),
  name: z.string({ required_error: 'Name is required' }),
  email: z.string({ required_error: 'Email is required' }).email(),
  mobile: z.string({ required_error: 'Mobile is required' }),
  password: z.string(),
  status: z.string().optional().default('active'),
  createdBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid creator ID',
    })
    .optional(),
  updatedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid updater ID',
    })
    .optional(),
  isDeleted: z.boolean().optional().default(false),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const PatchVendorsValidation = z.object({
  darkStoreId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid darkStore ID',
    })
    .optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  mobile: z.string().optional(),
  password: z.string().optional(),
  status: z.string().optional(),
  updatedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid updater ID',
    })
    .optional(),
  isDeleted: z.boolean().optional(),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const RemoveVendorsValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid vendor ID',
  }),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export type CreateVendorsDTO = z.infer<typeof CreateVendorsValidation>;
export type PatchVendorsDTO = z.infer<typeof PatchVendorsValidation>;
export type RemoveVendorsDTO = z.infer<typeof RemoveVendorsValidation>;
