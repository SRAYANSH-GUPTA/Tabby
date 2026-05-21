import { Stack } from "expo-router";
import type {
  FC,
  FunctionComponent,
  JSX,
  ReactElement,
  ReactNode,
} from "react";

const SearchStackLayout: FC & FunctionComponent = ():
  | (ReactNode & ReactElement & JSX.Element)
  | null => {
  return <Stack />;
};

export default SearchStackLayout;
