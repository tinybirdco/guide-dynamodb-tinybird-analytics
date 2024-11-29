# Guide: Analyze DynamoDB data with Tinybird

This guide will show you how to analyze DynamoDB data with Tinybird.

You'll use Tinybird's [DynamoDB Connector](https://www.tinybird.co/docs/ingest/dynamodb) to capture historical and change data from DynamoDB tables and import it into Tinybird.

## Running the demo

1. Clone this repo

### Initial AWS & DynamoDB config

[The DynamoDB Connector docs](https://www.tinybird.co/docs/ingest/dynamodb) cover the integration in more detail.

1. Create a DynamoDB table called `tinybird_flights` with Partition key `transaction_id` of type `String`
2. Enable DDB Streams & PITR on the table
3. Create a new S3 bucket called `tinybird-flights`
4. Create a new IAM Policy called `tinybird_flights` using the [IAM Policy template](https://www.tinybird.co/docs/ingest/dynamodb#required-permissions)
5. Create a new IAM Role called `tinybird_flights` and apply the [IAM Role template](https://www.tinybird.co/docs/ingest/dynamodb#required-permissionsdynamodb)

### Set up Tinybird

1. [Create a Tinybird account & Workspace](https://app.tinybird.co)
2. Copy your admin token
3. Go to the `tinybird` dir of this repo
4. Create a python venv with `python3 -m venv .venv`
5. Activate the venv with `source .venv/bin/activate`
6. Install the Tinybird CLI with `pip install tinybird-cli`
7. Authenticate with the CLI with `tb auth`
8. Create a DynamoDB connection [`tb connection create dynamodb`](https://www.tinybird.co/docs/ingest/dynamodb#create-the-dynamodb-connection)
9. Run `tb push` to push the Tinybird resources to your Workspace

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
