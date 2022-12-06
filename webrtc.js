export let peer = new Peer();
export let connection;
export let msg = "hi";
const input = document.getElementById("input");
const connectBtn = document.getElementById("connectBtn");
const streamBtn = document.getElementById("streamBtn");
const myID = document.getElementById("myID");
const myVideo = document.getElementById("myVideo");
const remoteVideo = document.getElementById("remoteVideo");
export let data;

connectBtn.addEventListener("click", (e) => {
  e.preventDefault();
  connection = peer.connect(input.value);
  input.value = "";
  connection.on("open", function () {
    console.log("connectedaaa");
    // Receive messages
    connection.on("data", function (data) {
      console.log("Received", data);
    });

    // Send messages
    connection.send("Hello!");
  });
});
streamBtn.addEventListener("click", (e) => {
  e.preventDefault();
  startStream();
});

/*
, function (conn) {
    console.log("COnn", conn);
    conn.on("open", function () {
      // here you have conn.id
      conn.on("data", function (receivedData) {
        console.log(data);
        data = receivedData;
      });
      conn.send("hi");
    });
  }

if (connection) {
    console.log("sending");
    connection.send({
      strings: "hi!",
      x: this.player.x,
      y: this.player.y,
    });
    this.player.setPosition(data.x, data.y);
  } */
peer.on("open", function (id) {
  console.log("My peer ID is: " + id);
  myID.innerHTML = "My ID: \n" + id;
});

peer.on("connection", function (conn) {
  console.log("connected");
});

peer.on("call", function (call) {
  call.on("stream", function (stream) {
    // `stream` is the MediaStream of the remote peer.
    // Here you'd add it to an HTML video/canvas element.
    remoteVideo.srcObject = stream;
    remoteVideo.play();
  });
  // Answer the call, providing our mediaStream
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      myVideo.srcObject = stream;

      myVideo.play();

      call.answer(stream);
    });
});

function startStream() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      myVideo.srcObject = stream;
      myVideo.play();
      let call = peer.call(input.value, stream);
      call.on("stream", function (remoteStream) {
        // Show stream in some video/canvas element.
        remoteVideo.srcObject = remoteStream;
        remoteVideo.play();
      });
    });
}
