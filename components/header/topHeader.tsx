import React from "react";
import { Label } from "../ui/label";

type Props = {
  labelHeading: string;
  renderProps?: any;
};

const TopHeader = ({ labelHeading, renderProps }: Props) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <Label className="text-md">{labelHeading}</Label>
      <div>{renderProps}</div>
    </div>
  );
};

export default TopHeader;
