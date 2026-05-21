import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
  type FC,
  type FunctionComponent,
  type ReactElement,
  type ReactNode,
  JSX,
} from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AccordionThemes } from "./presets";
import type {
  IAccordionContentProps,
  IAccordionContext,
  IAccordionItemProps,
  IAccordionProps,
  IAccordionTriggerProps,
  TAccordionIcons,
} from "./types";

interface IAccordionItemContext {
  icon: TAccordionIcons;
  isOpen: boolean;
  value: string;
}

interface IAccordionIconProps {
  isOpen: boolean;
}

interface IAccordionComponent
  extends FC<IAccordionProps>,
    FunctionComponent<IAccordionProps> {
  Content: FC<IAccordionContentProps>;
  Item: FC<IAccordionItemProps>;
  Trigger: FC<IAccordionTriggerProps>;
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const AccordionContext = createContext<IAccordionContext | null>(null);
const AccordionItemContext = createContext<IAccordionItemContext | null>(null);

const useAccordionContext = (): IAccordionContext => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("Accordion components must be used within Accordion");
  return context;
};

const useAccordionItemContext = (): IAccordionItemContext => {
  const context = useContext(AccordionItemContext);
  if (!context) throw new Error("Trigger and Content must be within Item");
  return context;
};

const ChevronIcon: FC<IAccordionIconProps> &
  FunctionComponent<IAccordionIconProps> = ({
  isOpen,
}: IAccordionIconProps & ComponentProps<typeof ChevronIcon>):
  | (ReactNode & ReactElement & JSX.Element)
  | null => {
  const { theme } = useAccordionContext();
  const rotation = useSharedValue<number>(0);

  useEffect(() => {
    rotation.value = withTiming<number>(isOpen ? 1 : 0, { duration: 200 });
  }, [isOpen, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${interpolate(rotation.value, [0, 1], [0, 180])}deg` },
    ],
  }));

  return (
    <>
      <Animated.View style={animatedStyle}>
        <Ionicons name="chevron-down" size={20} color={theme.iconColor} />
      </Animated.View>
    </>
  );
};

const CrossIcon: FC<IAccordionIconProps> &
  FunctionComponent<IAccordionIconProps> = ({
  isOpen,
}: IAccordionIconProps & ComponentProps<typeof CrossIcon>):
  | (ReactNode & ReactElement & JSX.Element)
  | null => {
  const { theme } = useAccordionContext();
  const topLineTranslate = useSharedValue(0);
  const bottomLineTranslate = useSharedValue(0);
  const middleLineOpacity = useSharedValue(1);

  useEffect(() => {
    if (isOpen) {
      topLineTranslate.value = withTiming(6, { duration: 200 });
      bottomLineTranslate.value = withTiming(-6, { duration: 200 });
      middleLineOpacity.value = withTiming(0, { duration: 200 });
    } else {
      topLineTranslate.value = withTiming(0, { duration: 200 });
      bottomLineTranslate.value = withTiming(0, { duration: 200 });
      middleLineOpacity.value = withTiming(1, { duration: 200 });
    }
  }, [bottomLineTranslate, isOpen, middleLineOpacity, topLineTranslate]);

  const topLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: topLineTranslate.value }],
  }));

  const middleLineStyle = useAnimatedStyle(() => ({
    opacity: middleLineOpacity.value,
  }));

  const bottomLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bottomLineTranslate.value }],
  }));

  return (
    <View
      style={{
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          {
            width: 16,
            height: 2,
            backgroundColor: theme.iconColor,
            borderRadius: 1,
            marginBottom: 4,
          },
          topLineStyle,
        ]}
      />
      <Animated.View
        style={[
          {
            width: 16,
            height: 2,
            backgroundColor: theme.iconColor,
            borderRadius: 1,
            marginBottom: 4,
          },
          middleLineStyle,
        ]}
      />
      <Animated.View
        style={[
          {
            width: 16,
            height: 2,
            backgroundColor: theme.iconColor,
            borderRadius: 1,
          },
          bottomLineStyle,
        ]}
      />
    </View>
  );
};

const AccordionRoot: FC<IAccordionProps> & FunctionComponent<IAccordionProps> = ({
  children,
  type = "single",
  theme = AccordionThemes.light,
  spacing = 0,
}: IAccordionProps & ComponentProps<typeof AccordionRoot>):
  | (ReactNode & ReactElement & JSX.Element)
  | null => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string): void => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (type === "single") {
        if (newSet.has(id)) {
          newSet.clear();
        } else {
          newSet.clear();
          newSet.add(id);
        }
      } else {
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
      }
      return newSet;
    });
  };

  const childrenArray = React.Children.toArray(children);
  const childrenWithProps: ReactNode[] = childrenArray.map((child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(
        child as ReactElement<Partial<IAccordionItemProps>>,
        {
          isLast: index === childrenArray.length - 1,
        },
      );
    }
    return child;
  });

  return (
    <AccordionContext.Provider
      value={{ openItems, toggleItem, theme, spacing }}
    >
      <View
        style={[
          styles.accordion,
          {
            backgroundColor: theme.backgroundColor,
            borderColor: theme.borderColor,
          },
        ]}
      >
        {childrenWithProps}
      </View>
    </AccordionContext.Provider>
  );
};

const AccordionItem: FC<IAccordionItemProps> &
  FunctionComponent<IAccordionItemProps> = ({
  children,
  value,
  pop = false,
  icon = "chevron",
  popScale = 1.02,
  isLast = false,
}: IAccordionItemProps & ComponentProps<typeof AccordionItem>):
  | (ReactNode & ReactElement & JSX.Element)
  | null => {
  const { openItems, theme, spacing } = useAccordionContext();
  const isOpen = openItems.has(value);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (pop) {
      scale.value = withTiming(isOpen ? popScale : 1, { duration: 200 });
    }
  }, [isOpen, pop, popScale, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, icon }}>
      <Animated.View
        style={[
          styles.item,
          {
            borderBottomColor: theme.borderColor,
            borderBottomWidth: isLast ? 0 : 1,
            marginBottom: spacing,
          },
          pop && animatedStyle,
        ]}
      >
        {children}
      </Animated.View>
    </AccordionItemContext.Provider>
  );
};

const AccordionTrigger: FC<IAccordionTriggerProps> &
  FunctionComponent<IAccordionTriggerProps> = ({
  children,
}: IAccordionTriggerProps & ComponentProps<typeof AccordionTrigger>):
  | (ReactNode & ReactElement & JSX.Element)
  | null => {
  const { toggleItem } = useAccordionContext();
  const { value, isOpen, icon } = useAccordionItemContext();
  const blurIntensity = useSharedValue(40);

  useEffect(() => {
    blurIntensity.value = withTiming(isOpen ? 20 : 40, {
      duration: 100,
    });
  }, [blurIntensity, isOpen]);

  return (
    <Pressable
      style={styles.trigger}
      onPress={() => {
        toggleItem(value);
      }}
    >
      <View style={styles.triggerContent}>
        {children}
        {icon === "chevron" ? (
          <ChevronIcon isOpen={isOpen} />
        ) : (
          <CrossIcon isOpen={isOpen} />
        )}
      </View>
    </Pressable>
  );
};

const AccordionContent: FC<IAccordionContentProps> &
  FunctionComponent<IAccordionContentProps> = ({
  children,
}: IAccordionContentProps & ComponentProps<typeof AccordionContent>):
  | (ReactNode & ReactElement & JSX.Element)
  | null => {
  const { isOpen } = useAccordionItemContext();
  const { theme } = useAccordionContext();
  const height = useSharedValue<number>(0);
  const opacity = useSharedValue<number>(0);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [measured, setMeasured] = useState<boolean>(false);
  const blurIntensity = useSharedValue<number>(40);

  const onLayout = (event: LayoutChangeEvent): void => {
    const h = event.nativeEvent.layout.height;
    if (h > 0 && !measured) {
      setContentHeight(h);
      setMeasured(true);
    }
  };

  useEffect(() => {
    if (measured) {
      if (isOpen) {
        height.value = withTiming(contentHeight, { duration: 200 });
        opacity.value = withTiming(1, { duration: 200 });
      } else {
        height.value = withTiming(0, { duration: 200 });
        opacity.value = withTiming(0, { duration: 200 });
      }
    }
  }, [contentHeight, height, isOpen, measured, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: measured ? opacity.value : 0,
    overflow: "hidden",
  }));

  useEffect(() => {
    blurIntensity.value = withTiming(isOpen ? 0 : 20, {
      duration: 200,
    });
  }, [blurIntensity, isOpen]);

  const animatedBlurProps = useAnimatedProps(() => ({
    intensity: blurIntensity.value,
  }));

  const animatedAndroidBlurStylez = useAnimatedStyle(() => ({
    filter: [
      {
        blur: interpolate(blurIntensity.value, [0, 40], [0, 20]),
      },
    ],
  }));

  return (
    <>
      {!measured && (
        <View onLayout={onLayout} style={styles.measuringContainer}>
          <View style={styles.content}>{children}</View>
        </View>
      )}
      <Animated.View style={animatedStyle}>
        <View style={styles.contentWrapper}>
          <Animated.View
            style={[
              styles.content,
              Platform.OS === "android" && animatedAndroidBlurStylez,
            ]}
          >
            {children}
          </Animated.View>
          {Platform.OS === "ios" && (
            <AnimatedBlurView
              tint={
                theme.backgroundColor === "#18181b" ||
                theme.backgroundColor === "#0c4a6e" ||
                theme.backgroundColor === "#7c2d12"
                  ? "dark"
                  : "systemUltraThinMaterialDark"
              }
              animatedProps={animatedBlurProps}
              style={[
                {
                  overflow: "hidden",
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                },
              ]}
            />
          )}
        </View>
      </Animated.View>
    </>
  );
};

const Accordion = AccordionRoot as IAccordionComponent;
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

const styles = StyleSheet.create({
  accordion: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
  },
  item: {
    overflow: "hidden",
  },
  trigger: {
    position: "relative",
    overflow: "hidden",
  },
  triggerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  triggerText: {
    fontSize: 15,
    fontWeight: "500",
    flex: 1,
    zIndex: 1,
  },
  measuringContainer: {
    position: "absolute",
    opacity: 0,
    left: 0,
    right: 0,
  },
  contentWrapper: {
    position: "absolute",
    width: "100%",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 16,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export {
  AccordionThemes,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
};
