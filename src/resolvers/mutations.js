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

const deleteObjectFromS3 = ({Key}) => new Promise((res, rej) => {
  s3.deleteObject({
    Bucket,
    Key,
  }, (err, data) => {
    if (err) {
      rej(err)
    }
    res(data);
  })
});

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

export const deleteMedia = async (parent, args, ctx, info) => {
  const { where } = args;
  try {
    const result = await ctx.db.mutation.deleteMedia(
      {
        where,
      }, info
    );
    if (result && result.key) {
      deleteObjectFromS3({Key: result.key}).catch(err => console.log(err));
    }
    return result;
  } catch (err) {
    console.log(err);
    return error;
  }
}

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