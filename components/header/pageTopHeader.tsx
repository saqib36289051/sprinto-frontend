"use client"
import React from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

type ButtonProps = {
  label: string;
  onClick: () => void;
};

type Props = {
  labelHeading: string;
  buttons?: ButtonProps[];
};

const PageTopHeader = (props: Props) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <Label className="text-md">{props?.labelHeading}</Label>
      <div>
        {props?.buttons &&
          props.buttons.map((button) => {
            return <Button onClick={button.onClick}>{button.label}</Button>
          })}
      </div>
    </div>
  );
};

export default PageTopHeader;
