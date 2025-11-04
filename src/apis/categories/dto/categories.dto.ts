import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateCategoriesValidation = z.object({
  masterCategory: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid category ID',
  }),
  name: z.string({ required_error: 'Name is required' }),
  slug: z.string().optional(),
  image: z.string().optional(),
  position: z.number().optional().default(0),
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

export const PatchCategoriesValidation = z.object({
  masterCategory: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid category ID',
  }),
  name: z.string().optional(),
  slug: z.string().optional(),
  image: z.string().optional(),
  position: z.number().optional(),
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

export const RemoveCategoriesValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid category ID',
  }),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export type CreateCategoriesDTO = z.infer<typeof CreateCategoriesValidation>;
export type PatchCategoriesDTO = z.infer<typeof PatchCategoriesValidation>;
export type RemoveCategoriesDTO = z.infer<typeof RemoveCategoriesValidation>;
