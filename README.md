# Scalable Prisma / S3 File Upload Example 

This example demonstrates how you might implement a GraphQL 
server with _passive_ file handling based on [AWS S3](https://aws.amazon.com/s3/), 
[Prisma](https://github.com/prismagraphql/prisma), & [GraphQL-Yoga](https://github.com/prismagraphql/graphql-yoga). 

Rather than actively handling uploads from the client (and then to S3), this approach generates AWS 
[Pre-Signed URLs](https://docs.aws.amazon.com/AmazonS3/latest/dev/PresignedUrlUploadObject.html) 
in response to `create[File]` mutations. These data are then returned to the client for client-side posting. 

The primary benefit of this approach is that your server never needs to load the uploaded file (or any chunks thereof) 
into 
memory, reducing the chance that memory usage will become a bottleneck at scale.  