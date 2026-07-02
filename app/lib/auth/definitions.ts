import * as z from "zod";

export const ROLES = ["admin", "doctor", "customer"] as const;
export type UserRole = (typeof ROLES)[number];

export const STAFF_ROLES: UserRole[] = ["admin", "doctor"];

export const usernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z]+(?:-[a-z]+)*$/, {
    message: "Use lowercase letters and hyphens only (no spaces).",
  })
  .min(3, { message: "Username must be at least 3 characters." })
  .max(32, { message: "Username must be at most 32 characters." });

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters." })
  .max(128, { message: "Password must be at most 128 characters." });

export const loginSchema = z.object({
  username: usernameSchema,
  password: z.string().min(1, { message: "Password is required." }),
});

export const signupSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const createDoctorSchema = signupSchema;

export type AuthFormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SessionPayload = {
  userId: string;
  username: string;
  role: UserRole;
  expiresAt: string;
};

export type UserRecord = {
  username: string;
  userId: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
};

export type PublicUser = {
  username: string;
  userId: string;
  role: UserRole;
  createdAt: string;
};
