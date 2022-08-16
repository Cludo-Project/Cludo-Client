"use strict";
const EventEmitter = require('events');
const BaseDatabaseWithSearch = require("./BaseDatabaseWithSearch");

/**
 * Database driver for JSON files with a single JSON file.
 */
class JSONDatabase extends BaseDatabaseWithSearch {
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
        // Get the images URL
        // TODO: Move this to the config
        this.images_url = this.api_url + "images/";
        // If the images URL does not end with a slash and it is not empty, add a slash
        if (this.images_url.length > 0 && this.images_url[this.images_url.length - 1] != '/') {
            this.images_url += '/';
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
}

module.exports = JSONDatabase;
// export { JSONDatabase };
// export default JSONDatabase;
