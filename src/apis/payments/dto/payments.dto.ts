import { z } from 'zod';
import { Types } from 'mongoose';

export const CreatePaymentsValidation = z.object({
  orderId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid order ID',
  }),
  userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid user ID',
  }),
  method: z.string().optional(),
  status: z.string().optional().default('pending'),
  amount: z.number({ required_error: 'Amount is required' }),
  transactionId: z.string().optional(),
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

export const PatchPaymentsValidation = z.object({
  orderId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid order ID',
    })
    .optional(),
  userId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid user ID',
    })
    .optional(),
  method: z.string().optional(),
  status: z.string().optional(),
  amount: z.number().optional(),
  transactionId: z.string().optional(),
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
  updatedAt: z.date().optional(),
});

export const RemovePaymentsValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid payment ID',
  }),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export type CreatePaymentsDTO = z.infer<typeof CreatePaymentsValidation>;
export type PatchPaymentsDTO = z.infer<typeof PatchPaymentsValidation>;
export type RemovePaymentsDTO = z.infer<typeof RemovePaymentsValidation>;
