/**
 * Base class for all database drivers.
 */
class BaseDatabase {
    /**
     * Constructor.
     */
    constructor() {
        this.config = {
            "readOnly": true,
        };
    }
    /**
     * Load the configuration.
     */
    async loadConfig() {
        throw new Error("Not implemented");
    }
    /**
     * Loads the database.
     */
    async load() {
        this.loadConfig();
        throw new Error("Not implemented");
    }
    /**
     * Saves the database.
     * @returns {Promise} - A promise that resolves when the save is complete.
     * @throws {Error} - If the database is read-only.
     * @throws {Error} - If the database is not loaded.
     */
    async save() {
        throw new Error("Not implemented");
    }
    /**
     * Gets the database config.
     * @returns {Object} - The database config.
     */
    getConfig() {
        return this.config;
    }
    /**
     * Gets the database.
     * @returns {Object} - The database.
     */
    getDatabase() {
        throw new Error("Not implemented");
    }
}

module.exports = BaseDatabase;
// export { BaseDatabase };
// export default BaseDatabase;