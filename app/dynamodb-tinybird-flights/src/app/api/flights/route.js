export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const ddb_table_name = process.env.DDB_TABLE_NAME;
const ddb_table_region = process.env.DDB_TABLE_REGION;

const client = new DynamoDBClient({ region: ddb_table_region });
const docClient = DynamoDBDocumentClient.from(client);

export async function PUT(request) {
    const item = await request.json();

    const command = new PutCommand({
        TableName: ddb_table_name,
        Item: item,
    });

    const response = await docClient.send(command);
    return new Response(response.$metadata.httpStatusCode.toString());
}