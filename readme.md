# React Native Paginated FlatList

A customizable and optimized paginated FlatList component for React Native, designed to handle large lists efficiently with infinite scrolling and optional animation.

## Features

- **Pagination**: Automatically handles pagination with configurable page size and current page.
- **Infinite Scroll**: Loads more data as you scroll to the end of the list.
- **Customizable**: Customize the `renderItem`, `keyExtractor`, and `fetchMoreData` functions.
- **Animation**: Optional fade-in animation for list items on load.
- **Typescript Support**: Fully typed for better development experience.

## Installation

To install the package, run the following command:

```bash
npm install react-native-paginated-flatlist

```

or if you're using Yarn:

```bash
yarn add react-native-paginated-flatlist
```

## Usage

### Basic Example

```tsx
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PaginatedFlatList } from 'react-native-paginated-flatlist';

const App = () => {
  const [data, setData] = useState<number[]>(Array.from({ length: 50 }, (_, i) => i + 1));

  const fetchMoreData = useCallback(() => {
    // Simulate fetching more data
    setTimeout(() => {
      setData(prevData => [...prevData, ...Array.from({ length: 50 }, (_, i) => i + prevData.length + 1)]);
    }, 1000);
  }, []);

  const renderItem = useCallback(({ item }: { item: number }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item}</Text>
    </View>
  ), []);

  return (
    <PaginatedFlatList
      data={data}
      isPagination={true}
      perPage={10}
      fetchMoreData={fetchMoreData}
      renderItem={renderItem}
      keyExtractor={(item) => item.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    fontSize: 18,
  },
});

export default App;
```

### Properties

| Prop              | Type                                      | Description                                                                                                                                                  |
|-------------------|-------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data`            | `Array<T>`                                 | The data array to be displayed in the list.                                                                                                                   |
| `isPagination`    | `boolean`                                  | Enables pagination when set to `true`. Default is `true`.                                                                                                    |
| `perPage`         | `number`                                   | The number of items to display per page. Default is `10`.                                                                                                    |
| `currentPage`     | `number`                                   | The current page to display. Default is `1`.                                                                                                                 |
| `fetchMoreData`   | `function` (optional)                     | A function to fetch more data when the end of the list is reached.                                                                                           |
| `renderItem`      | `function` (required)                     | A function to render each item in the list.                                                                                                                   |
| `keyExtractor`    | `function` (required)                     | A function to extract a unique key for each item in the list.                                                                                               |
| `isAnimated`      | `boolean` (optional)                      | When `true`, the list items will fade in with animation. Default is `false`.                                                                                 |
| `onPageChange`    | `function` (optional)                     | A callback function that is invoked whenever the current page changes.                                                                                       |

### Pagination Behavior

- By default, the component will only show `perPage` items on the screen and load more as you scroll down.
- Once the end of the list is reached, the `fetchMoreData` function will be triggered to load more items.
- The `currentPage` will update accordingly, and the `onPageChange` callback (if provided) will notify the parent component.

### Customizing List Items

You can pass a custom `renderItem` function to customize the appearance of each list item. Make sure to pass a `keyExtractor` for performance optimization.

Example:

```tsx
const renderItem = useCallback(({ item }: { item: number }) => (
  <View style={styles.item}>
    <Text style={styles.text}>{item}</Text>
  </View>
), []);
```

### Handling Data Fetching

You can provide a `fetchMoreData` function to load more data when the user reaches the end of the list. This function can return a promise or be a synchronous function.

Example:

```tsx
const fetchMoreData = useCallback(() => {
  setTimeout(() => {
    setData(prevData => [...prevData, ...Array.from({ length: 50 }, (_, i) => i + prevData.length + 1)]);
  }, 1000);
}, []);
```

## Optional Fade-in Animation

To add a fade-in animation when the items are rendered, set the `isAnimated` prop to `true`.

Example:

```tsx
<PaginatedFlatList
  data={data}
  isPagination={true}
  perPage={10}
  fetchMoreData={fetchMoreData}
  renderItem={renderItem}
  keyExtractor={(item) => item.toString()}
  isAnimated={true}
/>
```

This will trigger a fade-in effect when the list items are first rendered.

## Contributing

We welcome contributions to this package. If you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

MIT © [Your Name]
```


### Explanation of Sections:

- **Features**: A short overview of the features of your component.
- **Installation**: Instructions for installing the package via npm or yarn.
- **Usage**: Code examples demonstrating how to use the component with a React Native application.
- **Properties**: A detailed table of all the props with their descriptions and default values.
- **Pagination Behavior**: Explanation of how pagination works in the component.
- **Customizing List Items**: How to customize the `renderItem` function for item display.
- **Handling Data Fetching**: How to use the `fetchMoreData` function to load more data as the user scrolls.
- **Optional Fade-in Animation**: How to enable item animations.
- **Contributing**: How others can contribute to the project.
- **License**: Open-source license (MIT).


