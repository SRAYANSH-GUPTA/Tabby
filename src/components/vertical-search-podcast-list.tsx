import { SearchPodcast } from "@/constants/dummy/home/podcasts";
import { SfProFont, useSfProFont } from "@/hooks/useSfProFont";
import { Image } from "expo-image";
import React from "react";
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface VerticalSearchPodcastListProps {
  podcasts: SearchPodcast[];
}

const H_PADDING = 16;
const COL_GAP = 12;
const COLUMNS = 2;
const ITEM_WIDTH =
  (Dimensions.get("window").width - H_PADDING * 2 - COL_GAP * (COLUMNS - 1)) /
  COLUMNS;
const ITEM_HEIGHT = ITEM_WIDTH * 1.45;

const VerticalSearchPodcastList: React.FC<VerticalSearchPodcastListProps> = ({
  podcasts,
}: VerticalSearchPodcastListProps) => {
  const { loaded } = useSfProFont();
  const fontMedium = loaded ? SfProFont.medium : undefined;
  const fontBold = loaded ? SfProFont.bold : undefined;

  const renderItem: ListRenderItem<SearchPodcast> = ({ item, index }) => {
    const isRightCol = index % COLUMNS === COLUMNS - 1;
    return (
      <View
        style={[
          styles.container,
          { width: ITEM_WIDTH, marginRight: isRightCol ? 0 : COL_GAP },
        ]}
      >
        <View style={styles.posterWrap}>
          <Image
            cachePolicy={"memory-disk"}
            source={{ uri: item.artwork }}
            style={styles.image}
          />
        </View>
        <Text
          numberOfLines={1}
          style={[styles.title, { fontFamily: fontMedium }]}
        >
          {item.title}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.author, { fontFamily: fontMedium }]}
        >
          {item.author}
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      scrollEnabled={false}
      data={podcasts}
      keyExtractor={(_, idx) => idx.toString()}
      numColumns={COLUMNS}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  );
};

export default VerticalSearchPodcastList;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: H_PADDING,
  },
  container: {
    marginBottom: 18,
  },
  posterWrap: {
    position: "relative",
    width: "100%",
    height: ITEM_HEIGHT,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#1c1c1e",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  ratingBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#ff6257",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  ratingText: {
    color: "#fff",
    fontSize: 12,
    letterSpacing: -0.2,
  },
  title: {
    marginTop: 8,
    fontSize: 15,
    color: "#fff",
    letterSpacing: -0.2,
  },
  author: {
    marginTop: 2,
    fontSize: 13,
    color: "#8b8b8b",
  },
});
