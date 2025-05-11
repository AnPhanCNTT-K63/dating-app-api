import 'dotenv/config';

export const appSettings = {
  port: Number(process.env.PORT) || 3000,
  development: process.env.DEVELOPMENT,
  socketPort: Number(process.env.SOCKET_PORT),
  mainLanguage: process.env.MAIN_LANGUAGE || 'en',
  maxFileSize: {
    admin: Number(process.env.MAX_FILE_SIZE_UPLOAD_ADMIN),
    front: Number(process.env.MAX_FILE_SIZE_UPLOAD_USER),
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expireIn: process.env.JWT_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpireIn: process.env.JWT_REFRESH_EXPIRES_IN,
    issuer: process.env.JWT_ISSUER,
  },
  openIdConnect: {
    sessionSecret: process.env.SESSION_SECRET,
  },
  mongoose: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/dating-app',
  },
  s3: {
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.AWS_BUCKET_NAME,
    folder: process.env.AWS_FOLDER_NAME_DEFAULT || 'marketplace',
    region: process.env.AWS_REGION,
    distribution: process.env.AWS_CLOUD_FRONT,
  },
  twilio: {
    accountSID: process.env.TWiLIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHOME_NUMBER,
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    key: process.env.FIREBASE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  },
  vnpay: {
    tmnCode: process.env.VNP_TMNCODE,
    hashSecret: process.env.VNP_HASH_SECRET,
    url: process.env.VNP_URL,
    returnUrl: process.env.VNP_RETURN_URL,
  },
  redis: {
    heathCheck: process.env.REDIS_HOST ? true : false,
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  },
};
