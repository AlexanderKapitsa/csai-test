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

const pictureSettings = {
    densities: process.env.PICTURE_DENSITIES ? process.env.PICTURE_DENSITIES.split(',').map(Number) : [1, 1.5, 2, 3],
    formats: process.env.PICTURE_FORMATS ? process.env.PICTURE_FORMATS.split(',') : ['avif', 'webp']
};

export { tinaSettings, appSettings, pictureSettings };