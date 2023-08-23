import React from "react";
import { useEffect } from "react";
import "./videoplayer.css";
import { useState } from "react";
export function VideoPlayer() {
  const [liveStream, setLiveStream] = useState(null);
  const [audioStream, setAudioStream] = useState(null)
  const [videoStream, setVideoStream] = useState(null)
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audio, setAudio] = useState(null)
  const [video,setVideo] = useState(null)

  const init = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const VideoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      const AudioStream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });

      document.getElementById("user1").srcObject = stream;

      setLiveStream(stream);
      setAudioStream(AudioStream)
      setVideoStream(VideoStream);
      

      const recorder = new MediaRecorder(stream);
      const AudioRecorder = new MediaRecorder(AudioStream)
      const VideoRecorder = new MediaRecorder(VideoStream)
      setMediaRecorder(recorder);
      setAudio(AudioRecorder)
      setVideo(VideoRecorder);
      

      const websocket = new WebSocket('ws://localhost:4000');
      
      recorder.ondataavailable = (event) => {
        AudioRecorder.ondataavailable = (event)=>{
          if (event.data.size > 0) {
            websocket.send(event.data);
            console.log("sending audio data to server")
            console.log(event.data)
            
          }
        }
        VideoRecorder.ondataavailable = (event)=>{
          if (event.data.size > 0) {
            websocket.send(event.data);
            console.log("sending video data to server")
            console.log(event.data)
            
          }
        }
        if (event.data.size > 0) {
          websocket.send(event.data);
          console.log("sending data to server")
          console.log(event.data)
          
        }
      };

      recorder.start(5000); // Record every 5 seconds
      AudioRecorder.start(5000);
      VideoRecorder.start(5000);

    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      
      mediaRecorder.stop();
      audio.stop();
      video.stop()
      console.log("stop recording")
      liveStream.getTracks().forEach(track => track.stop());
    }
  }

  // const startRecording = ()=>{
  //   if(mediaRecorder){
  //     mediaRecorder.start(5000)
  //     liveStream.getTracks().forEach(track => track.start());
  //   }
  // }


  // const servers = {
  //   iceServers: [
  //     {
  //       urls: [
  //         "stun:stun1.l.google.com:19302",
  //         "stun:stun2.l.google.com:19302",
  //       ],
  //     },
  //   ],
  // };

  // let init = async () => {
  //   const liveStream = navigator.mediaDevices.getUserMedia({
  //       video: true,
  //       audio: true,
  //     })
  //     try{() => {
  //       document.getElementById("user1").srcObject = liveStream;        

  //       const websocket = new WebSocket('ws://localhost:4000');
  //       mediaRecorder = new MediaRecorder(liveStream);
  //       console.log("sending data") 
               
  //       mediaRecorder.ondataavailable = (event) => {
          
  //         if (event.data.size > 0) {
  //           websocket.send(event.data);
  //           console.log(event.data)
  //           console.log("sending data to server")
  //         }
  //       };

  //       mediaRecorder.start(5000); // Record every 5 seconds
  //     }}
  //     catch{(error) => {
  //       console.error('Error accessing media devices:', error);
  //     }};
  //   };
  
  
  return (
    <div id="videos">
      <video className="video-player" id="user1" autoPlay playsInline></video>
      <div>
        <button onClick={stopRecording}>stop</button>
      </div>
      <div>
        <button onClick={init}>start</button>
      </div>
    </div>
  );
}
