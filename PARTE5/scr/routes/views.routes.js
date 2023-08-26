import { promises as fs } from 'fs';
import path from 'path';
import { Router } from 'express';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const viewRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)




  export default viewRouter