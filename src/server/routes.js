const { postPredictHandler, predictHistories } = require("../server/handler");

const routes = [
  {
    path: "/predict",
    method: "POST",
    handler: postPredictHandler,
    options: {
      payload: {
        maxBytes: 1000 * 1000, // 1 MB
        allow: "multipart/form-data",
        multipart: true,
      },
    },
  },
  {
    path: "/predict/histories",
    method: "GET",
    handler: predictHistories,
    options: {
      auth: false,
    },
  },
];

module.exports = routes;