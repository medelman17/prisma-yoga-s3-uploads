export const media = async (parent, args, ctx, info) => {
  try {
    return await ctx.db.query.medias(
      {
        args
      },
      info
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};