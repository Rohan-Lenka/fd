import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateCartitemsValidation = z.object({
  cartId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid cart ID',
  }),
  storeProductId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid store product ID',
  }),
  qty: z.number({ required_error: 'Quantity is required' }),
  priceAtAdd: z.number({ required_error: 'Price at add is required' }),
  name: z.string().optional(),
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

export const PatchCartitemsValidation = z.object({
  cartId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid cart ID',
    })
    .optional(),
  storeProductId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid store product ID',
    })
    .optional(),
  qty: z.number().optional(),
  priceAtAdd: z.number().optional(),
  name: z.string().optional(),
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
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const RemoveCartitemsValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid cart item ID',
  }),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export type CreateCartitemsDTO = z.infer<typeof CreateCartitemsValidation>;
export type PatchCartitemsDTO = z.infer<typeof PatchCartitemsValidation>;
export type RemoveCartitemsDTO = z.infer<typeof RemoveCartitemsValidation>;
