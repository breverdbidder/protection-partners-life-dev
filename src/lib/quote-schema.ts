import { z } from "zod";

export const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC",
] as const;

export const PRODUCT_SLUGS = ["home", "auto", "business"] as const;
export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export const FOCUS_OPTIONS: Record<ProductSlug, string[]> = {
  home: ["Homeowner policy", "Condo policy", "Renters policy", "Not sure yet"],
  auto: ["One vehicle", "Two vehicles", "Three or more vehicles", "Not sure yet"],
  business: ["General liability", "Business property", "Professional liability", "Not sure yet"],
};

export const quoteSchema = z.object({
  product: z.enum(PRODUCT_SLUGS),
  focus: z.string().min(1, "Select an option"),
  state: z.enum(US_STATES, { message: "Select your state" }),
  renewal: z.enum(["soon", "later", "unsure"], { message: "Select an option" }),
  firstName: z.string().min(1, "Enter your first name").max(100),
  email: z.string().email("Enter a valid email address"),
  consent: z.boolean().refine((v) => v === true, { message: "Check the box to continue the demo" }),
});

export type QuoteInput = z.input<typeof quoteSchema>;
