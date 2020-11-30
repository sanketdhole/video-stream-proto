const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(":memory:");

db_creation_query = `
CREATE TABLE IF NOT EXISTS posts (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    media_url text NOT NULL,
    created_at text
)
`;

db.exec(db_creation_query);

module.exports = db;
