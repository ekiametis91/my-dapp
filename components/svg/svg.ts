import styled, { DefaultTheme, css, keyframes } from "styled-components";
import { SpaceProps, space } from "styled-system";
import { SVGAttributes } from "react";
import getThemeValue from "../../utils/theme/theme";

export interface SvgProps extends SVGAttributes<HTMLOrSVGElement>, SpaceProps {
    theme?: DefaultTheme;
    spin?: boolean;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const spinStyle = css`
  animation: ${rotate} 2s linear infinite;
`;

const Svg = styled.svg<SvgProps>`
  align-self: center; // Safari fix
  fill: ${({ theme, color }) => getThemeValue(`colors.${color}`, color)(theme)};
  flex-shrink: 0;
  ${({ spin }) => spin && spinStyle}
  ${space}
`;

Svg.defaultProps = {
  color: "text",
  width: "20px",
  xmlns: "http://www.w3.org/2000/svg",
  spin: false,
};

export default Svg;