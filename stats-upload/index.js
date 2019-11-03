require('dotenv').config();
const Jobs = require('./Jobs');
const Mcmmo = require('./Mcmmo');

const uploadApiUrl = process.env.UPLOAD_API_URL;

const jobs = new Jobs(uploadApiUrl);
jobs.do();

const mcmmo = new Mcmmo(uploadApiUrl);
mcmmo.do();
