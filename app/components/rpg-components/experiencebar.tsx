import React from "react";
import ProgressBar from "./progressbar";

type ExperienceBarProps = {
  exp: number;
  requiredExp: number;
};

export default function ExperienceBar({ exp, requiredExp }: ExperienceBarProps) {
  // Case 1: both exp and requiredExp are 0 → render nothing
  if (!exp && !requiredExp) {
    return null;
  }

  // Case 2: requiredExp is 0 but exp exists → use exp as porcentage
  if (!requiredExp && exp) {
    return <ProgressBar value={exp} barColor="#facc15" textColor="#000000" label={`${exp}%`} />;
  }

  // Case 3: normal calculation
  const expPercent = (exp / requiredExp) * 100;
  return <ProgressBar value={expPercent} barColor="#facc15" textColor="#000000" label={`${exp}/${requiredExp}`} />;
}
