/*

_rotation: Array[9]
_scaleFactor: -28.4928
_translation: Array[3]
controller: module.exports
currentFrameRate: 21.6798
data: Object
fingers: Array[0]
gestures: Array[0]
hands: Array[0]
handsMap: Object
historyIdx: 1352
id: 3043927
interactionBox: module.exports
pointables: Array[0]
pointablesMap: Object
timestamp: 296672227000
tools: Array[0]
type: "frame"
valid: true

*/

var controller = new Leap.Controller();

controller.on('connect', function() {
  console.log("Successfully connected.");
});

controller.on('deviceConnected', function() {
  console.log("A Leap device has been connected.");
});

controller.on('deviceDisconnected', function() {
  console.log("A Leap device has been disconnected.");
});

controller.on('frame', function(frame) {
  wf = frame;
});


controller.connect();