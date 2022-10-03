import React from "react";
import styled from "styled-components";
import Colors from "../../constants/colors";

type IconButtonProps = {
  Icon: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
  className?: string;
  size?: number;
};

const IconButton = (props: IconButtonProps) => {
  const { Icon, ...rest } = props;
  return <Container {...rest}>{<img src={Icon} alt="" />}</Container>;
};

const Container = styled.div<{
  size?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => (props.size ? `${props.size}px` : "40px")};
  height: ${(props) => (props.size ? `${props.size}px` : "40px")};
  cursor: pointer;
  background-color: ${Colors.WHITE_SECONDARY};
  opacity: 1;

  border-radius: 50%;

  &:hover {
    background-color: ${Colors.LIGHT_WHITE};
  }
`;

export default IconButton;
