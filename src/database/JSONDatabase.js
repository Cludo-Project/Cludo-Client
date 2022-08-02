"use strict";
const EventEmitter = require('events');
const BaseDatabase = require("./BaseDatabase");

/**
 * Database driver for JSON files with a single JSON file.
 */
class JSONDatabase extends BaseDatabase {
    /**
     * Constructor.
     * @param {Object} fuse - The Fuse.js object (not instantiated yet).
     */
    constructor(fuse) {
        super();
        this.config = {}
        this.database = {}
        this.database_loaded = false;
        this.database_loading = false;
        this.fuse = fuse;
        // Bus is used internally to notify listeners when the database is loaded
        this.bus = new EventEmitter();
        this.api_url = process.env.VUE_APP_BASE_CLUDO_API_URL;
        // If the API URL does not end with a slash and it is not empty, add a slash
        if (this.api_url.length > 0 && this.api_url[this.api_url.length - 1] != '/') {
            this.api_url += '/';
        }
    }
    /**
     * Make a request to the API using XHR.
     * @param {string} url - The URL of the API to request.
     * @returns {Promise} - A promise that resolves with the response.
     * @private
     */
    async _getJSON(url) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", this.api_url + url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.statusText);
                    }
                }
            };
            xhr.send();
        });
    }
    /**
     * Load the configuration.
     * @returns {Promise} - A promise that resolves when the config is loaded.
     */
    async loadConfig() {
        return new Promise((resolve, reject) => {
            // If the config is already loaded, resolve immediately
            if (this.config) {
                resolve();
            }
            this._getJSON("server_config.json").then((config) => {
                this.config = config;
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    }
    /**
     * Loads the database.
     * @returns {Promise} - A promise that resolves when the database is loaded.
     */
    async load() {
        return new Promise((resolve, reject) => {
            this.database_loading = true;
            this.loadConfig().then(() => {
                this._getJSON("database.json").then((database) => {
                    this.database = database;
                    this.database_loaded = true;
                    this.database_loading = false;
                    this.bus.emit('database_loaded');
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }
    /**
     * Ensures that the database is loaded, and if not, loads it.
     * @returns {Promise} - A promise that resolves when the database is loaded.
     */
    async ensureLoaded() {
        if (!this.database_loaded && !this.database_loading) {
            await this.load();
        }
        // If the database is loading, wait for it to finish
        if (this.database_loading) {
            await new Promise((resolve) => this.bus.once('database_loaded', resolve));
        }
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
        throw new Error("Not implemented");
    }
    /**
     * Gets the database config.
     * @returns {Object} - The database config.
     */
    async getConfig() {
        await this.loadConfig();
        return this.config;
    }
    /**
     * Gets the database.
     * @returns {Object} - The database.
     */
    async getDatabase() {
        await this.ensureLoaded();
        // Assert that the database is loaded and not loading
        if (!this.database_loaded) {
            throw new Error("Database is not loaded after loading");
        }
        if (this.database_loading) {
            throw new Error("Database is loading after loading");
        }
        return this.database;
    }
    /**
     * Searches the database with the given query.
     * @param {Object} query - The query to search with.
     * @returns {Object} - The search results.
     */
    async search(query) {
        // Get the database
        let database = await this.getDatabase();
        // Convert the database to an array of objects (for Fuse.js)
        // HACK: The database is a JSON object, but Fuse.js expects an array of objects_
        let database_array = [];
        for (let key in database) {
            database_array.push(database[key]);
        }
        database = database_array;
        // Search options
        // TODO: Make search options configurable
        const Fuse_options = {
            includeScore: true,
            // Search in all fields
            keys: ['id', 'name', 'vendor', 'type', 'players_min', 'players_max', 'age', 'description', 'image_url', 'game_type'],
            // Set the threshold to 0.4 (40%)
            threshold: 0.4,
            // Ignore the location of the search
            ignoreLocation: true,
        }
        // Create the Fuse.js object
        const fuse = new this.fuse(database, Fuse_options);
        // Search the database
        const results = fuse.search(query);
        // Return the results
        return results;
    }
}

module.exports = JSONDatabase;
// export { JSONDatabase };
// export default JSONDatabase;