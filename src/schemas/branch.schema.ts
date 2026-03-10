import { z } from "zod";

export const getBranchesQuerySchema = z.object({
    page: z.preprocess(
        (val) => (val === undefined ? undefined : Number(val)),
        z.number().int().min(1).default(1)
    ),
    limit: z.preprocess(
        (val) => (val === undefined ? undefined : Number(val)),
        z.number().int().min(1).max(100).default(10)
    ),
    city: z.string().optional(),
    hasAtm: z.preprocess(
        (val) => (val === "true" ? true : val === "false" ? false : undefined),
        z.boolean().optional()
    ),
});

export const createBranchSchema = z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    phone: z.string().min(1, "Phone is required"),
    lat: z.number(),
    lng: z.number(),
    workingHours: z.object({
        weekdays: z.string(),
        saturday: z.string(),
        sunday: z.string()
    }).optional(),
    hasAtm: z.boolean().optional()
});

export const updateBranchSchema = createBranchSchema.partial();
