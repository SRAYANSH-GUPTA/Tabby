# Tabby

Animated tabs with a little more room.

Tabby is an Expo Router demo built around a floating tab bar that expands into a panel. Move between Home, Search, and Profile while the dock reshapes around each tab's content. The repository includes the tab bar implementation, custom popup examples, and a podcast-themed interface to explore it in.

## Preview

https://github.com/user-attachments/assets/bbc24508-5048-4f91-9c4f-a953ca59d3ff

The video shows the iOS interface. An Android preview has not been recorded.

## How it feels

- Tap a tab to navigate and open its panel.
- Tap the same tab again, or tap outside the dock, to close the panel.
- Switch tabs with a panel open to see the content slide and the dock resize.
- Popup content is measured so the panel can adapt to different layouts.
- The dock uses system-aware light and dark palettes, safe-area spacing, and an Android surface background alongside its glass view.

## Run locally

Install dependencies from the repository folder:

```sh
npm install
npx expo start --clear
```

Open the project with an Expo Go version that supports **SDK 55**, or with a compatible development build. Expo Go for SDK 58 cannot open this SDK 55 project.

On Android, download the matching app from the [Expo Go SDK 55 installation page](https://expo.dev/go?sdkVersion=55&platform=android&device=true), then scan the terminal's QR code.

If you use Bun, run `bun install` and `bun start` instead of the npm commands above.

| Command | Purpose |
| --- | --- |
| `npm start` | Start the Expo development server |
| `npm run android` | Start Expo and open Android |
| `npm run ios` | Start Expo and open the iOS simulator on macOS |
| `npm run web` | Start the web target |
| `npm run lint` | Run Expo's ESLint checks |
| `npx expo install --check` | Check SDK dependency compatibility |

## Use the tab bar

The implementation lives in `src/motion-tabs`. It is source code within this project, not a separately published package.

Pass `AnimatedTabBar` to Expo Router's `Tabs` and supply a popup renderer. This example uses the project's existing routes, icons, and popup bodies:

```tsx
import { Tabs } from "expo-router";
import { TabIcon } from "@/components/tab-icon";
import { AnimatedTabBar } from "@/motion-tabs";
import { ExamplePopupBody } from "@/motion-tabs/examples/example-popup-body";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarStyle: { height: 0 } }}
      tabBar={(props) => (
        <AnimatedTabBar {...props} renderPopupBody={ExamplePopupBody} />
      )}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen name="search" options={{ tabBarLabel: "Search" }} />
      <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile" }} />
    </Tabs>
  );
}
```

The root layout already provides `GestureHandlerRootView` and `SafeAreaProvider`. Keep these providers when adapting the demo.

## Make it yours

`renderPopupBody` receives `route`, `view`, and `colors`. Use `route.name` to choose content; `view` is the panel's internal identifier.

```tsx
import { Text, View } from "react-native";
import type { IPopupRenderContext } from "@/motion-tabs";

export function CustomPopupBody({ route, colors }: IPopupRenderContext) {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ color: colors.foreground }}>
        {route.name === "search" ? "Find your next favorite." : "Welcome to Tabby."}
      </Text>
    </View>
  );
}
```

Pass it as `renderPopupBody={CustomPopupBody}` to replace the example panels.

| Change | Start here |
| --- | --- |
| Tabs, labels, and icons | `src/app/(tabs)/_layout.tsx` |
| Home, Search, and Profile panels | `src/motion-tabs/examples/` |
| Light and dark colors | `src/motion-tabs/utils/palette.ts` |
| Animation timing and easing | `src/motion-tabs/utils/constants.ts` |
| Dock layout and appearance | `src/motion-tabs/utils/layout-styles.ts` |
| Demo podcast content | `src/constants/dummy/home/podcasts.ts` |

## Built with

Tabby currently uses Expo SDK 55, React Native 0.83, React 19.2, Expo Router, Reanimated 4, and Gesture Handler 2. TypeScript is used throughout the implementation.

```text
src/
├── app/                  Routes and screen layouts
├── components/           Shared demo UI
├── constants/dummy/      Sample content
├── hooks/                Font helpers
├── motion-tabs/          Tab bar, panels, animation hooks, and types
└── reacticx-components/  Accordion used by the demo
```

## Troubleshooting

**Expo Go reports an SDK mismatch:** use a client compatible with SDK 55. To move to another SDK, upgrade the dependency set together; changing only the `expo` version can break React Native imports.

**Metro keeps showing an old error:** stop the server with `Ctrl+C`, run `npx expo start --clear`, and reopen the project.

**Dependencies seem out of sync:** run `npx expo install --check`. Review any suggested changes before upgrading packages.
