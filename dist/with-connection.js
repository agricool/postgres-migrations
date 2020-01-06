"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function withConnection(log, f) {
    return async (client) => {
        try {
            try {
                await client.connect();
                log("Connected to database");
            }
            catch (e) {
                log(`Error connecting to database: ${e.message}`);
                throw e;
            }
            const result = await f(client);
            return result;
        }
        finally {
            // always try to close the connection
            try {
                await client.end();
            }
            catch (e) {
                log(`Error closing the connection: ${e.message}`);
            }
        }
    };
}
exports.withConnection = withConnection;
