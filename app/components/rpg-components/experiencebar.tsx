import React from "react";
import ProgressBar from "./progressbar";

type ExperienceBarProps = {
  exp: number;
  requiredExp: number;
  isDM: boolean;
};

export default function ExperienceBar({ exp, requiredExp, isDM }: ExperienceBarProps) {
  // Case 1: both exp and requiredExp are 0 → render nothing
  if (!exp && !requiredExp || requiredExp == 0) {
    return null;
  }

  // Case 2: requiredExp is 0 but exp exists → use exp as porcentage
  if (!requiredExp && exp) {
    return <ProgressBar value={exp} barColor="#facc15" textColor="#000000" label={`${exp}%`} isDM={isDM} />;
  }

  // Case 3: normal calculation
  const expPercent = (exp / requiredExp) * 100;
  return <ProgressBar value={expPercent} barColor="#facc15" textColor="#000000" label={`${exp}/${requiredExp}`} isDM={isDM} />;
}
