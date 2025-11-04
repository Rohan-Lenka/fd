import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateProductVarientValidation = z.object({
  productId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid product ID',
  }),
  darkStoreId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid darkStore ID',
  }),
  quantity: z.number({ required_error: 'Quantity is required' }),
  price: z.number({ required_error: 'Price is required' }),
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
  deleted: z.boolean().optional().default(false),
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

export const PatchProductVarientValidation = z.object({
  productId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid product ID',
    })
    .optional(),
  darkStoreId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid darkStore ID',
    })
    .optional(),
  quantity: z.number().optional(),
  price: z.number().optional(),
  updatedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid updater ID',
    })
    .optional(),
  deleted: z.boolean().optional(),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const RemoveProductVarientValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid product varient ID',
  }),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export type CreateProductVarientDTO = z.infer<
  typeof CreateProductVarientValidation
>;
export type PatchProductVarientDTO = z.infer<
  typeof PatchProductVarientValidation
>;
export type RemoveProductVarientDTO = z.infer<
  typeof RemoveProductVarientValidation
>;
