/** File: global.js
 *  Final Project
 *
 *  Revision History:
 *      Tyler Mills, April 19, 2020: Created
 */

function init(){
    localStorage.clear();

    // ---------- Message Form Handlers --------------
    $("#submitAddMessage").on("click", function (e) {
        e.preventDefault();
        addMessage($("#txtAddMessage").val());
    });

    $(".logoutButton").on("click", logout);

    $("#AddUserSubmit").on("click", register);

    $("#LoginSubmit").on("click", login);

    $("#EditUserPage").on("pageshow", function(){
        var userId = localStorage.getItem("userId");
        if (userId == null){
            $(location).prop('href', '#ChatPage');
            return;
        }

        localStorage.setItem("readingUserId", userId);
        selectUser();
        var user = localStorage.getItem("readingUser");

        $("#EditUserUsername").val(user["username"]);
        $("#EditUserEmail").val(user["email"]);
        $("#EditUserPassword").val(user["password"]);
    });

    $("#EditUserDelete").on("click", deleteUser);

    $("#ChatPage").on("pageshow", function(){
        refreshChat();
        selectAllUsers();
    });

    $(document).on("pageshow", function(){
        showLoginButton();
        if (localStorage.getItem("userId") != null){
            localStorage.setItem("readingUserId", localStorage.getItem("userId"));
            selectUser();
            var user = JSON.parse(localStorage.getItem("readingUser"));
            $(".btnEditUser").text(user["username"]);
        }
        else{
            $(".btnEditUser").text("");
        }
    });

    $(location).prop('href', '#ChatPage');
    console.info("DOM is ready");
}

function initDB(){
    console.info("Creating database...");
    try {
        DB.createDatabase();
        if (db) {
            console.info("Creating tables...");
            DB.createTables();
        }
        else{
            console.error("Error: cannot create tables: Database not available");
        }

    } catch (e) {
        console.error("Error: (Fatal) error in initDB(). Can not proceed\n" + e.message);
    }
}

$(document).ready(function(){
    initDB();
    init();
    refreshChat();
});