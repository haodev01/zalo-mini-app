import React, { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

type ContextType = { step: number; increment: () => void };
const LayoutDefault = () => {
  const [step, setStep] = useState<number>(0);
  const increment = () => setStep((prev) => prev + 1);
  return (
    <div>
      <h1>The Header</h1>
      {step}
      <Outlet context={{ step, increment }} />
      <h1>The Footer</h1>
    </div>
  );
};
export default LayoutDefault;
export function useStep() {
  return useOutletContext<ContextType>();
}
