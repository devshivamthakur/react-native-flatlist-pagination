import React from 'react';
import { FlatListProps } from 'react-native';
export interface PaginatedFlatListProps<T> extends Omit<FlatListProps<T>, 'data'> {
    data: T[];
    isPagination?: boolean;
    perPage?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    fetchMoreData?: () => Promise<void> | void;
    isAnimated?: boolean;
}
declare const PaginatedFlatList: <T>({ data, isPagination, perPage, currentPage, onPageChange, fetchMoreData, isAnimated, ...FlatListProps }: PaginatedFlatListProps<T>) => React.JSX.Element;
export default PaginatedFlatList;
