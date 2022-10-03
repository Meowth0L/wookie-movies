import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import Colors from "../../constants/colors";

type TypographyVariant = "header" | "text" | "body";

interface ITypographyProps {
  variant?: TypographyVariant;
  size?: number;
  height?: number;
  weight?: number;
  upper?: boolean;
  color?: Colors;
  center?: boolean;
  noWrap?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLParagraphElement>;
}

const Typography = (props: PropsWithChildren<ITypographyProps>) => {
  const { children, ...rest } = props;
  return <ComputedTypography {...rest}>{children}</ComputedTypography>;
};

export const TypographyMap = {
  header: `font-size: 32px; line-height: 48px; font-weight: 700;`,
  body: `font-size: 22px; line-height: 28px; font-weight: 500;`,
  text: `font-size: 16px; line-height: 24px; font-weight: 400;`,
};

const ComputedTypography = styled.p<ITypographyProps>`
  margin: 0;
  padding: 0;
  text-align: left;
  ${(props) => (props.variant && TypographyMap[props.variant]) || TypographyMap.text};

  ${(props) => props.size && `font-size: ${props.size}px !important;`}
  ${(props) => props.height && `line-height: ${props.height}px !important;`}
  ${(props) => props.weight && `font-weight: ${props.weight};`}
  ${(props) => props.upper && "text-transform: uppercase;"}
  ${(props) => props.color && `color: ${props.color};`}
  ${(props) => props.noWrap && "white-space: nowrap;"}
  ${(props) => props.center && "text-align: center;"}
`;

export default Typography;
