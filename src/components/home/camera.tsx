import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Page } from "zmp-ui";
import api, {
  FacingMode,
  PhotoFormat,
  PhotoFrame,
  PhotoQuality,
  ZMACamera,
} from "zmp-sdk";

export default function CameraCustom() {
  const videoRef = useRef(null);
  const cameraRef = useRef<ZMACamera>(null);
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
          width: 640,
          height: 480,
          facingMode: FacingMode.BACK,
          audio: false,
        },
      });
    }
  }, []);
  return (
    <Page>
      <Box>
        <video
          style={{ width: "50vw", height: "auto", backgroundColor: "black" }}
          ref={videoRef}
          muted
          playsInline
          webkit-playsinline="true"
        />
        <img
          id="image"
          src={data}
          alt={""}
          style={{ width: "50vw", height: "auto", objectFit: "contain" }}
        ></img>
      </Box>
      <Box mt={5} flex alignContent={"center"}>
        <Button
          size={"small"}
          className="mb-2"
          variant="primary"
          onClick={async () => {
            const camera = cameraRef.current;
            await camera?.start();
          }}
        >
          Start Stream
        </Button>
        <Button
          size={"small"}
          className="mb-2"
          variant="primary"
          onClick={() => cameraRef.current?.stop()}
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
