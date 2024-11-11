import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FlatList, View, ActivityIndicator, Animated, FlatListProps, ListRenderItemInfo } from 'react-native';

export interface PaginatedFlatListProps<T> extends Omit<FlatListProps<T>, 'data'> {
  data: T[];
  isPagination?: boolean;
  perPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  fetchMoreData?: () => Promise<void> | void;
  isAnimated?: boolean;
}

const PaginatedFlatList = <T,>({
  data,
  isPagination = true,
  perPage = 10,
  currentPage = 1,
  onPageChange,
  fetchMoreData,
  isAnimated = false,
  ...FlatListProps
}: PaginatedFlatListProps<T>) => {
  const [page, setPage] = useState(currentPage);
  const [isLoading, setIsLoading] = useState(false);

  // Memoize the sliced data to avoid recalculating unless data or page changes
  const displayData = useMemo(() => data.slice(0, page * perPage), [data, page, perPage]);

  const loadMore = useCallback(async () => {
    if (isLoading || page * perPage >= data.length) return;
    setIsLoading(true);
    if (fetchMoreData) await fetchMoreData();
    setIsLoading(false);
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      onPageChange?.(newPage);
      return newPage;
    });
  }, [isLoading, page, perPage, data.length, fetchMoreData, onPageChange]);

  // Memoize the animated render function
  const renderAnimatedItem = useMemo(
    () => ({ item, index, separators }: ListRenderItemInfo<T>) => {
      if (!FlatListProps.renderItem) return null;

      // Empty functions to satisfy separator requirements
      const separatorsImplementation = {
        highlight: () => {},
        unhighlight: () => {},
        updateProps: (select: "leading" | "trailing", newProps: any) => {},
      };

      const fadeAnim = new Animated.Value(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      return (
        <Animated.View style={{ opacity: isAnimated ? fadeAnim : 1 }}>
          {FlatListProps.renderItem({ item, index, separators: separatorsImplementation })}
        </Animated.View>
      );
    },
    [isAnimated, FlatListProps.renderItem]
  );

  return (
    <FlatList
      {...FlatListProps}
      data={displayData}
      renderItem={isAnimated ? renderAnimatedItem : FlatListProps.renderItem}
      onEndReached={isPagination ? loadMore : undefined}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
    />
  );
};

export default PaginatedFlatList;
