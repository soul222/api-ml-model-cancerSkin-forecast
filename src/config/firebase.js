const admin = require("firebase-admin");
const serviceAccount = require("../../submissionmglc-soultanamirulm-firebase-adminsdk-1en04-2e731fea1e.json");

// Inisialisasi Firebase Admin sekali saja
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });


const db = admin.firestore();

module.exports = { admin, db };