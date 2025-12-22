"use client";

import styled from "styled-components";

type ProgressBarProps = {
  value: number; // 0–100
  barColor?: string;
  textColor?: string;
  label?: string;
};

/* ================= STYLES ================= */

const ProgressWrapper = styled.div`
  width: 100%;
  height: 28px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div<{
  $value: number;
  $barColor?: string;
}>`
  height: 100%;
  width: ${({ $value }) => $value}%;
  background: ${({ $barColor }) => $barColor ?? "#10b981"};
  transition: width 0.8s ease;
`;

const ProgressText = styled.span<{ $textColor?: string }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: ${({ $textColor }) => $textColor ?? "#ffffff"};
  pointer-events: none;
`;

/* ================= COMPONENT ================= */

export default function ProgressBar({value,label,barColor,textColor}: ProgressBarProps) {
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <ProgressWrapper
      role="progressbar"
      aria-valuenow={safeValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <ProgressFill $value={safeValue} $barColor={barColor} />
      <ProgressText $textColor={textColor}>
        {label ?? `${safeValue}%`}
      </ProgressText>
    </ProgressWrapper>
  );
}
