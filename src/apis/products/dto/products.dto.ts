import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateProductsValidation = z.object({
  title: z.string({ required_error: 'Title is required' }),
  brand: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  hsn: z.string().optional(),
  gstRate: z.number().optional(),
  variants: z.array(z.any()).optional(),
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

export const PatchProductsValidation = z.object({
  title: z.string().optional(),
  brand: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  hsn: z.string().optional(),
  gstRate: z.number().optional(),
  variants: z.array(z.any()).optional(),
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

export const RemoveProductsValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid product ID',
  }),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export type CreateProductsDTO = z.infer<typeof CreateProductsValidation>;
export type PatchProductsDTO = z.infer<typeof PatchProductsValidation>;
export type RemoveProductsDTO = z.infer<typeof RemoveProductsValidation>;
