import { AnimatedTabBar } from "@/components/animated-tab-bar";
import { TabIcon } from "@/components/tab-icon";
import { ExamplePopupBody } from "@/motion-tabs/examples/example-popup-body";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import type {
  FC,
  FunctionComponent,
  JSX,
  ReactElement,
  ReactNode,
} from "react";
import { Platform } from "react-native";

const TabsLayout: FC & FunctionComponent = ():
  | (ReactNode & ReactElement & JSX.Element)
  | null => {
  return (
    <Tabs
      detachInactiveScreens={Platform.OS !== "ios"}
      screenOptions={{
        animation: "shift",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          height: 0,
          position: "absolute",
        },
      }}
      tabBar={(props: BottomTabBarProps): ReactElement => (
        <AnimatedTabBar {...props} renderPopupBody={ExamplePopupBody} />
      )}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon color={color} name="home" size={size} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon color={color} name="search" size={size} />
          ),
          tabBarLabel: "Search",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon color={color} name="profile" size={size} />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
