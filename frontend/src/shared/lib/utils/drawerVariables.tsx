import { JSX } from "react";

export const enum EDrawerVariables {}

export const drawerComponents: Record<EDrawerVariables, JSX.Element> = {};

export const getDrawerComponent = (type: EDrawerVariables): React.ReactNode => {
  return drawerComponents[type];
};
