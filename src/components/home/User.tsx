import React, { useEffect } from "react";

import { useRecoilState, useResetRecoilState } from "recoil";
import { displayNameState } from "state";
import { getUserInfo } from "zmp-sdk";
import { Button } from "zmp-ui";
const getUser = async () => {
  try {
    const { userInfo } = await getUserInfo({});
    console.log(userInfo);
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};
export default function User() {
  const [displayName, setDisplayName] = useRecoilState(displayNameState);
  const restDisplayName = useResetRecoilState(displayNameState);
  return (
    <div className="banner">
      {displayName}
      <Button onClick={() => setDisplayName("XXX")}>Set Displayname</Button>
      <Button onClick={restDisplayName}>Rest</Button>
    </div>
  );
}
