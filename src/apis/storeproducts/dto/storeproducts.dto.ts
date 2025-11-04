import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateStoreproductsValidation = z.object({
  productId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid product ID',
  }),
  darkStoreId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid darkStore ID',
  }),
  vendorId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid vendor ID',
  }),
  barcode: z.string().optional(),
  mrp: z.number({ required_error: 'MRP is required' }),
  sellingPrice: z.number({ required_error: 'Selling price is required' }),
  minQty: z.number().optional().default(1),
  maxQtyPerOrder: z.number().optional().default(10),
  stockQty: z.number().optional().default(0),
  lowStockThreshold: z.number().optional().default(0),
  reorderLeadTimeDays: z.number().optional().default(0),
  visibility: z.boolean().optional().default(true),
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

export const PatchStoreproductsValidation = z.object({
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
  vendorId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid vendor ID',
    })
    .optional(),
  barcode: z.string().optional(),
  mrp: z.number().optional(),
  sellingPrice: z.number().optional(),
  minQty: z.number().optional(),
  maxQtyPerOrder: z.number().optional(),
  stockQty: z.number().optional(),
  lowStockThreshold: z.number().optional(),
  reorderLeadTimeDays: z.number().optional(),
  visibility: z.boolean().optional(),
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

export const RemoveStoreproductsValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid store product ID',
  }),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export type CreateStoreproductsDTO = z.infer<
  typeof CreateStoreproductsValidation
>;
export type PatchStoreproductsDTO = z.infer<
  typeof PatchStoreproductsValidation
>;
export type RemoveStoreproductsDTO = z.infer<
  typeof RemoveStoreproductsValidation
>;
