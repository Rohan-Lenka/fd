import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateDarkstoresValidation = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  geoLocation: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  servingRadiusKm: z.number().optional(),
  isServiceable: z.boolean().optional().default(true),
  timezone: z.string().optional().default('Asia/Kolkata'),
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
});

export const PatchDarkstoresValidation = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  geoLocation: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  servingRadiusKm: z.number().optional(),
  isServiceable: z.boolean().optional(),
  timezone: z.string().optional(),
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
});

export const RemoveDarkstoresValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid darkstore ID',
  }),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export type CreateDarkstoresDTO = z.infer<typeof CreateDarkstoresValidation>;
export type PatchDarkstoresDTO = z.infer<typeof PatchDarkstoresValidation>;
export type RemoveDarkstoresDTO = z.infer<typeof RemoveDarkstoresValidation>;
