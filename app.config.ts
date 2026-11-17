// import * as dotenvSafe from 'dotenv-safe';
// // Setup env variables from .env file in development mode
// if (process.env.NODE_ENV == "development") {
//     dotenvSafe.config();
// } else {
//     // tslint:disable-next-line:no-console
//     console.warn(`.env wasn't read! This can be a source for problems.`);
// }
const tinaSettings = {
    clientId: process.env.TINA_CLIENT_ID,
    token: process.env.TINA_TOKEN
};

const appSettings = {
    siteUrl: process.env.SITE_URL || 'http://localhost:4321',
    isProductionBuild: process.env.BUILD_MODE === 'production'
}

export { tinaSettings, appSettings };