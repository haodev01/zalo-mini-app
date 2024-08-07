import React from "react";
import { Page } from "zmp-ui";
import { CameraCustom } from "components/home";

const HomePage: React.FunctionComponent = () => {
  return (
    <Page className="page">
      <CameraCustom />
    </Page>
  );
};

export default HomePage;
