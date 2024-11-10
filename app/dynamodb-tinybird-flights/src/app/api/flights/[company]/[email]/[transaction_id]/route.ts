export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const ddb_table_name = process.env.DDB_TABLE_NAME;
const ddb_table_region = process.env.DDB_TABLE_REGION;

const client = new DynamoDBClient({ region: ddb_table_region });
const docClient = DynamoDBDocumentClient.from(client);

export async function GET(request: Request, { params }: { params: Promise<{ company: string, email: string, transaction_id: string }> }) {
    const email = (await params).email
    const transaction_id = (await params).transaction_id
    const company = (await params).company

    const command = new GetCommand({
        TableName: ddb_table_name,
        Key: {
            PK: company,
            SK: `EMAIL#${email}#TXID#${transaction_id}`
        }
    });

    try {
        const response = await docClient.send(command);
        const statusCode = response.$metadata.httpStatusCode;
        if (statusCode !== 200) {
            return new Response('Error', { status: statusCode ?? 500 });
        }
        return new Response(JSON.stringify(response.Item), { status: statusCode });
    } catch (error) {
        console.error(error);
        return new Response('Error', { status: 500 });
    }
}

export async function DELETE(request: Request, props: { params: { company: string, email: string, transaction_id: string } }) {
    const params = await props.params;
    const email = params.email
    const transaction_id = params.transaction_id
    const company = params.company

    const command = new DeleteCommand({
        TableName: ddb_table_name,
        Key: {
            PK: `COMPANY#${company}`,
            SK: `EMAIL#${email}#TXID#${transaction_id}`
        }
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