import { z } from "zod";

export const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC",
] as const;

export const PRODUCT_SLUGS = ["final-expense", "term-life", "whole-life"] as const;
export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export const COVERAGE_OPTIONS: Record<ProductSlug, string[]> = {
  "final-expense": ["$5,000", "$10,000", "$15,000", "$20,000", "$25,000", "$50,000"],
  "term-life": ["$100,000", "$250,000", "$500,000", "$750,000", "$1,000,000", "$2,000,000+"],
  "whole-life": ["$25,000", "$50,000", "$100,000", "$250,000", "$500,000"],
};

export const quoteSchema = z.object({
  product: z.enum(PRODUCT_SLUGS),
  coverage: z.string().min(1, "Select a coverage amount"),
  state: z.enum(US_STATES, { message: "Select your state" }),
  age: z.coerce
    .number({ message: "Enter your age" })
    .int("Enter a whole number")
    .min(18, "Must be at least 18")
    .max(90, "Must be 90 or younger"),
  gender: z.enum(["female", "male"], { message: "Select an option" }),
  tobacco: z.enum(["no", "yes"], { message: "Select an option" }),
  firstName: z.string().min(1, "Enter your first name").max(100),
  lastName: z.string().min(1, "Enter your last name").max(100),
  phone: z
    .string()
    .min(1, "Enter your phone number")
    .regex(/^[\d\s()+.-]{10,20}$/, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "Consent is required to receive your quotes" }),
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteLead = z.output<typeof quoteSchema>;
