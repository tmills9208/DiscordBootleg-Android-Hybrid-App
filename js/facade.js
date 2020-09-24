/** File: facade.js
 *  Final Project
 *
 *  Revision History:
 *      Tyler Mills, April 19, 2020: Created
 */

function showLoginButton(){
    var userid = localStorage.getItem("userId");
    if (userid == null){
        $(".li-logout").css("display", "none");
        $(".li-login").css("display", "block");
        $(".li-register").css("display", "block");
    }
    else{
        $(".li-logout").css("display", "block");
        $(".li-login").css("display", "none");
        $(".li-register").css("display", "none");
    }
}

function register(){
    var option = [
        $("#AddUserUsername").val(),
        $("#AddUserPassword").val(),
        $("#AddUserEmail").val(),
        "",
        ""
    ];

    function callback(tx, result){
        var optiontwo = [$("#AddUserUsername").val()];

        function callbacktwo(tx, result){
            var resultingUser = result.rows.item(0);

            localStorage.setItem("userId", resultingUser["id"]);
            $(location).prop('href', '#ChatPage');
        }
        User.selectByName(optiontwo, callbacktwo);
    }
    User.insert(option, callback);
}

function login(){
    var option = [$("#LoginUsername").val()];
    function callback(tx, result){
        var resultingUser = result.rows.item(0);

        if ($("#LoginPassword").val() == resultingUser["password"]){
            console.info("Logged in successfully as: " + resultingUser["username"]);
            localStorage.setItem("userId", resultingUser["id"]);
            $(location).prop('href', '#ChatPage');
            refreshChat();
        }
        else{
            alert("Invalid username and/or password");
        }
    }
    User.selectByName(option, callback);
}

function logout(){
    localStorage.clear();
    localStorage.setItem("userId", null);
    console.info("Logged out");
    $(location).prop('href', '#AboutPage');
    $(location).prop('href', '#ChatPage');
}

function isRainbow(messageText){
    var regex = /^rainbow:/i;
    if (regex.test(messageText)){
        return true;
    }
    return false;
}

function deleteUser(){
    var bool = confirm("Are you sure you want to delete your account?");
    var option = [localStorage.getItem("userId")];

    if (!bool){
        return;
    }

    function callback(tx, result){
        alert("Account deleted successfully!");
        $(location).prop('href', '#ChatPage');
    }

    User.delete(option, callback);
}

function selectAllUsers(){
    var option = [];
    var playerList = $("#playerList");
    playerList.empty();

    function callback(tx, results) {
        console.info("Users received!");

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);

            if (row["id"] == 1){
                continue;
            }
            var htmlcode = "<li style='padding: 10px;'><h4>" + row["username"] + "</h4></li>";

            playerList.append(htmlcode);
        }
    }

    User.selectAll(option, callback);
}

function selectUser(){
    var id = localStorage.getItem("readingUserId");
    var option = [id];

    function callback(tx, results){
        var row = results.rows.item(0);
        localStorage.setItem("readingUser", JSON.stringify(row));
    }

    User.select(option, callback);
}

function refreshChat(){
    $("#messageList").html("");

    function callback(tx, results){
        console.info("Messages received!");
        var messageList = $("#messageList");

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
            localStorage.setItem("readingUserId", row["userid"]);
            // Get user of message
            selectUser();
            var user = JSON.parse(localStorage.getItem("readingUser"));

            var htmlcode = "<li><h4 class='msgUser'>";
            if (user == null){
                user = "Deleted User";
            }
            htmlcode += user["username"];
            htmlcode += "<span class='msgDate'>" + row["dateCreated"] + "</span></h4>" +
            "<p class='msgText ";
            if (isRainbow(row["text"])) {
                htmlcode += "rainbow-text'>" + row["text"].substr("rainbow:".length).trim();
            }
            else{
                htmlcode += "'>" + row["text"];
            }
            htmlcode += "</p></li>";

            messageList.append(htmlcode);
        }
    }
    Message.selectAll([], callback);

    $('html, body').animate({scrollTop:$(document).height()}, '1');
}

function addMessage(messageText){
    var userid = localStorage.getItem("currentUserId");
    if (userid == null){
        userid = "1";
    }

    if (messageText.trim().length < 1) return;

    var option = [userid, messageText.trim()];

    function callback(){
        console.info("Message sent!");
    }

    Message.insert(option, callback);

    refreshChat();
}

function deleteUser(){
    var id= localStorage.getItem("id");
    var option = [id];
    User.delete(option, callback);
    function callback(){
        alert("User deleted successfully");
    }
    $(location).prop('href', '#ChatPage');
}

function updateUser(){
    var id= localStorage.getItem("id");

    var email= $("#txtUpdateEmail").val();
    var username = $("#txtUpdateUsername").val();
    var password = $("#txtUpdatePassword").prop("checked");
    var option=[email, username, password]; //check the sequence carefully
    function callback(){
        console.info("Record updated successfully");
    }

    User.update(option, callback);
}

function saveDefaultEmail(){
    localStorage.setItem("DefaultEmail", $("#tmDefaultReviewerEmail").val());
    alert("Default reviewer email saved.");
}