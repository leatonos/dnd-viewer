"use client";

import { CharacterInfo } from "../../../types";
import styled from "styled-components";

type Props = {
  character: CharacterInfo;
  onUpdate: (field: keyof CharacterInfo, value: string | number) => void;
};

export default function DmCharSkills({ character, onUpdate }: Props) {
  return (
    <Container>
      <Title>Skills</Title>

      <Description>
        This section is currently a work in progress. Soon you’ll be able to
        manage character skills, bonuses, and custom effects directly from here.
      </Description>

      <SupportMessage>
        If you’re enjoying this tool and would like to support its development,
        your feedback and support really help me add new features and improve the
        experience for everyone 💙
      </SupportMessage>

      <WebsiteLink
        href="https://pedrobaptista.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit my website
      </WebsiteLink>
    </Container>
  );
}

/* styled-components */

const Container = styled.div`
  padding: 24px;
  border-radius: 12px;
  background: #f9f9f9;
  border: 1px dashed #ddd;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 12px;
  font-size: 1.5rem;
`;

const Description = styled.p`
  margin-bottom: 16px;
  color: #555;
  line-height: 1.5;
`;

const SupportMessage = styled.p`
  margin-bottom: 20px;
  color: #666;
  font-size: 0.95rem;
`;

const WebsiteLink = styled.a`
  display: inline-block;
  font-weight: 600;
  color: #4a6cf7;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
