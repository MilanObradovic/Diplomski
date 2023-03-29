import firebaseAdmin from "firebase-admin";

const service = {
  "type": "service_account",
  "project_id": "weatherapp-1a469",
  "private_key_id": "c6391977bc931594468dfdaa62e02655908f3155",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQqFX98S67F0M8\nSGERp/WwX9/H8TF898jTzh46SSom44SJdxN1O/d2w45edWLF9eZ6enAcHMvE41dL\nxsrnIkbNvhEjgISrkshBQYfWuy3Hc2Ez7oUGhZ1pWVa0ynZK6fi+YYo06RjglJ6A\nSsjUykdmPDyOsg9FkpgFGDH3e+Z0IHrrdbbHAcBMg8+MwTvfyZUo0cbnd2n0QaB+\nJFLJHELct7lxQHu8H4v75B3OME8XX0txFq8xudmsIZlAzR08UIQBU9f1ER2l22Lt\nfBmbSwDzLuKrHWS7eAIPi349oDTONNGA63o7Y36TG/7hsGpYPj0jHzXF1tDEm5mc\nRUJ4Z34fAgMBAAECggEABU/r1InB41B9zTiYhA8PIbznIRuCY4iZa88JFPnM4W2U\nb72A2NC8haEH7F63s4uFoSOh3A1doLca/1phyw2j2NQYcptwhT+46nRlJXHhgfzt\nghl1+IsJTWfRXcvzxAd95jbsgllW4UzXVjPRNh2qQK+S6R0eZ2qKhUKu7vqQDO/E\n/F9xUOolDeobLMW4dgA6TjiHBOrsg/5IUFxI6EyQ9AlzzNx3i6wMz+m5blSHg/2a\nSbfPBh1uQwMTwX33G9HXjuD4ZVLc3lp3hMrviPiqh2+Cvu575J47G3aQMRT0Xt1r\nxNTXphkD5x3EZn7Xo41OusveKxxj1jgca+DSh+xTyQKBgQDqfFOqV3kPKx3SbrMo\nqlkytwL6pHGlwdZTxYeP5Vzibff0SigTd8k2Ifzg1d7rMHuDX5xbCJwZt6jg0oNY\nqUEJ0y9Go4qSg0+jkctJF5XXH6WqNXtxTx8OQVsltiqCz1GiuFCWySPTKTrr2JXr\n58v4yI0TrDENdI4i448cfhFEGQKBgQDjzVnKtlk1r5rBX+Sc4Rl+1lS03zln/1uG\nnpcyWDS2feBmNRfidB3MYeoZv8jcMF18h+lz2xp4T7YNRIVcRjLwSdUzmoTnKReK\n/4/uEHMwGfRw7lkFb4zuVC9TIwQ9fgmFIG1mLcsP0GwA95M5QgqoYACvkSlWlwXF\nR6wJK/5a9wKBgQDIumFMwtDJIVnIGCeaOilddrlAIqF/Ce4VjFS949SdqRHHt+uS\nrso6YuH8/lhz8O7qyWAptbcbdNNGki8KKOmaJYSk7b7kKTB1j4r8KQqGO3svt9TS\nbK7jHyONpuHBVQRHTYz/Z3QZgYQE/UVpyuYbNGNAYfkj0ZETYMXT2D+jkQKBgQCf\n8ewMz7GdZznScoDywX4EN3rsMBt/cKUTxUBFwfbo90LaoIavonXVrh4PjD/8khzh\ntg/tH7bbKKSbdjPo0QUs/7opbGHKaGi2WK/3KCeoa2Dc9g0dKvCZ2hQMXHa6skb+\n6QDHEHoWFXHvz+TX/A29oQJ6QwLyYEFV/ffFzNTfiwKBgCTNotfGtoAwd/Xny3lx\n61eGtlAKY36E4DjtWuJYDbSjFggZtdVZW5QHWhXQ/VnWYmv+bJnkNs1CLVEBEAlZ\n55pusXMtNqGimkygk02YFlNvAWz5MYHJ9e7CA4F1WC3zpM3H3e5Kei60CPALqEW8\naR6OZ5EVQb/hj8JpYiZYFEw4\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xm0vs@weatherapp-1a469.iam.gserviceaccount.com",
  "client_id": "101508092895558362218",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xm0vs%40weatherapp-1a469.iam.gserviceaccount.com"
}
export const initializeFirebase = () => {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(service)
  });
}

const notificationBuilder = (data, location) => {
  return {notification: {
      title: data?.headline,
      body: `${location}, ${data?.event}`
    }}
};

export const sendNotification  =({fcmTokens, data, location}) => {
  data.alert.forEach((alert)=> {
    firebaseAdmin.messaging().sendToDevice(fcmTokens, notificationBuilder(alert, location)).catch((e) => {
      console.log({e})
    })
  })
}
