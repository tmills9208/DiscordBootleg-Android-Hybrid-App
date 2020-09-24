/** File: feedbackDAL.js
 *  Assignment 3
 *
 *  Revision History:
 *      Tyler Mills, Feb 17, 2020: Created
 */

var User = {
    insert: function (option, callback) {
        function txFunction(tx){
            var sql = "INSERT INTO user(username, password, email," +
                "score, imagePath)" +
                "VALUES(?,?,?,?,?);";

            tx.executeSql(sql, option, callback, errorHandler );
        }
        function successTransaction(){
            console.info("Success: transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (option, callback) {
        function txFunction(tx){
            var sql = "SELECT * FROM user;";

            tx.executeSql(sql, option, callback, errorHandler );
        }
        function successTransaction(){
            console.info("Success: transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (option, callback){
        function txFunction(tx){
            var sql = "SELECT * FROM user WHERE id = ?;";

            tx.executeSql(sql, option, callback, errorHandler);
        }

        function successTransaction(){
            console.info("Success: transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (option, callback) {
        function txFunction(tx){
            var sql = "UPDATE user " +
                "SET username=?, password=?, email=?" +
                "WHERE id=?;";

            tx.executeSql(sql, option, callback, errorHandler );
        }
        function successTransaction(){
            console.info("Success: transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (option, callback) {
        function txFunction(tx){
            var sql = "DELETE FROM user WHERE id = ?;";

            tx.executeSql(sql, option, callback, errorHandler );
        }
        function successTransaction(){
            console.info("Success: transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectByName: function(option, callback){
        function txFunction(tx){
            var sql = "SELECT * FROM user WHERE username = ?;";

            tx.executeSql(sql, option, callback, errorHandler );
        }
        function successTransaction(){
            console.info("Success: transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Message = {
    insert: function (option, callback) {
        function txFunction(tx){
            var sql = "INSERT INTO message(userid, text)" +
                "VALUES(?,?);";

            tx.executeSql(sql, option, callback, errorHandler );
        }
        function successTransaction(){
            console.info("Success: transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (option, callback) {
        function txFunction(tx){
            var sql = "SELECT * FROM message;";

            tx.executeSql(sql, option, callback, errorHandler );
        }
        function successTransaction(){
            console.info("Success: transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (option, callback) {
        function txFunction(tx){
            var sql = "SELECT * FROM message WHERE id=?;";

            tx.executeSql(sql, option, callback, errorHandler );
        }
        function successTransaction(){
            console.info("Success: transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (option, callback) {
        function txFunction(tx){
            var sql = "UPDATE message " +
                "SET text = ?, dateEdited = ?" +
                "WHERE id=?;";

            tx.executeSql(sql, option, callback, errorHandler );
        }
        function successTransaction(){
            console.info("Success: transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (option, callback) {
        function txFunction(tx){
            var sql = "DELETE FROM message WHERE id=?;";

            tx.executeSql(sql, option, callback, errorHandler );
        }
        function successTransaction(){
            console.info("Success: transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};