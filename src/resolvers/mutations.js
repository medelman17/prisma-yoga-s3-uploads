import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "YOUR KEY HERE",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "YOUR KEY HERE"
});

const Bucket = process.env.BUCKET || "YOUR BUCKET HERE";

const getSignedLinkFromS3 = async ({ filename, owner }) => {
  const Key = `uploads/${owner}/${filename}`;
  const uploadUri = await s3.getSignedUrl("putObject", { Key, Bucket });
  return {
    uploadUri,
    bucket: Bucket,
    key: Key
  };
};

export const createMedia = async (parent, args, ctx, info) => {
  const { data } = args;
  const mediaDataWithS3Data = await getSignedLinkFromS3(data);
  try {
    return await ctx.db.mutation.createMedia(
      {
        data: {
          ...data,
          ...mediaDataWithS3Data,
          owner: { connect: { id: data.owner } }
        }
      },
      info
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createUser = async (parent, args, ctx, info) => {
  const { data } = args;
  try {
    return await ctx.db.mutation.createUser(
      {
        data
      },
      info
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};