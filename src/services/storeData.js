const { admin, db } = require("../config/firebase");

async function storeData(id, data) {
  try {
    const predictCollection = db.collection("predictions");
    await predictCollection.doc(id).set({
      ...data,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
  } catch (error) {
    console.error("Full error:", error);
    throw new Error(`Failed to save data: ${error.message}`);
  }
}

module.exports = storeData;