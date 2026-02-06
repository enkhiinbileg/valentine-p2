import { S3Client } from "@aws-sdk/client-s3";

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();

console.log('R2 Client Initialization Info:', {
    hasAccountId: !!accountId,
    accountIdPrefix: accountId?.slice(0, 4),
    accountIdLen: accountId?.length,
    hasAccessKey: !!accessKeyId,
    hasSecretKey: !!secretAccessKey,
    secretKeyLen: secretAccessKey?.length
});

export const r2 = accountId ? new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: accessKeyId || "",
        secretAccessKey: secretAccessKey || "",
    },
    forcePathStyle: true,
}) : null;

if (!accountId) {
    console.warn("WARNING: CLOUDFLARE_ACCOUNT_ID is not defined. R2 Storage will not work.");
}
