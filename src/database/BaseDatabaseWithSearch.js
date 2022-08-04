const BaseDatabase = require('./BaseDatabase');

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
 * Base class for all database drivers with JS search
 */
class BaseDatabaseWithSearch extends BaseDatabase {
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

module.exports = BaseDatabaseWithSearch;
