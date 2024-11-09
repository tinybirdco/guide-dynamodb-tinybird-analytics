export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import { Booking } from "@/lib/bookings";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const ddb_table_name = process.env.DDB_TABLE_NAME;
const ddb_table_region = process.env.DDB_TABLE_REGION;

const client = new DynamoDBClient({ region: ddb_table_region });
const docClient = DynamoDBDocumentClient.from(client);

export async function PUT(request: Request) {
    const item: Booking = await request.json();

    const command = new PutCommand({
        TableName: ddb_table_name,
        Item: item,
    });

    try {
        const response = await docClient.send(command);
        const statusCode = response.$metadata.httpStatusCode;
        if (statusCode !== 200) {
            return new Response(JSON.stringify({ response: 'Error' }), { status: statusCode ?? 500 });
        }
        return new Response(JSON.stringify({ response: 'Success' }), { status: statusCode });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ response: 'Error' }), { status: 500 });
    }
}