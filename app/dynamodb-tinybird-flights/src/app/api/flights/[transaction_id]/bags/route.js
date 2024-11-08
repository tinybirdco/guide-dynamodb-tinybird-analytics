export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const ddb_table_name = process.env.DDB_TABLE_NAME;
const ddb_table_region = process.env.DDB_TABLE_REGION;

const client = new DynamoDBClient({ region: ddb_table_region });
const docClient = DynamoDBDocumentClient.from(client);

export async function POST(request, props) {
    const params = await props.params;
    const transaction_id = params.transaction_id
    const bags = await request.json();

    const command = new UpdateCommand({
        TableName: ddb_table_name,
        Key: {
            transaction_id: transaction_id
        },
        UpdateExpression: "SET extra_bags = :bags",
        ExpressionAttributeValues: {
            ":bags": bags.extra_bags
        },
    });

    const response = await docClient.send(command);
    return new Response(JSON.stringify(response.$metadata.httpStatusCode));
}