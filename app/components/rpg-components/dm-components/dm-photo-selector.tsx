"use client"
import { CharacterInfo } from "../../../types";
import styled from "styled-components";
import Image from "next/image";
import { on } from "events";
import { useEffect, useState } from "react";
import {characterImgCollections} from "../../../utils"

type Props = {
  currentImage:string;
  onClose: () => void;
  onChooseImage: (image:string) => void;
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
    width: 90%;
    min-width: 500px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    padding: 20px;
    padding-top:45px;
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
    justify-content: flex-start;
    align-items: flex-start;
`;

const TabContainer = styled.nav`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 6px;              
`;

const Tab = styled.div`
    text-align: center;
    background-color: #6366f1;
    color: white;
    padding: 8px 14px;
    border-radius: 20px 20px 0px 0px;       
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;  /* Smooth hover animation */

    &:hover {
        background-color: #4f46e5;
    }

`;

const ImageCollection = styled.div`
    width:100%;
    padding:4px;
    gap:2px;
    display:flex;
    height:300px;
    overflow-y:auto;
    flex-wrap: wrap;
`;

const ImageOption = styled.img`
    width:100px;
    height:100px;
    cursor:pointer;
`;

const SaveButtonContainer = styled.div`
    display: flex;
    margin-top: 50px;
    justify-content: flex-end;
    width: 100%;
`;

const SaveButton = styled.button`
    padding: 8px 16px;
    background: #10b981;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;


export default function ImageSelector({currentImage, onClose, onChooseImage}: Props) {

  const [selectedImage, setSelectedImage] = useState<string>(currentImage)
  const [selectedTab, setSelectedTab] = useState<number>(0)


  const imageGallery = characterImgCollections[selectedTab].characters.map((image)=>{
    return image
  })

  const galleryFolder = characterImgCollections[selectedTab].folder

  const imageTabs = characterImgCollections.map((collection)=>{
    return collection.colletionName
  })


  
  const chooseImage = () => {
    if(!selectedImage) {return}
    onChooseImage(selectedImage)
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
                    <CharacterPhoto src={selectedImage} alt='your current selected image' />
                </CharacterPhotoContainer>
            </CharImagePreviewContainer>
            <ImageOptionsContainer>
                <TabContainer>
                    {imageTabs.map((tab, index) => (
                        <Tab onClick={()=> setSelectedTab(index)} key={index}>{tab}</Tab>
                    ))}
                </TabContainer>
                <ImageCollection>
                    {imageGallery.map((image) =>{
                        const imagePath = `${galleryFolder}/${image}`
                        return(
                            <ImageOption key={`${galleryFolder}_${image}`} onClick={()=>setSelectedImage(imagePath)} src={imagePath}/>
                        )
                    })}
                </ImageCollection>
                <SaveButtonContainer>
                    <SaveButton onClick={chooseImage}>Save Changes</SaveButton>
                </SaveButtonContainer>
            </ImageOptionsContainer>
        </CharPhotoSelectorContainer>
    </FullScreenWrapper>
  )
}