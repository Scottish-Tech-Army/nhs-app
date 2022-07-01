import React from "react";

export type FormValueType = {
  name: string;
  count: number;
};

export interface BoxProps {
  actualContents: string[];
}

function ShoppingList({ actualContents }: BoxProps) {
  return (
    <div/>
  );
}

export default ShoppingList;
