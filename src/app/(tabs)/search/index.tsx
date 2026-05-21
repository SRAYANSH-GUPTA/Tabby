import Label from "@/components/label";
import VerticalSearchPodcastList from "@/components/vertical-search-podcast-list";
import {
  DISCOVER_PODCASTS,
  SEARCH_PODCAST,
} from "@/constants/dummy/home/podcasts";
import { SfProFont, useSfProFont } from "@/hooks/useSfProFont";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import type {
  FC,
  FunctionComponent,
  JSX,
  ReactElement,
  ReactNode,
} from "react";
import React, { Fragment } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const isIOS = Platform.OS === "ios";

const GENRES = [
  { key: "fiction", label: "Fiction", color: "#E8D9C4" },
  { key: "self-help", label: "Self-help", color: "#F9EC9E" },
  { key: "business", label: "Business", color: "#C8E0D2" },
  { key: "history", label: "History", color: "#E3C9C9" },
  { key: "biography", label: "Biography", color: "#D4D0E8" },
  { key: "scifi", label: "Sci-fi", color: "#C9D7E8" },
];

const TRENDING = DISCOVER_PODCASTS.slice(0, 5);

const SearchScreen: FC & FunctionComponent = ():
  | (ReactNode & ReactElement & JSX.Element)
  | null => {
  const { loaded } = useSfProFont();
  const fontMedium = loaded ? SfProFont.medium : undefined;
  const fontBold = loaded ? SfProFont.bold : undefined;

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerShown: true,
          headerLargeTitleEnabled: true,
          title: "Search",
          headerSearchBarOptions: {
            placeholder: "Audiobooks, authors, narrators…",
            placement: "stacked",
          },
          headerLargeTitleStyle: {
            fontFamily: fontBold,
          },
          headerTitleStyle: {
            fontFamily: fontMedium,
          },
          unstable_headerRightItems: () => [
            {
              type: "button",
              icon: {
                name: "line.3.horizontal.decrease",
                type: "sfSymbol",
              },
              label: "Filter",
              onPress: () => {},
            },
            {
              type: "button",
              icon: {
                name: "info.circle",
                type: "sfSymbol",
              },
              label: "Info",
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
        {!isIOS && (
          <View style={styles.searchFieldWrap}>
            <View style={styles.searchField}>
              {isIOS ?
                <SymbolView
                  name="magnifyingglass"
                  size={16}
                  tintColor="#9a9a9a"
                />
              : <Ionicons name="search" size={16} color="#9a9a9a" />}
              <Text
                style={[styles.searchPlaceholder, { fontFamily: fontMedium }]}
              >
                Audiobooks, authors, narrators…
              </Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Label style={styles.sectionLabel}>
            <Label.Title style={{ fontFamily: fontBold, letterSpacing: -0.5 }}>
              You might like it
            </Label.Title>
          </Label>

          <VerticalSearchPodcastList podcasts={SEARCH_PODCAST} />
        </View>

        <View style={styles.section}>
          <Label style={styles.sectionLabel}>
            <Label.Title style={{ fontFamily: fontBold }}>
              Trending now
            </Label.Title>
            <Label.Subtitle style={{ fontFamily: fontMedium }}>
              Most listened this week
            </Label.Subtitle>
          </Label>

          <View style={styles.trendingList}>
            {TRENDING.map((item, idx) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.trendingRow,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <Text style={[styles.rank, { fontFamily: fontBold }]}>
                  {String(idx + 1).padStart(2, "0")}
                </Text>
                <Image
                  source={{ uri: item.artwork }}
                  style={styles.trendingArt}
                />
                <View style={styles.trendingMeta}>
                  <Text
                    numberOfLines={1}
                    style={[styles.trendingTitle, { fontFamily: fontMedium }]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[styles.trendingAuthor, { fontFamily: fontMedium }]}
                  >
                    {item.author}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchFieldWrap: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  searchField: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchPlaceholder: {
    color: "#9a9a9a",
    fontSize: 15,
  },
  section: {
    marginTop: 28,
  },
  sectionLabel: {
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  genreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 10,
  },
  genreTile: {
    flexBasis: "47.5%",
    flexGrow: 1,
    height: 78,
    borderRadius: 14,
    paddingHorizontal: 14,
    justifyContent: "flex-end",
    paddingBottom: 12,
  },
  genreText: {
    fontSize: 16,
    color: "#111",
  },
  trendingList: {
    paddingHorizontal: 16,
    gap: 4,
  },
  trendingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 8,
  },
  rank: {
    width: 26,
    fontSize: 15,
    color: "#666",
  },
  trendingArt: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  trendingMeta: {
    flex: 1,
    minWidth: 0,
  },
  trendingTitle: {
    fontSize: 15,
    color: "#fff",
  },
  trendingAuthor: {
    fontSize: 13,
    color: "#8b8b8b",
    marginTop: 2,
  },
});
