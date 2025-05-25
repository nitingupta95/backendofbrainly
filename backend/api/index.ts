// api/index.ts

import app from "../src/index";
import { createServer } from 'http';

const server = createServer(app);

export default server;
