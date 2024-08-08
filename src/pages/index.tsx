import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header, Page } from "zmp-ui";

const HomePage: React.FunctionComponent = () => {
  const naviage = useNavigate();
  return (
    <Page>
      <Header title="Trang chủ" />
      <div className="flex items-center justify-center h-screen">
        <Button onClick={() => naviage("/camera")}>Take Picture</Button>
      </div>
    </Page>
  );
};

export default HomePage;
