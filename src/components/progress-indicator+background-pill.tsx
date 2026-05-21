import { Podcast } from "@/constants/dummy/home/podcasts";
import { SfProFont, useSfProFont } from "@/hooks/useSfProFont";
import { Ionicons } from "@expo/vector-icons";
import { SymbolView } from "expo-symbols";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const isIOS = Platform.OS === "ios";

interface IconProps {
  sfSymbol: React.ComponentProps<typeof SymbolView>["name"];
  ionicon: React.ComponentProps<typeof Ionicons>["name"];
  size: number;
  color: string;
}

const Icon: React.FC<IconProps> = ({ sfSymbol, ionicon, size, color }) => {
  if (isIOS) {
    return (
      <SymbolView
        name={sfSymbol}
        size={size}
        tintColor={color}
        resizeMode="scaleAspectFit"
      />
    );
  }
  return <Ionicons name={ionicon} size={size} color={color} />;
};

const PROGRESS_TRACK_WIDTH = 50;

const BackgroundPill: React.FC<Pick<Podcast, "progress" | "timeLeft">> = ({
  progress,
  timeLeft,
}) => {
  const { loaded } = useSfProFont();
  const clamped = Math.max(0, Math.min(1, progress));
  const fontFamily = loaded ? SfProFont.medium : undefined;

  return (
    <View style={styles.row}>
      <View style={styles.pill}>
        <Icon sfSymbol="play.fill" ionicon="play" size={16} color="#111" />
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: PROGRESS_TRACK_WIDTH * clamped },
            ]}
          />
        </View>
        <Text style={[styles.timeText, { fontFamily }]}>{timeLeft}</Text>
      </View>

      <View style={styles.dotsPill}>
        <Icon
          sfSymbol="ellipsis"
          ionicon="ellipsis-horizontal"
          size={22}
          color="#9a9a9a"
        />
      </View>
    </View>
  );
};

export default BackgroundPill;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    gap: 8,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 8,
  },
  progressTrack: {
    width: PROGRESS_TRACK_WIDTH,
    height: 6,
    backgroundColor: "#cfcfcf",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#111",
    borderRadius: 999,
  },
  timeText: {
    fontSize: 12,
    color: "#3a3a3a",
  },
  dotsPill: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    paddingHorizontal: 5,
  },
});
