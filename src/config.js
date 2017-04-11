export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    BUCKET: 'notes-ak-upload'
  },
  apiGateway: {
    URL: 'https://ntplkky525.execute-api.us-west-2.amazonaws.com/prod'
  },
  cognito: {
    USER_POOL_ID: 'us-west-2_IJDrpYgOj',
    APP_CLIENT_ID: '6tevuhi2br7pb44f3jnes5ombn',
    REGION: 'us-west-2',
    IDENTITY_POOL_ID: 'us-west-2:9368d009-1177-4f19-9214-12c909b3f761',
  }
}
