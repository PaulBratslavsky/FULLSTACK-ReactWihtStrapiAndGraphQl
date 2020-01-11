import Strapi from 'strapi-sdk-javascript/build/main';

export const apiUrl = process.env.APU_URL || 'http://localhost:1337';
export const strapi = new Strapi(apiUrl);