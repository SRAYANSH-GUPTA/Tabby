import { DiscoverPodcast } from "@/constants/dummy/home/podcasts";
import { SfProFont, useSfProFont } from "@/hooks/useSfProFont";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const IMAGE_SIZE = 60;

const DisplayListItem: React.FC<Include<DiscoverPodcast, "index", number>> = ({
  title,
  author,
  artwork,
  id,
  index,
}: Include<DiscoverPodcast, "index", number>) => {
  const { width } = useWindowDimensions();
  const { loaded } = useSfProFont();
  return (
    <View style={[styles.container, {}]}>
      <Image
        source={{ uri: artwork }}
        cachePolicy={"memory-disk"}
        style={styles.image}
      />
      <View style={[styles.column]}>
        <Text
          numberOfLines={2}
          style={[
            styles.text,
            {
              fontFamily: loaded ? SfProFont.medium : undefined,
            },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              fontFamily: loaded ? SfProFont.medium : undefined,
            },
          ]}
        >
          {author}
        </Text>
      </View>
    </View>
  );
};

export { DisplayListItem };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 5,
  },
  column: {
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    marginLeft: 12,
    color: "#fff",
    maxWidth: 190,
  },
  subtitle: {
    fontSize: 14,
    marginLeft: 12,
    color: "#fff",
    opacity: 0.6,
  },
});
