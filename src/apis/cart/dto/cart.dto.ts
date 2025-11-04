import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateCartValidation = z.object({
  userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid user ID',
  }),
  darkStoreId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid darkStore ID',
  }),
  subtotal: z.number().optional().default(0),
  tax: z.number().optional().default(0),
  deliveryFee: z.number().optional().default(0),
  total: z.number().optional().default(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const PatchCartValidation = z.object({
  userId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid user ID',
    })
    .optional(),
  darkStoreId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid darkStore ID',
    })
    .optional(),
  subtotal: z.number().optional(),
  tax: z.number().optional(),
  deliveryFee: z.number().optional(),
  total: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const RemoveCartValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid cart ID',
  }),
});

export type CreateCartDTO = z.infer<typeof CreateCartValidation>;
export type PatchCartDTO = z.infer<typeof PatchCartValidation>;
export type RemoveCartDTO = z.infer<typeof RemoveCartValidation>;
