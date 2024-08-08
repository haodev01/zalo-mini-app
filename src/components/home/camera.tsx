import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Page } from "zmp-ui";
import api, {
  FacingMode,
  PhotoFormat,
  PhotoFrame,
  PhotoQuality,
  ZMACamera,
} from "zmp-sdk";
import * as faceapi from "face-api.js";
const videoWidth = 640;
const videoHeight = 480;

export function getMeanPosition(l: any) {
  return l
    .map((a: any) => [a.x, a.y])
    .reduce((a: any, b: any) => [a[0] + b[0], a[1] + b[1]])
    .map((a) => a / l.length);
}

export default function CameraCustom() {
  const [modelsLoaded, setModelsLoaded] = React.useState(true);
  React.useEffect(() => {
    console.log("Loading models...");
    const loadModels = async () => {
      const MODEL_URL = "https://online.topi.vn/models";
      // @ts-ignore
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
    };
    console.log("Models loaded");
    loadModels()
      .then(() => {
        console.log("Models loaded success");
        setModelsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const videoRef = useRef<any>(null);
  const cameraRef = useRef<ZMACamera>(null);
  const canvasRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);
  const [data, setData] = useState("");
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      console.log("Media component not ready");
      return;
    }
    if (!cameraRef.current) {
      cameraRef.current = api.createCameraContext({
        videoElement: videoElement,
        mediaConstraints: {
          width: videoWidth,
          height: videoHeight,
          facingMode: FacingMode.FRONT,
          audio: false,
        },
      });
    }
  }, []);
  const onHandleStartVideo = async () => {
    const camera = cameraRef.current;
    await camera?.start();
    intervalRef.current = setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        console.log("handle");
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };
        faceapi.matchDimensions(canvasRef.current, displaySize);
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        canvasRef &&
          canvasRef.current &&
          canvasRef.current
            .getContext("2d")
            .clearRect(0, 0, videoWidth, videoHeight);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawFaceExpressions(
            canvasRef.current,
            resizedDetections
          );
        const landmarks: any = await faceapi.detectFaceLandmarks(
          canvasRef.current
        );
        if (landmarks && detections && detections.length > 0) {
          const eyeRight = getMeanPosition(landmarks.getRightEye());
          console.log("eyeRight", eyeRight);
        }
      }
    }, 1000);
  };
  const onHandleStopVideo = async () => {
    cameraRef.current?.stop();
    clearInterval(intervalRef.current);
  };
  return (
    <Page>
      <Box>
        <div
          style={{ display: "flex", justifyContent: "center", padding: "10px" }}
        >
          <video
            height={videoHeight}
            width={videoWidth}
            style={{ backgroundColor: "black", borderRadius: "10px" }}
            ref={videoRef}
            muted
            playsInline
            webkit-playsinline="true"
          />
          <canvas ref={canvasRef} style={{ position: "absolute" }} />
        </div>
        {/* <img
          id="image"
          src={data}
          alt={""}
          style={{ width: "50vw", height: "auto", objectFit: "contain" }}
        ></img> */}
      </Box>
      <Box mt={5} flex alignContent={"center"}>
        <Button
          size={"small"}
          className="mb-2"
          variant="primary"
          onClick={onHandleStartVideo}
        >
          Start Stream
        </Button>
        <Button
          size={"small"}
          className="mb-2"
          variant="primary"
          onClick={onHandleStopVideo}
        >
          Start Stream
        </Button>
        <Button
          size={"small"}
          variant="primary"
          onClick={() => {
            let result: PhotoFrame = cameraRef.current?.takePhoto({
              quality: PhotoQuality.NORMAL,
              format: PhotoFormat.JPEG,
              minScreenshotHeight: 1000,
            });
            if (result) {
              setData(result.data);
            } else {
              console.log("No data");
            }
          }}
        >
          Take Photo
        </Button>
      </Box>
    </Page>
  );
}
