import { S3Client, PutBucketCorsCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
const bucketName = process.env.R2_BUCKET_NAME?.trim();

if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
    console.error("Missing credentials in .env.local");
    process.exit(1);
}

const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
});

async function setCors() {
    console.log(`Setting CORS for bucket: ${bucketName}...`);
    const command = new PutBucketCorsCommand({
        Bucket: bucketName,
        CORSConfiguration: {
            CORSRules: [
                {
                    AllowedHeaders: ["*"],
                    AllowedMethods: ["PUT", "GET", "HEAD"],
                    AllowedOrigins: ["*"], // In production, you might want to restrict this to your domain
                    ExposeHeaders: [],
                    MaxAgeSeconds: 3000,
                },
            ],
        },
    });

    try {
        await s3.send(command);
        console.log("CORS updated successfully!");
    } catch (err) {
        console.error("Error setting CORS:", err);
    }
}

setCors();
