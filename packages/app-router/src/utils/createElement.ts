import React from "react";
import { isValidElementType } from "react-is";

export default function createElement(
  element: unknown,
  props: Parameters<typeof React.cloneElement>[1],
  children: Parameters<typeof React.createElement>[2]
): React.ReactElement {
  if (isValidElementType(element)) {
    return React.createElement(element, props, children);
  }
  if (React.isValidElement(element)) {
    return React.cloneElement(element, props, children);
  }

  throw Error(
    `[@meta-ultra/app-router] Parameter "element" is neither a valid element type nor a valid element.`
  );
}
