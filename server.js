import { WebSocketServer, WebSocket } from "ws";
import Commands from "./Commands.js";
import ClientsManager from "./ClientsManager.js";
import ServerManager from "./ServerManager.js";

import { fileURLToPath } from "url"; // Import the utility function
import { dirname, join } from "path"; // Import utility functions
import fs from "fs";
import https from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// ---------------------------------------------

const sslDir = '/etc/ssl/continuum';
const keyPath = join(sslDir, 'gscop-continuum.g-scop.grenoble-inp.fr.key');
const certPath = join(sslDir, 'Cert_continuum_g-scop_grenoble-inp_fr.pem');

const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
};

const port = 443;

const httpsServer = https.createServer(options);
httpsServer.listen(port, () => {
    console.log(`HTTPS server running on port ${port}`);
});

const serverManager = new ServerManager(httpsServer);

const gltfPath = join(__dirname, 'files/glTF/ABeautifulGame.gltf');
const gltf = await fs.promises.readFile(gltfPath, 'utf-8');
await serverManager.loadFile(gltf);
