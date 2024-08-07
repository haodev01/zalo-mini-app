import React from "react";

import { useRecoilValue } from "recoil";
import { displayNameState } from "state";

export default function Banner() {
  const displayName = useRecoilValue(displayNameState);
  return <div className="banner">{displayName}</div>;
}
