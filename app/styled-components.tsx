
import styled from "styled-components";

export const Button = styled.button`
  padding: 12px 16px;
  border-radius: 6px;
  background: #111;
  color: white;
`;

export const PartyContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 300px;
  max-height: 400px;`;

export const CharacterCard = styled.div`
  width: 150px;
  height: 300px;
  padding: 10px;
  margin: 10px;
`;

export const H1Title = styled.h1`
  font-size: 2rem;`;


type ButtonSize = "sm" | "md" | "lg";
type FlexDirection = "row" | "column";

interface ButtonProps {
  $bgColor?: string;
  $size?: ButtonSize;
  $textColor?: string;
  $flexDirection?: FlexDirection;
}

const sizeStyles = {
  sm: `
    padding: 6px 12px;
    font-size: 12px;
  `,
  md: `
    padding: 10px 16px;
    font-size: 14px;
  `,
  lg: `
    padding: 14px 20px;
    font-size: 16px;
  `,
};

export const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background-color: ${({ $bgColor }) => $bgColor || "#ffffff"};
   color: ${({ $textColor }) => $textColor || "#000000"};

  flex-direction: ${({ $flexDirection }) => $flexDirection || "row"};

  border: none;
  border-radius: 8px;
  cursor: pointer;

  ${({ $size }) => sizeStyles[$size || "md"]};

  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;



  