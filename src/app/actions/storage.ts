'use server';

import { r2 } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadToR2(formData: FormData) {
    console.log('--- uploadToR2 attempt started ---');

    try {
        if (!r2) {
            console.error('CRITICAL: R2 Client is null');
            return { success: false, error: 'Storage client not initialized', url: '', name: '' };
        }

        const file = formData.get('file') as File;
        const folder = formData.get('folder') as string || 'misc';

        if (!file || !(file instanceof File)) {
            console.error('File not received or invalid format');
            return { success: false, error: 'Файл олдсонгүй эсвэл буруу форматтай байна', url: '', name: '' };
        }

        console.log(`Processing file: ${file.name} (${file.size} bytes) in folder: ${folder}`);

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileExt = file.name.split('.').pop() || 'bin';
        const fileName = `${folder}/${crypto.randomUUID()}.${fileExt}`;

        const bucketName = process.env.R2_BUCKET_NAME?.trim();
        console.log(`S3 PutObjectCommand for: ${fileName}, Bucket: ${bucketName}`);

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: buffer,
            ContentType: file.type || 'application/octet-stream',
        });

        await r2.send(command);
        console.log('R2 Send successful');

        const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim()}/${fileName}`;
        return { success: true, url: publicUrl, name: fileName, error: null };
    } catch (error: any) {
        console.error('SERVER ACTION ERROR:', error);
        return { success: false, error: error.message || 'Файл хуулж чадсангүй (Сервер талын алдаа)', url: '', name: '' };
    }
}
