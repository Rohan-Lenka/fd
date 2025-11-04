import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateOrdersValidation = z.object({
  userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid user ID',
  }),
  darkStoreId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid darkStore ID',
  }),
  addressId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid address ID',
    })
    .optional(),
  status: z.string().optional().default('pending'),
  paymentStatus: z.string().optional().default('pending'),
  deliveryPartnerId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid delivery partner ID',
    })
    .optional(),
  etaMinutes: z.number().optional(),
  placedAt: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const PatchOrdersValidation = z.object({
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
  addressId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid address ID',
    })
    .optional(),
  status: z.string().optional(),
  paymentStatus: z.string().optional(),
  deliveryPartnerId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid delivery partner ID',
    })
    .optional(),
  etaMinutes: z.number().optional(),
  placedAt: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const RemoveOrdersValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid order ID',
  }),
});

export type CreateOrdersDTO = z.infer<typeof CreateOrdersValidation>;
export type PatchOrdersDTO = z.infer<typeof PatchOrdersValidation>;
export type RemoveOrdersDTO = z.infer<typeof RemoveOrdersValidation>;
