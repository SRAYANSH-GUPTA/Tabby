import { chunkArray } from "@/utils/chunk-array";
import React from "react";
import {
  FlatList,
  useWindowDimensions,
  View,
  type ViewStyle,
} from "react-native";

interface DisplayListProps<T> {
  array?: T[];
  chunkSize?: number;
  renderItem?: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  contentContainerStyle?: ViewStyle;
  peekWidth?: number;
  pageGap?: number;
}

const DisplayList = <T,>({
  array,
  renderItem,
  peekWidth = 12,
  pageGap = 90,
  ...props
}: DisplayListProps<T>) => {
  const { width } = useWindowDimensions();
  const chunkedArray = chunkArray(array!, props.chunkSize || 2);
  const pageWidth = width - (peekWidth + pageGap) * 2;
  const snapInterval = pageWidth + pageGap;

  return (
    <FlatList
      data={chunkedArray}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={true}
      decelerationRate="fast"
      snapToInterval={snapInterval}
      snapToAlignment="start"
      contentContainerStyle={{ paddingHorizontal: peekWidth }}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item: nested, index: pageIndex }) => {
        return (
          <View
            style={{
              width: pageWidth,
              marginRight: pageIndex === chunkedArray.length - 1 ? 0 : pageGap,
            }}
          >
            <FlatList
              data={nested}
              contentContainerStyle={props.contentContainerStyle}
              scrollEnabled={false}
              keyExtractor={props.keyExtractor}
              renderItem={({ item, index }) => <>{renderItem!(item, index)}</>}
            />
          </View>
        );
      }}
    />
  );
};
export default DisplayList;
