import { Podcast } from "@/constants/dummy/home/podcasts";
import { SfProFont, useSfProFont } from "@/hooks/useSfProFont";
import { Image } from "expo-image";
import React, { memo } from "react";
import {
  FlatList,
  type ListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BackgroundPill from "./progress-indicator+background-pill";

interface IPodcastHorizontalList {
  data: Podcast[];
}

const ITEM_WIDTH = 200;
const SPACING = 16;
const SNAP_INTERVAL = ITEM_WIDTH + SPACING;

const PodcastHorizontalList: React.FC<IPodcastHorizontalList> =
  memo<IPodcastHorizontalList>(({ data }: IPodcastHorizontalList) => {
    const { loaded } = useSfProFont();
    const renderItem: ListRenderItem<Podcast> = ({ item }) => {
      return (
        <>
          <View
            style={[
              styles.itemContainer,
              {
                backgroundColor: item.backgroundColor,
              },
            ]}
          >
            <View style={styles.imageContentContainer}>
              <Image
                source={{
                  uri: item.artwork,
                }}
                style={styles.artwork}
              />
            </View>

            <View style={styles.contentContainer}>
              <Text
                style={[
                  styles.title,
                  { fontFamily: loaded ? SfProFont.bold : undefined },
                ]}
              >
                {item.title}
              </Text>

              <Text
                style={[
                  styles.subtitle,
                  { fontFamily: loaded ? SfProFont.medium : undefined },
                ]}
              >
                {item.author}
              </Text>
            </View>
            <View style={styles.pillContainer}>
              <BackgroundPill
                progress={item.progress}
                timeLeft={item.timeLeft}
              />
            </View>
          </View>
        </>
      );
    };

    return (
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        snapToAlignment="start"
        snapToInterval={SNAP_INTERVAL}
        contentContainerStyle={{
          paddingHorizontal: SPACING,
        }}
      />
    );
  });

export default PodcastHorizontalList;

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    borderRadius: 18,
    marginRight: SPACING,
    height: 290,
    overflow: "hidden",
  },
  imageContentContainer: {
    alignItems: "center",
    paddingTop: 16,
  },
  artwork: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  contentContainer: {
    padding: 12,
    gap: 4,
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
    marginTop: 8,
    color: "#000",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 18,
    color: "#8b8b8b",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  pillContainer: {
    paddingHorizontal: 8,
  },
});
