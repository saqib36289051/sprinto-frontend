import React from "react";
import TopHeader from "./header/topHeader";

type Props = {
  labelHeading: string;
  renderProps?: any;
};

const WithHeader = (props: Props) => {
  return (
    <TopHeader
      labelHeading={props?.labelHeading}
      renderProps={props?.renderProps}
    />
  );
};

export default WithHeader;
