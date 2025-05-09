import serverless from 'serverless-http';
// Adjust the import path based on your actual compiled output structure.
// Assuming your 'index.ts' compiles to 'dist/index.js' and exports the Express app as default
import app from '../../dist/index.js';

export const handler = serverless(app);
