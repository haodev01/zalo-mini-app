import React, { useEffect, useRef, useState } from "react";
import api, {
  FacingMode,
  PhotoFormat,
  PhotoFrame,
  PhotoQuality,
  ZMACamera,
} from "zmp-sdk";
import { Button } from "zmp-ui";
const videoWidth = 640;
const videoHeight = 480;

export const TakePicture = () => {
  const videoRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
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
          facingMode: FacingMode.BACK,
          audio: false,
        },
      });
      onStart();
    }
  }, []);
  const onStart = async () => {
    const camera = cameraRef.current;
    await camera?.start();
  };
  const onStop = async () => {
    const camera = cameraRef.current;
    await camera?.stop();
  };
  const onTakePicture = async () => {
    let result: PhotoFrame = cameraRef.current?.takePhoto({
      quality: PhotoQuality.NORMAL,
      format: PhotoFormat.JPEG,
      minScreenshotHeight: 1000,
    });
    if (result) {
      setData(result.data);
      onStop();
    } else {
      console.log("No data");
    }
  };
  const onReset = () => {
    setData("");
    onStart();
  };
  return (
    <div className="bg-black w-full h-screen relative ">
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <Button onClick={onTakePicture}>Take Picture</Button>
      </div>
      {!!data && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <Button onClick={onReset}>Chụp lại</Button>
        </div>
      )}
      <div className="flex items-center justify-center h-screen px-5 relative ">
        <div className="relative">
          <video
            height={videoHeight}
            width={videoWidth}
            style={{ borderRadius: "10px" }}
            ref={videoRef}
            muted
            playsInline
            webkit-playsinline="true"
          />
          {!!data && (
            <img
              id="image"
              src={data}
              className="absolute top-0 left-0"
              width={videoWidth}
              height={videoHeight}
            />
          )}
        </div>
      </div>
    </div>
  );
};
