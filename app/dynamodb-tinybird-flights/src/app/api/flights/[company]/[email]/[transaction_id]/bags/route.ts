export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const ddb_table_name = process.env.DDB_TABLE_NAME;
const ddb_table_region = process.env.DDB_TABLE_REGION;

const client = new DynamoDBClient({ region: ddb_table_region });
const docClient = DynamoDBDocumentClient.from(client);

export async function POST(request: Request, { params }: { params: Promise<{ company: string, email: string, transaction_id: string }> }) {
    const transaction_id = (await params).transaction_id
    const company = (await params).company
    const email = (await params).email
    const bags = await request.json();

    const command = new UpdateCommand({
        TableName: ddb_table_name,
        Key: {
            PK: `COMPANY#${company}`,
            SK: `EMAIL#${email}#TXID#${transaction_id}`
        },
        UpdateExpression: "SET extra_bags = :bags",
        ExpressionAttributeValues: {
            ":bags": bags.extra_bags
        },
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