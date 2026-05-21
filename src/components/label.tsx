import { useTheme } from "@react-navigation/native";
import React, { createContext, memo, useContext, useMemo } from "react";
import {
  StyleSheet,
  Text,
  type TextProps,
  View,
  type ViewProps,
} from "react-native";

type LabelSize = "sm" | "md" | "lg";

interface ILabel extends ViewProps {
  children: React.ReactNode;
  size?: LabelSize;
}

const LabelSizeContext = createContext<LabelSize>("md");
const useLabelSize = () => useContext(LabelSizeContext);

const sizeMap = {
  sm: { title: 16, subtitle: 12, gap: 1 },
  md: { title: 20, subtitle: 14, gap: 2 },
  lg: { title: 26, subtitle: 16, gap: 4 },
} as const;

const LabelRoot = memo(
  ({ children, style, size = "md", ...rest }: ILabel) => {
    const ctx = useMemo(() => size, [size]);
    return (
      <LabelSizeContext.Provider value={ctx}>
        <View
          style={[styles.root, { gap: sizeMap[size].gap }, style]}
          {...rest}
        >
          {children}
        </View>
      </LabelSizeContext.Provider>
    );
  },
);

const LabelTitle = memo(({ style, ...rest }: TextProps) => {
  const theme = useTheme();
  const size = useLabelSize();
  return (
    <Text
      style={[
        styles.title,
        { fontSize: sizeMap[size].title, color: theme.colors.text },
        style,
      ]}
      {...rest}
    />
  );
});

const LabelSubtitle = memo(({ style, ...rest }: TextProps) => {
  const size = useLabelSize();
  return (
    <Text
      style={[styles.subtitle, { fontSize: sizeMap[size].subtitle }, style]}
      {...rest}
    />
  );
});

const styles = StyleSheet.create({
  root: {},
  title: {
    fontWeight: "700",
  },
  subtitle: {
    color: "#bfbfbf",
    opacity: 0.9,
  },
});

export const Label = Object.assign(LabelRoot, {
  Title: LabelTitle,
  Subtitle: LabelSubtitle,
});

export default Label;
