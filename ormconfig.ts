import { DataSource, DataSourceOptions } from 'typeorm';

const databaseName = () => {
  let dbName: string | undefined = '';
  const env = process.env.NODE_ENV;
  switch (env) {
    case 'production':
      dbName = process.env.DATABASE_NAME_PROD;
      break;
    case 'development':
      dbName = process.env.DATABASE_NAME;
      break;
    case 'test':
      dbName = process.env.DATABASE_NAME_TEST;
      break;
    case 'staging':
      dbName = process.env.DATABASE_NAME_STAG;
      break;
  }
  return dbName;
};

console.log("DATABASE_PASSWORD", process.env.DATABASE_PASSWORD);
const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: databaseName(),
  synchronize: false,
  dropSchema: false,
  logging: true,
  entities: [`${__dirname}/src/**/entities/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/src/migrations/**/*{.ts,.js}`],
  migrationsRun: false,
};

export const AppDataSource = new DataSource(config);
export default config;
