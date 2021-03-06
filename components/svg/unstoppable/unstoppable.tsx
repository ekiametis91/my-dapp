import React, { FC, PropsWithChildren } from "react";
import Svg, { SvgProps } from "../svg";

const Icon: FC<SvgProps> = (props: PropsWithChildren<SvgProps>) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M45.464 4.139V19.745L0 38.188L45.464 4.139Z" fill="#2FE9FF" />
      <path fillRule="evenodd" clipRule="evenodd" d="M36.939 3.428V30.383C36.939 38.219 30.578 44.571 22.732 44.571C14.885 44.571 8.524 38.219 8.524 30.383V19.034L17.049 14.352V30.383C17.049 33.126 19.275 35.349 22.021 35.349C24.768 35.349 26.994 33.126 26.994 30.383V8.89L36.939 3.428Z" fill="#4C47F7" />
    </Svg>
  );
};

export default Icon;
