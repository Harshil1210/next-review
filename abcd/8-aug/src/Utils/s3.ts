import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { ClientS3 } from "@/Config/s3Client";

const client = new S3Client(ClientS3);

export const UploadFilesToBucket = async (body: Buffer, key: string) => {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Body: body,
    Key: key,
    ContentType: "image/png",
  });
  await client.send(command);
};
