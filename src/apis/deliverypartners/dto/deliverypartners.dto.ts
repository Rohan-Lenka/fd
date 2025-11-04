import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateDeliverypartnersValidation = z.object({
  darkStoreIds: z
    .array(
      z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid darkStore ID',
      }),
    )
    .optional(),
  name: z.string().optional(),
  mobile: z.string().optional(),
  vehicleType: z.string().optional(),
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

export const PatchDeliverypartnersValidation = z.object({
  darkStoreIds: z
    .array(
      z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid darkStore ID',
      }),
    )
    .optional(),
  name: z.string().optional(),
  mobile: z.string().optional(),
  vehicleType: z.string().optional(),
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

export const RemoveDeliverypartnersValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid delivery partner ID',
  }),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export type CreateDeliverypartnersDTO = z.infer<
  typeof CreateDeliverypartnersValidation
>;
export type PatchDeliverypartnersDTO = z.infer<
  typeof PatchDeliverypartnersValidation
>;
export type RemoveDeliverypartnersDTO = z.infer<
  typeof RemoveDeliverypartnersValidation
>;
