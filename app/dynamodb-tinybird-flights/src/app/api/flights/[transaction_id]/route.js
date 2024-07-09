export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const ddb_table_name = process.env.DDB_TABLE_NAME;
const ddb_table_region = process.env.DDB_TABLE_REGION;

const client = new DynamoDBClient({ region: ddb_table_region });
const docClient = DynamoDBDocumentClient.from(client);

export async function GET(
    request,
    { params }
) {
    const transaction_id = params.transaction_id

    const command = new GetCommand({
        TableName: ddb_table_name,
        Key: {
            transaction_id: transaction_id
        }
    });

    const response = await docClient.send(command);
    return new Response(JSON.stringify(response.Item));
}

export async function DELETE(
    request,
    { params }
) {
    const transaction_id = params.transaction_id

    const command = new DeleteCommand({
        TableName: ddb_table_name,
        Key: {
            transaction_id: transaction_id
        }
    });

    const response = await docClient.send(command);
    return new Response(response.$metadata.httpStatusCode);
}