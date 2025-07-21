import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.resolve(__dirname, '../../../.env') });

export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
