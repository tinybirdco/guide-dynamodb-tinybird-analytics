export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchWriteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const ddb_table_name = process.env.DDB_TABLE_NAME;
const ddb_table_region = process.env.DDB_TABLE_REGION;

const client = new DynamoDBClient({ region: ddb_table_region });
const docClient = DynamoDBDocumentClient.from(client);

export async function PUT(request) {
    const items = await request.json();

    const payload = {
        RequestItems: {
            [ddb_table_name]: items.items.map(item => {
                return {
                    PutRequest: {
                        Item: item
                    }
                };
            })
        }
    };

    const command = new BatchWriteCommand({
        ...payload
    });

    try {
        const response = await docClient.send(command);
        const statusCode = response.$metadata.httpStatusCode;
        if (statusCode !== 200) {
            return new Response('Error', { status: statusCode ?? 500 });
        }
        return new Response('Success', { status: statusCode });
    } catch (error) {
        console.error(error);
        return new Response('Error', { status: 500 });
    }
}