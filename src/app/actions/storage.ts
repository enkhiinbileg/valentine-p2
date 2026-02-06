'use server';

import { r2 } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * Generates a presigned URL for direct upload from the browser to R2.
 * This bypasses Vercel's 4.5MB Server Action payload limit.
 */
export async function getPresignedUrl(fileName: string, contentType: string, folder: string = 'misc') {
    console.log('--- getPresignedUrl started ---');
    try {
        if (!r2) {
            console.error('CRITICAL: R2 Client is null');
            return { success: false, error: 'Storage client not initialized', url: '', publicUrl: '' };
        }

        const bucketName = process.env.R2_BUCKET_NAME?.trim();
        const fileExt = fileName.split('.').pop() || 'bin';
        const uniqueFileName = `${folder}/${crypto.randomUUID()}.${fileExt}`;

        console.log(`Generating presigned URL for: ${uniqueFileName}, Type: ${contentType}`);

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: uniqueFileName,
            ContentType: contentType,
        });

        // URL expires in 3600 seconds (1 hour)
        const presignedUrl = await getSignedUrl(r2, command, { expiresIn: 3600 });
        const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim()}/${uniqueFileName}`;

        console.log('Presigned URL generated successfully');

        return {
            success: true,
            url: presignedUrl,
            publicUrl,
            error: null
        };
    } catch (error: any) {
        console.error('PRESIGNED URL ERROR:', error);
        return { success: false, error: error.message || 'Presigned URL үүсгэж чадсангүй', url: '', publicUrl: '' };
    }
}
