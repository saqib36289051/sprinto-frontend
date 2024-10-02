import React from "react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  label?: string;
  className?: string;
};

const ReusableCard = (props: Props) => {
  return (
    <div
      onClick={props.onClick}
      className={cn("shadow p-4 bg-white rounded-lg flex-col", props?.className)}
    >
      {props.children}
    </div>
  );
};

ReusableCard.Header = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
  label?: string;
  className?: string;
}) => {
  return (
    <div className={cn(props?.className)}>
      {children ? (
        children
      ) : (
        <Label className="text-sm line-clamp-2">{props?.label}</Label>
      )}
      <Separator className="mt-1 mb-2" />
    </div>
  );
};

ReusableCard.Body = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={props?.className}>{children}</div>;
};

ReusableCard.Footer = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default ReusableCard;
