export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import { Booking } from "@/lib/bookings";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const ddb_table_name = process.env.DDB_TABLE_NAME;
const ddb_table_region = process.env.DDB_TABLE_REGION;

const client = new DynamoDBClient({ region: ddb_table_region });
const docClient = DynamoDBDocumentClient.from(client);

export async function GET(request: Request, props: { params: { company: string, email: string } }) {
    const params = await props.params;
    const company = params.company;
    const email = params.email;

    const command = new QueryCommand({
        "TableName": ddb_table_name,
        "ScanIndexForward": true,
        "ConsistentRead": false,
        "KeyConditionExpression": "#PK = :PK And begins_with(#SK, :SK)",
        "ExpressionAttributeValues": {
            ":PK": "COMPANY#" + company,
            ":SK": "EMAIL#" + email + "#"
        },
        "ExpressionAttributeNames": {
            "#PK": "PK",
            "#SK": "SK"
        }
    });

    try {
        const response = await docClient.send(command);
        const statusCode = response.$metadata.httpStatusCode;
        if (statusCode !== 200) {
            return new Response('Error', { status: statusCode ?? 500 });
        }
        const items = response.Items ?? [];
        console.log(items);
        return new Response(JSON.stringify(items), { status: statusCode });
    } catch (error) {
        console.error(error);
        return new Response('Error', { status: 500 });
    }
}