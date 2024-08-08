import React from "react";

import { TakePicture } from "@/components/TakePicture";
import { Header } from "zmp-ui";

const Camera = () => {
  return (
    <div>
      <Header title="Chụp mặt trước" />
      <TakePicture />
    </div>
  );
};
export default Camera;
