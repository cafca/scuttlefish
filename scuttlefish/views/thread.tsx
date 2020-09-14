import React from "react";

interface Props {
  key: string;
}

const Thread: React.FC<Props> = ({ key }: Props) => {
  return <div className="thread">{key}</div>;
};

export default Thread;
