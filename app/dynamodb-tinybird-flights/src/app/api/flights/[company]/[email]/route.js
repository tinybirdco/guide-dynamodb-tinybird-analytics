export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const ddb_table_name = process.env.DDB_TABLE_NAME;
const ddb_table_region = process.env.DDB_TABLE_REGION;

const client = new DynamoDBClient({ region: ddb_table_region });
const docClient = DynamoDBDocumentClient.from(client);

export async function GET(request, props) {
    const params = await props.params;
    const company = params.company;
    const email = params.email;

    const command = new QueryCommand({
        "TableName": "tinyflights_demo",
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
        return new Response(JSON.stringify(response));
    } catch (error) {
        console.log("TEST");
        console.error(error);
        return new Response(JSON.stringify(error), { status: 500 });
    }
}