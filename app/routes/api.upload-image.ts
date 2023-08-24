import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { json, type LoaderArgs } from "@remix-run/node";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function loader({ request, params }: LoaderArgs) {
    const Fields = {
        acl: "public-read",
    };

    const Bucket = process.env.AWS_BUCKET_NAME!;
    const Key = params.filename as string;

    const post = await createPresignedPost(s3, {
        Bucket,
        Key,
        Fields,
        Conditions: [["content-length-range", 0, 5048576]],
        Expires: 600,
    });

    return json(post);
}