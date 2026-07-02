import "server-only";
import { randomUUID } from "crypto";
import {
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import type { PublicUser, UserRecord, UserRole } from "@/app/lib/auth/definitions";
import { getDocClient, usersTable } from "@/app/lib/db/dynamodb";

function toPublicUser(record: UserRecord): PublicUser {
  return {
    username: record.username,
    userId: record.userId,
    role: record.role,
    createdAt: record.createdAt,
  };
}

export async function getUserByUsername(
  username: string,
): Promise<UserRecord | null> {
  const result = await getDocClient().send(
    new GetCommand({
      TableName: usersTable(),
      Key: { username },
    }),
  );

  if (!result.Item) return null;
  return result.Item as UserRecord;
}

export async function createUser(input: {
  username: string;
  passwordHash: string;
  role: UserRole;
}): Promise<PublicUser> {
  const existing = await getUserByUsername(input.username);
  if (existing) {
    throw new Error("USERNAME_TAKEN");
  }

  const record: UserRecord = {
    username: input.username,
    userId: randomUUID(),
    passwordHash: input.passwordHash,
    role: input.role,
    createdAt: new Date().toISOString(),
  };

  await getDocClient().send(
    new PutCommand({
      TableName: usersTable(),
      Item: record,
      ConditionExpression: "attribute_not_exists(username)",
    }),
  );

  return toPublicUser(record);
}

export async function listUsersByRole(role: UserRole): Promise<PublicUser[]> {
  const result = await getDocClient().send(
    new ScanCommand({
      TableName: usersTable(),
      FilterExpression: "#role = :role",
      ExpressionAttributeNames: { "#role": "role" },
      ExpressionAttributeValues: { ":role": role },
    }),
  );

  const items = (result.Items ?? []) as UserRecord[];
  return items
    .map(toPublicUser)
    .sort((a, b) => a.username.localeCompare(b.username));
}
