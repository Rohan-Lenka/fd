import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateSupportTicketsValidation = z.object({
  email: z.string().email().optional(),
  attachment: z.string().optional(),
  orderId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid order ID',
    })
    .optional(),
  reason: z.string().optional(),
  description: z.string().optional(),
  createdBy: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid creator ID',
  }),
  updatedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid updater ID',
    })
    .optional(),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deleted: z.boolean().optional().default(false),
  deletedAt: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const PatchSupportTicketsValidation = z.object({
  email: z.string().email().optional(),
  attachment: z.string().optional(),
  orderId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid order ID',
    })
    .optional(),
  reason: z.string().optional(),
  description: z.string().optional(),
  updatedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid updater ID',
    })
    .optional(),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deleted: z.boolean().optional(),
  deletedAt: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const RemoveSupportTicketsValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid user ID',
  }),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export type CreateSupportTicketsDTO = z.infer<
  typeof CreateSupportTicketsValidation
>;
export type PatchSupportTicketsDTO = z.infer<
  typeof PatchSupportTicketsValidation
>;
export type RemoveSupportTicketsDTO = z.infer<
  typeof RemoveSupportTicketsValidation
>;
