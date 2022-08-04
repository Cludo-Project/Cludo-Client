// If false, non implemented errors will be raised as warnings instead of exceptions.
const non_implemented_error = true;

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
        this.database = {};
    }
    /**
     * Raise a non-implemented error. (used internally)
     * @param {string} method - The method that is not implemented.
     */
    _raiseNotImplementedError(name) {
        if (non_implemented_error) {
            throw new Error(`${name} is not implemented`);
        } else {
            // Raise a warning that the function is not implemented
            console.warn(`${name} is not implemented`);
        }
    }
    /**
     * Load the configuration.
     */
    async loadConfig() {
        this._raiseNotImplementedError("loadConfig");
    }
    /**
     * Loads the database.
     */
    async load() {
        this.loadConfig();
        this._raiseNotImplementedError("load");
    }
    /**
     * Saves the database.
     * @returns {Promise} - A promise that resolves when the save is complete.
     * @throws {Error} - If the database is read-only.
     * @throws {Error} - If the database is not loaded.
     */
    async save() {
        if (this.config.readOnly) {
            throw new Error("Database is read-only");
        }
        this._raiseNotImplementedError("save");
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
        return this.database;
    }
    /**
     * Searches the database with the given query.
     * @param {Object} query - The query to search with.
     * @returns {Array} - The search results.
     */
    async search(query) {
        console.log("Searching with query:", query);
        this._raiseNotImplementedError("search");
        return [];
    }
}

module.exports = BaseDatabase;
// export { BaseDatabase };
// export default BaseDatabase;
