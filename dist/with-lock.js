"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function withAdvisoryLock(log, f) {
    return async (client) => {
        try {
            try {
                log("Acquiring advisory lock...");
                await client.query("SELECT pg_advisory_lock(-8525285245963000605);");
                log("... aquired advisory lock");
            }
            catch (e) {
                log(`Error acquiring advisory lock: ${e.message}`);
                throw e;
            }
            const result = await f(client);
            return result;
        }
        finally {
            try {
                log("Releasing advisory lock...");
                await client.query("SELECT pg_advisory_unlock(-8525285245963000605);");
                log("... released advisory lock");
            }
            catch (e) {
                log(`Error releasing advisory lock: ${e.message}`);
            }
        }
    };
}
exports.withAdvisoryLock = withAdvisoryLock;
