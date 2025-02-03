import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.resolve(__dirname, '../../../.env') });

export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
export const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;