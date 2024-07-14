require('dotenv').config();
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Running migrations in development environment');

const ormConfigPath = path.resolve(__dirname, 'ormconfig.ts');

try {
    const migrationsFolder = path.resolve(__dirname, 'src', 'migrations');
    if (!fs.existsSync(migrationsFolder)) {
        fs.mkdirSync(migrationsFolder, { recursive: true });
    }
    const timestamp = new Date().getTime();
    const migrationName = `Migration_${timestamp}`;

    execSync(`typeorm-ts-node-esm migration:generate -d ${ormConfigPath} ${migrationsFolder}/${migrationName}`, { stdio: 'inherit' });
    execSync(`ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d ${ormConfigPath}`, { stdio: 'inherit' });

    console.log('Migrations ran successfully');
} catch (error) {
    console.error('Error running migrations:', error.message);
    // process.exit(1); // Exit with a non-zero status code
}