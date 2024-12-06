const predictClassification = require("../services/InferenceService");
const crypto = require("crypto");
const storeData = require("../services/storeData");
const InputError = require("../exceptions/InputError");
const { db } = require("../config/firebase");

async function postPredictHandler(request, h) {
  try {
    const { image } = request.payload;
    const { model } = request.server.app;
    const { confidenceScore, label, suggestion } = await predictClassification(
      model,
      image
    );

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const data = {
      id,
      result: label,
      suggestion,
      createdAt,
    };

    await storeData(id, data);
    console.log("Data successfully saved:", data);

    const responseMessage = "Model is predicted successfully";

    const response = h.response({
      status: "success",
      message: responseMessage,
      data,
    });
    response.code(201);
    return response;
  } catch (error) {
    console.error("Error in postPredictHandler:", error);
    throw new InputError("Terjadi kesalahan dalam melakukan prediksi");
  }
}

async function predictHistories(request, h) {
  try {
    const predictCollection = db.collection("predictions");
    const snapshot = await predictCollection.get();

    if (snapshot.empty) {
      return h.response({
        status: "success",
        data: [],
      });
    }

    const result = [];
    snapshot.forEach((doc) => {
      result.push({
        id: doc.id,
        history: doc.data(),
      });
    });

    return h.response({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Error retrieving prediction histories:", error);
    throw new InputError("Gagal mengambil data prediksi.");
  }
}

module.exports = { postPredictHandler, predictHistories };