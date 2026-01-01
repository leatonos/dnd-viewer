"use client"
import { CharacterInfo } from "../../../types";
import styled from "styled-components";
import Image from "next/image";
import { on } from "events";
import { useState } from "react";

type Props = {
  currentImage:string;
  onClose: () => void;
  onChooseImage: () => void;
};

const FullScreenWrapper = styled.div`
  position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    box-sizing: border-box;
    padding: 40px;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const CharPhotoSelectorContainer = styled.div`
    position: relative;
    width: 60%;
    min-width: 500px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    padding: 20px;
    border-radius: 8px;
`;

const CloseWindowButton = styled.button`
    position: absolute;
    cursor: pointer;
    top: 10px;
    right: 10px;
    border: none;
    border-radius: 4px;
    width: 30px;
    height: 30px;
`;

const CharImagePreviewContainer = styled.div`
    display: flex;
    width: 35%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
`;

const CharacterPhotoContainer = styled.div`
    width: 100%;
    height: auto;
    padding: 5px;
    box-sizing: border-box;
    margin-bottom: 15px;
`; 

const CharacterPhoto = styled.img`
    width: 100%;
    height: auto;
    padding: 5px;
    box-sizing: border-box;
`;

const ImageOptionsContainer = styled.div`
    display: flex;
    width: 65%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

export default function ImageSelector({currentImage, onClose, onChooseImage}: Props) {

  const [selectedImage, setSelectedImage] = useState<string>()

  const chooseImage = () => {
    onClose();
  }

  return (
    <FullScreenWrapper>
        <CharPhotoSelectorContainer>
            <CloseWindowButton onClick={onClose}>
                <Image src="/icons/close.svg" alt="Close" width={24} height={24} />
            </CloseWindowButton>
            <CharImagePreviewContainer>
                <CharacterPhotoContainer>
                    <CharacterPhoto src="https://placehold.co/150x170" alt='your current selected image' />
                </CharacterPhotoContainer>
            </CharImagePreviewContainer>
            <ImageOptionsContainer>
                 
            </ImageOptionsContainer>
        </CharPhotoSelectorContainer>
    </FullScreenWrapper>
  )
}