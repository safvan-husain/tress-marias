"use server";

import { redirect } from "next/navigation";
import {
  type AuthFormState,
  createDoctorSchema,
  loginSchema,
  signupSchema,
} from "@/app/lib/auth/definitions";
import { verifyRole } from "@/app/lib/auth/dal";
import { hashPassword, verifyPassword } from "@/app/lib/auth/password";
import { createSession, deleteSession } from "@/app/lib/auth/session";
import { createUser, getUserByUsername } from "@/app/lib/db/users";

function fieldErrors(error: {
  flatten: () => { fieldErrors: Record<string, string[] | undefined> };
}): AuthFormState {
  const flattened = error.flatten();
  return {
    errors: {
      username: flattened.fieldErrors.username,
      password: flattened.fieldErrors.password,
    },
  };
}

export async function customerSignup(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const validated = signupSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return fieldErrors(validated.error);
  }

  const { username, password } = validated.data;

  try {
    const passwordHash = await hashPassword(password);
    const user = await createUser({
      username,
      passwordHash,
      role: "customer",
    });
    await createSession({
      userId: user.userId,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "USERNAME_TAKEN") {
      return { message: "That username is already taken." };
    }
    return { message: "Could not create your account. Please try again." };
  }

  redirect("/account");
}

export async function customerLogin(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const validated = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return fieldErrors(validated.error);
  }

  const { username, password } = validated.data;
  const user = await getUserByUsername(username);

  if (!user || user.role !== "customer") {
    return { message: "Invalid username or password." };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { message: "Invalid username or password." };
  }

  await createSession({
    userId: user.userId,
    username: user.username,
    role: user.role,
  });

  redirect("/account");
}

export async function staffLogin(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const validated = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return fieldErrors(validated.error);
  }

  const { username, password } = validated.data;
  const user = await getUserByUsername(username);

  if (!user || (user.role !== "admin" && user.role !== "doctor")) {
    return { message: "Invalid username or password." };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { message: "Invalid username or password." };
  }

  await createSession({
    userId: user.userId,
    username: user.username,
    role: user.role,
  });

  redirect("/admin");
}

export async function createDoctor(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  await verifyRole("admin");

  const validated = createDoctorSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return fieldErrors(validated.error);
  }

  const { username, password } = validated.data;

  try {
    const passwordHash = await hashPassword(password);
    await createUser({
      username,
      passwordHash,
      role: "doctor",
    });
  } catch (error) {
    if (error instanceof Error && error.message === "USERNAME_TAKEN") {
      return { message: "That username is already taken." };
    }
    return { message: "Could not create doctor. Please try again." };
  }

  redirect("/admin/doctors");
}

export async function customerLogout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}

export async function staffLogout(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}
