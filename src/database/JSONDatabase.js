"use strict";
const EventEmitter = require('events');
const BaseDatabase = require("./BaseDatabase");

// TODO: Load database on startup.
// TODO: Move search to an overload of BaseDatabase and base JSONDatabase on it.
// Search options
// TODO: Make search options configurable
const Fuse_options = {
    includeScore: true,
    // Search in all fields
    keys: ['id', 'name', 'vendor', 'type', 'players_min', 'players_max', 'age', 'description', 'image_url', 'game_type'],
    // Set the threshold to 0.4 (40%)
    threshold: 0.4,
    // Ignore the location of the search
    ignoreLocation: false,
}

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
        this.fuse_index_creating = false;
        this.fuse_index_created = false;
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
                    // Start creating the index, but don't wait for it to finish
                    this._createIndex();
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
     * Create fuse.js index for the database and cache a fuse.js instance.
     * @returns {Promise} - A promise that resolves when the index is created.
     * @private
     */
    async _createIndex() {
        this.fuse_index_creating = true;
        // Convert the database to be compatible with fuse.js
        let database = await this.getDatabase();
        let database_array = [];
        for (let key in database) {
            database_array.push(database[key]);
        }
        // Save the database array as this.fuse_database
        this.fuse_database = database_array;
        // Create the index using this.fuse.createIndex
        this.fuse_index = this.fuse.createIndex(Fuse_options.keys, this.fuse_database);
        // Cache the fuse.js instance
        this.fuse_instance = new this.fuse(this.fuse_database, Fuse_options, this.fuse_index);
        // The index is now created
        this.fuse_index_creating = false;
        this.fuse_index_created = true;
        // Signal that the index is created
        this.bus.emit('index_created');
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
     * Ensure that the fuse index is created.
     * @returns {Promise} - A promise that resolves when the index is created.
     * @private
     */
    async _ensureIndex() {
        if (!this.fuse_index_created && !this.fuse_index_creating) {
            await this._createIndex();
        }
        // If the index is creating, wait for it to finish
        if (this.fuse_index_creating) {
            await new Promise((resolve) => this.bus.once('index_created', resolve));
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
        // Ensure that the index is created
        await this._ensureIndex();
        // Search the database
        const results = this.fuse_instance.search(query);
        // Return the results
        return results;
    }
}

module.exports = JSONDatabase;
// export { JSONDatabase };
// export default JSONDatabase;v