const storageDir = `${__dirname}/../storage`

module.exports = {
  app: {
    port: 3000,
  },
  storageDir,
  auth: {
    jwtSecret: 'alan',
    sessionExpiresSeconds: 60 * 60 * 24,
  },
}
