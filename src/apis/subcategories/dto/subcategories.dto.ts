import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateSubcategoriesValidation = z.object({
  categoryId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid category ID',
  }),
  name: z.string({ required_error: 'Name is required' }),
  slug: z.string().optional(),
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

export const PatchSubcategoriesValidation = z.object({
  categoryId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid category ID',
    })
    .optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
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

export const RemoveSubcategoriesValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid subcategory ID',
  }),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export type CreateSubcategoriesDTO = z.infer<
  typeof CreateSubcategoriesValidation
>;
export type PatchSubcategoriesDTO = z.infer<
  typeof PatchSubcategoriesValidation
>;
export type RemoveSubcategoriesDTO = z.infer<
  typeof RemoveSubcategoriesValidation
>;
