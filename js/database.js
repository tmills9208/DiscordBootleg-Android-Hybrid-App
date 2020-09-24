/** File: database.js
 *  Final Project
 *
 *  Revision History:
 *      Tyler Mills, Feb 17, 2020: Created
 */

var db;

function errorHandler(tx, error) {
    console.error("SQL error: " + tx + " ( " + error.code + " ) -- " + error.message);
}

var DB = {
    createDatabase: function () {
        var shortName = "ChatDB";
        var version = "1.0";
        var displayName = "DB for Tyler's Custom Chat";
        var dbSize = 2 * 1024 * 1024;

        function dbCreateSuccess() {
            console.info("Success: Database created successfully");
        }

        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },
    createTables: function () {
        function txFunction(tx) {
            var options = [];

            function successCallback() {
                console.info("Success: Tables created successfully");
            }

            var sql = "DROP TABLE IF EXISTS user;";
            tx.executeSql(sql, options, successCallback, errorHandler);

            sql = "DROP TABLE IF EXISTS message;";
            tx.executeSql(sql, options, successCallback, errorHandler);

            sql = "CREATE TABLE IF NOT EXISTS user( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "username VARCHAR(32) NOT NULL," +
                "password VARCHAR(32) NOT NULL," +
                "email VARCHAR(32)," +
                "score INTEGER," +
                "imagePath VARCHAR(50)," +
                "joinDate DATETIME DEFAULT CURRENT_TIMESTAMP);";
            tx.executeSql(sql, options, successCallback, errorHandler);

            sql = "CREATE TABLE IF NOT EXISTS message( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "userid INTEGER NOT NULL," +
                "text TEXT NOT NULL," +
                "dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP," +
                "dateEdited DATETIME," +
                "FOREIGN KEY (userid) REFERENCES user(id));";
            tx.executeSql(sql, options, successCallback, errorHandler);

            sql = "INSERT INTO user (username, password)" +
                "VALUES ('anonymous', '1234567890');";
            tx.executeSql(sql, options, successCallback, errorHandler);

            sql = "INSERT INTO message (userid, text) VALUES (1, 'Hello world!');";
            tx.executeSql(sql, options, successCallback, errorHandler);

            sql = "INSERT INTO message (userid, text) VALUES (1, 'Welcome to the chat app!');";
            tx.executeSql(sql, options, successCallback, errorHandler);

            sql = "INSERT INTO message (userid, text) VALUES (1, 'You are currently anonymous, please click the menu button and select login or register!');";
            tx.executeSql(sql, options, successCallback, errorHandler);

            sql = "INSERT INTO message (userid, text) VALUES (1, 'You can also precede your message with rainbow: in order to make your text look like a');";
            tx.executeSql(sql, options, successCallback, errorHandler);

            sql = "INSERT INTO message (userid, text) VALUES (1, 'rainbow: RAINBOW~');";
            tx.executeSql(sql, options, successCallback, errorHandler);

            sql = "SELECT * FROM message;";
            tx.executeSql(sql, options, successCallback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropTables: function () {
        function txFunction(tx) {
            var options = [];

            function successCallback() {
                console.info("Success: Table dropped successfully");
            }

            var sql = "DROP TABLE IF EXISTS message;";
            tx.executeSql(sql, options, successCallback, errorHandler);

            sql = "DROP TABLE IF EXISTS user;";
            tx.executeSql(sql, options, successCallback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);

    }
};