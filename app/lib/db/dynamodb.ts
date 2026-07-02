import "server-only";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

function getTableName(): string {
  const table = process.env.DYNAMODB_USERS_TABLE;
  if (!table) {
    throw new Error("DYNAMODB_USERS_TABLE is not set");
  }
  return table;
}

function createDocumentClient(): DynamoDBDocumentClient {
  const region = process.env.AWS_REGION ?? "us-east-1";
  const endpoint = process.env.DYNAMODB_ENDPOINT;

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

  return DynamoDBDocumentClient.from(client, {
    marshallOptions: { removeUndefinedValues: true },
  });
}

let docClient: DynamoDBDocumentClient | null = null;

export function getDocClient(): DynamoDBDocumentClient {
  if (!docClient) {
    docClient = createDocumentClient();
  }
  return docClient;
}

export function usersTable(): string {
  return getTableName();
}
