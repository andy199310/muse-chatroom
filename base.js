var windowRef = window.open("http://localhost:63340/notification/notification.html", "TITLE", "menubar=0,resizable=0,width=1024,height=576")

/*
var payloadTemp = {
    event: "UserJoin",
    userName: "UserName"
}

windowRef.postMessage(payloadTemp, "*");


var payloadTemp = {
    event: "TestEvent",
    userName: "UserName"
}

windowRef.postMessage(payloadTemp, "*");
*/

function onUserJoined(event) {
    const target = event.target;

    const joinText = target.innerText;  // Andy Chang joined
    console.log(joinText);
    if (joinText.length === 0) {
        console.log("No innerText. Skip it");
        return;
    }

    if (joinText.includes("nyan")) {
        let nyanCallerName = "";

        if (target.getElementsByClassName("UgDTGe").length === 1) {
            nyanCallerName = target.getElementsByClassName("UgDTGe")[0].textContent;
            console.log(`Nyan caller name: ${nyanCallerName}`)
        } else {
            console.log("Cannot get nyanCallerName");
            console.warn(event);
        }

        const payload = {
            event: "NyanRun",
            userName: nyanCallerName
        }
        windowRef.postMessage(payload, "*");
    }

    if (!joinText.includes("joined")) {
        console.log("No user join! stop!");
        return;
    }
    console.log("user joined!");
    const userName = joinText.substr(0, joinText.indexOf(' joined'));
    console.log(`User name: ${userName}`);
    const payload = {
        event: "UserJoin",
        userName: userName
    }
    windowRef.postMessage(payload, "*");

}

function onUserLeave(event) {

    if (!event.target.className.includes("Mh0NNb")) {
        // Not user leave event
        // console.log("No class");
        return;
    }

    setTimeout(function () {

        const leaveText = event.target.innerText;
        console.log("Text: " + leaveText);

        const userName = leaveText.substr(0, leaveText.indexOf(" has left"));
        console.log(`Leave user name: ${userName}`);

        const payload = {
            event: "UserLeave",
            userName: userName
        }

        windowRef.postMessage(payload, "*");

    }, 500)


}

var joinAlertContainer = document.getElementsByClassName("NSvDmb")[0];

joinAlertContainer.addEventListener('DOMNodeInserted', onUserJoined, false);

//
// function onUserLeaveWarp(event) {
//     onUserLeave(event);
// }

document.body.addEventListener('DOMNodeInserted', onUserLeave, false);

/*

document.body.addEventListener('DOMNodeInserted', onUserLeave, false);
joinAlertContainer.removeEventListener('DOMNodeInserted', onUserJoined, false);


*/
