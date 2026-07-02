/**
 * Idempotent admin seed: creates DynamoDB users table (if missing) and one admin user.
 *
 * Usage: npm run db:seed
 * Requires .env.local with SESSION_SECRET, AWS/DynamoDB vars, SEED_ADMIN_* .
 */
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import {
  CreateTableCommand,
  DescribeTableCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

function loadEnvFile(filename: string) {
  const path = resolve(process.cwd(), filename);
  if (!existsSync(path)) return;
  const content = readFileSync(path, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const tableName = process.env.DYNAMODB_USERS_TABLE ?? "tress-marias-users";
const region = process.env.AWS_REGION ?? "us-east-1";
const endpoint = process.env.DYNAMODB_ENDPOINT;
const adminUsername = process.env.SEED_ADMIN_USERNAME ?? "admin";
const adminPassword = process.env.SEED_ADMIN_PASSWORD;

if (!adminPassword) {
  console.error("SEED_ADMIN_PASSWORD is required in .env.local");
  process.exit(1);
}

const seedPassword: string = adminPassword;

const client = new DynamoDBClient({
  region,
  ...(endpoint ? { endpoint } : {}),
  ...(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
    ? {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      }
    : {}),
});

const doc = DynamoDBDocumentClient.from(client);

async function ensureTable() {
  try {
    await client.send(new DescribeTableCommand({ TableName: tableName }));
    console.log(`Table "${tableName}" already exists.`);
    return;
  } catch {
    // create below
  }

  await client.send(
    new CreateTableCommand({
      TableName: tableName,
      BillingMode: "PAY_PER_REQUEST",
      AttributeDefinitions: [{ AttributeName: "username", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "username", KeyType: "HASH" }],
    }),
  );

  console.log(`Created table "${tableName}".`);
}

async function seedAdmin() {
  const existing = await doc.send(
    new GetCommand({
      TableName: tableName,
      Key: { username: adminUsername },
    }),
  );

  if (existing.Item) {
    console.log(`Admin user "${adminUsername}" already exists — skipping.`);
    return;
  }

  const passwordHash = await bcrypt.hash(seedPassword, 12);
  await doc.send(
    new PutCommand({
      TableName: tableName,
      Item: {
        username: adminUsername,
        userId: randomUUID(),
        passwordHash,
        role: "admin",
        createdAt: new Date().toISOString(),
      },
      ConditionExpression: "attribute_not_exists(username)",
    }),
  );

  console.log(`Seeded admin user "${adminUsername}".`);
}

async function main() {
  await ensureTable();
  await seedAdmin();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
