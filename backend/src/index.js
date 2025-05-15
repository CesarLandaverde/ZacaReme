import './database.js'; // <-- Asegúrate de tener esta línea
import app from './app.js';
import { config } from './config.js';

async function main() {
    const port = config.server.port;
    app.listen(port);
    console.log(`Server is running on port ${port}`);
}
main();