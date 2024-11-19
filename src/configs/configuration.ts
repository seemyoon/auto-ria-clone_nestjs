import { Config } from './config.type';

export default (): Config => ({
  app: {
    host: process.env.APP_HOST || 'localhost',
    port: parseInt(process.env.APP_PORT, 10) || 3100,
  },
});
