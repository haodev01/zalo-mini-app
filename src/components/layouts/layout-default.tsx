import React, { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

type ContextType = { step: number; increment: () => void };
const LayoutDefault = () => {
  const [step, setStep] = useState<number>(0);
  const increment = () => setStep((prev) => prev + 1);
  return (
    <div>
      <Outlet context={{ step, increment }} />
    </div>
  );
};
export default LayoutDefault;
export function useStep() {
  return useOutletContext<ContextType>();
}
