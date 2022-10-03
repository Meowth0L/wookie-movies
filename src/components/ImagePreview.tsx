import React from "react";
import styled from "styled-components";

interface IImagePreviewProps {
  source: string;
  width?: number;
  height?: number;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

const ImagePreview = (props: IImagePreviewProps) => {
  const { source, width = 210, height = 130, onClick } = props;
  const clickable = Boolean(onClick);
  return <StyledImage src={source} width={width} height={height} onClick={onClick} clickable={clickable} />;
};

const StyledImage = styled.img<{ width: number; height: number; clickable: boolean }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
`;

export default React.memo(ImagePreview);
