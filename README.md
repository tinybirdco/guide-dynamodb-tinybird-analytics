# Guide: Analyze DynamoDB data with Tinybird

This guide will show you how to analyze DynamoDB data with Tinybird.

You'll use Tinybird's open source [DynamoDBExporter](https://github.com/tinybirdco/DynamoDBExporter) to capture historical and change data from DynamoDB tables and import it into Tinybird. [This guide](https://www.tinybird.co/docs/guides/ingesting-data/ingest-from-dynamodb) covers the integration in more detail.

> [!TIP]
> Tinybird is actively developing a native DynamoDB connector. Contact us on support@tinybird.co to register your interest and receive notifications when it's live.

## Running the demo

1. Clone this repo

### Initial AWS & DynamoDB config

[This guide](https://www.tinybird.co/docs/guides/ingesting-data/ingest-from-dynamodb) covers the integration in more detail.

1. Create a DynamoDB table called `tinybird_flights` with Partition key `transaction_id` of type `String`
2. Enable DDB Streams & PITR on the table [1](https://www.tinybird.co/docs/guides/ingesting-data/ingest-from-dynamodb#2-enable-dynamodb-streams-pitr)
3. Create a new S3 bucket called `tinybird-flights`
4. Create a new IAM Policy called `tinybird_flights_lambda` using the [DynamoDBExporter template](https://github.com/tinybirdco/DynamoDBExporter/blob/main/DDBStreamCDC/lambda_policy.json) [2](https://www.tinybird.co/docs/guides/ingesting-data/ingest-from-dynamodb#4-create-the-iam-policy)
5. Create a new IAM Role called `tinybird_flights_lambda` for the `Lambda` service and assign the `tinybird_flights_lambda` policy [3](https://www.tinybird.co/docs/guides/ingesting-data/ingest-from-dynamodb#5-create-the-iam-role)
6. Create a new Lambda function called `tinybird_flights` using the [DynamoDBExporter function](https://github.com/tinybirdco/DynamoDBExporter/blob/main/DDBStreamCDC/lambda_function.py) and create the S3 & DynamoDB triggers [4](https://www.tinybird.co/docs/guides/ingesting-data/ingest-from-dynamodb#5-create-the-iam-role)

### Set up Tinybird

1. Create a Tinybird account & Workspace
2. Copy your admin token
3. Go to the `tinybird` dir of this repo
4. Create a python venv with `python3 -m venv .venv`
5. Activate the venv with `source .venv/bin/activate`
6. Install the Tinybird CLI with `pip install tinybird-cli`
7. Authenticate with the CLI with `tb auth`
8. Run `tb push` to push the Tinybird resources to your Workspace

### Run the frontend

The demo uses Vercel and Next.js.

Vercel Serverless Functions are used for the backend APIs that interact with DynamoDB. To ensure that the DynamoDB calls work properly, you should use the Vercel CLI and `vercel dev` to run the app locally.

Tinybird APIs are called directly from the browser. 

1. [Install the Vercel CLI](https://vercel.com/docs/cli)
2. Go to the `app/dynamodb-tinybird-flights` dir of this repo
3. Install dependencies with `pnpm i`
4. Configure your environment variables in a `.env` file. You can use the `.env.example` file as a template.
5. Run locally with `vercel dev`
6. Go to the UI on `http://localhost:3000`
7. On the UI, use the data control buttons to send some data to the DynamoDB table

### Completing AWS config

1. Trigger an S3 Export for the DynamoDB table [5](https://www.tinybird.co/docs/guides/ingesting-data/ingest-from-dynamodb#7-start-a-dynamodb-s3-export)
2. Enable the DynamoDB trigger on the Lambda
