const config = require('config-yml')
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/firestore");
// Initialize Firebase
firebase.initializeApp(config.firebase);
// firebase.analytics();
var db = firebase.firestore();
// data manipulation

var docRef = db.collection("chatroom");

async function getRecord(roomId, limit = 100) {
    let result = [];
    await docRef.where("room", "==", roomId).limit(+limit).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            result.push(doc.data());
        });
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
    return result;
}

function setRecord(msgItem) {
    msgItem.time = msgItem.ts;
    docRef.add(msgItem)
}

module.exports = {
    getRecord,
    setRecord
}