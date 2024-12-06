const tf = require('@tensorflow/tfjs-node');
async function loadModel() {
    return tf.loadGraphModel('https://storage.googleapis.com/kanker-kulit-forecast-bucket/submissions-model/model.json');
}
module.exports = loadModel;