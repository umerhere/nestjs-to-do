require('dotenv').config(); // Load environment variables from .env file
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Running migrations in development environment');

const ormConfigPath = path.resolve(__dirname, 'ormconfig.ts');

try {
    // Ensure migrations folder exists
    const migrationsFolder = path.resolve(__dirname, 'src', 'migrations');
    console.log("migrationsFolder ", migrationsFolder);
    if (!fs.existsSync(migrationsFolder)) {
        fs.mkdirSync(migrationsFolder, { recursive: true });
        console.log(`Created migrations folder at ${migrationsFolder}`);
    }

    console.log("migrationsFolder", migrationsFolder);
    // Generate a timestamp for the migration name
    const timestamp = new Date().getTime();
    const migrationName = `Migration_${timestamp}`;

    // Generate new migration using timestamp as name, specifying migrations directory
    // execSync(`ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate ${migrationName} -d ${ormConfigPath} -p ${migrationsFolder}/${migrationName}`, { stdio: 'inherit' });
    execSync(`typeorm-ts-node-esm migration:generate -d ${ormConfigPath} ${migrationsFolder}/${migrationName}`, { stdio: 'inherit' });


    // Run migrations
    execSync(`ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d ${ormConfigPath}`, { stdio: 'inherit' });

    console.log('Migrations ran successfully');
} catch (error) {
    console.error('Error running migrations:', error.message);
    // process.exit(1); // Exit with a non-zero status code
}