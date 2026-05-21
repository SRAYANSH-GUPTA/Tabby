import { DisplayListItem } from "@/components/display-list-item";
import Label from "@/components/label";
import DisplayList from "@/components/media-list";
import PodcastHorizontalList from "@/components/podcast-horizontal-list";
import {
  DISCOVER_PODCASTS,
  HEADING_PODCASTS,
} from "@/constants/dummy/home/podcasts";
import { SfProFont, useSfProFont } from "@/hooks/useSfProFont";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import type {
  FC,
  FunctionComponent,
  JSX,
  ReactElement,
  ReactNode,
} from "react";
import React, { Fragment } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen: FC & FunctionComponent = ():
  | (ReactNode & ReactElement & JSX.Element)
  | null => {
  const insets = useSafeAreaInsets();

  const { loaded } = useSfProFont();
  const fontMedium = loaded ? SfProFont.medium : undefined;
  const fontBold = loaded ? SfProFont.bold : undefined;
  const fontRegular = loaded ? SfProFont.regular : undefined;
  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerShown: true,
          headerLargeTitleEnabled: true,
          title: "Home",
          headerLargeTitleStyle: {
            fontFamily: fontBold,
          },
          headerTitleStyle: {
            fontFamily: fontMedium,
          },
          unstable_headerRightItems: (props) => [
            {
              element: (
                <>
                  <Image
                    source={{
                      uri: "https://pbs.twimg.com/profile_images/2018442567407583232/LCIqE-R__400x400.jpg",
                    }}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 9999,
                    }}
                  />
                </>
              ),

              onPress: () => {},
              type: "custom",
            },
            {
              type: "button",
              icon: {
                name: "plus",
                type: "sfSymbol",
              },
              label: "Search",

              onPress: () => {},
            },
          ],
        }}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
        contentInsetAdjustmentBehavior="always"
        showsVerticalScrollIndicator={Boolean(false)}
      >
        <View style={[styles.container, {}]}>
          <View style={styles.podcastListContainer}>
            <Label
              style={{ paddingHorizontal: 16, marginBottom: 18 }}
              size="lg"
            >
              <Label.Title>Upcoming Next</Label.Title>
            </Label>

            <PodcastHorizontalList data={HEADING_PODCASTS} />
          </View>

          <View style={styles.podcastDiscoverContainer}>
            <Label style={{ paddingHorizontal: 16, marginBottom: 18 }}>
              <Label.Title>Discover</Label.Title>
              <Label.Subtitle>Based on your listening history</Label.Subtitle>
            </Label>

            <DisplayList
              array={DISCOVER_PODCASTS}
              chunkSize={3}
              keyExtractor={(_, idx) => idx.toString()}
              renderItem={(item, index) => (
                <DisplayListItem {...item} index={index} />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  title: { fontSize: 28, fontWeight: "600", marginBottom: 8, color: "#fff" },
  body: { fontSize: 15, opacity: 0.6, color: "#fff" },
  podcastListContainer: {
    marginTop: 16,
  },
  podcastDiscoverContainer: {
    marginTop: 32,
  },
});
