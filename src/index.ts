import 'reflect-metadata';
import { config } from 'dotenv';
config();
import server from './Server';

const port = process.env.PORT || 8080

server.express.listen(port, () => {
  console.log('\n----------------------');
  console.log(`URL:             http://localhost:${port}`);
  console.log(`ENVIRONMENT:     ${process.env.NODE_ENV}`);
  console.log(`SERVER VERSION:  ${process.env.npm_package_version}`);
  console.log(`Allowed origins: ${server.origins.join(' | ')}`);
  console.log('----------------------\n');
});
