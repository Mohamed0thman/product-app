/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { LegendList, LegendListRef } from '@legendapp/list';
import {
  Button,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useMemo, useRef } from 'react';
import { useOrientation, useItemsManager, SortState } from './src/hooks';
import { DebouncedInput, ProductCard } from './src/components';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={isDarkMode ? 'black' : 'white'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const orientation = useOrientation();
  const { width } = useWindowDimensions();

  const {
    items,
    selectedIds,
    setQuery,
    setSort,
    toggleSelect,
    deleteSelected,
    reset,
    sort,
  } = useItemsManager();

  const listRef = useRef<LegendListRef>(null);

  const columnsNumber = 3;

  const numColumns = orientation === 'portrait' ? 1 : columnsNumber;
  const horizontalPadding = 16;
  const gap = 16;

  const cardWidth = useMemo(() => {
    if (orientation === 'portrait') return width - horizontalPadding;
    return (width - horizontalPadding * 2 - gap) / columnsNumber;
  }, [orientation, width]);

  const handleSort = (sort: SortState) => {
    listRef.current?.scrollToIndex({ index: 0 });
    if (sort === 'asc') {
      setSort('desc');
    } else if (sort === 'desc') {
      setSort('none');
    } else {
      setSort('asc');
    }
  };

  return (
    <View style={[styles.container, { top: safeAreaInsets.top }]}>
      <View style={{ marginHorizontal: 10, gap: 10 }}>
        <DebouncedInput onDebouncedChange={setQuery} delay={500} />

        <View style={styles.controls}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button title={`Sort: ${sort}`} onPress={() => handleSort(sort)} />
          </View>

          {selectedIds.size > 0 && (
            <Button
              title={`Delete Selected (${selectedIds.size})`}
              color="red"
              onPress={deleteSelected}
            />
          )}
        </View>
      </View>
      <LegendList
        ref={listRef}
        key={numColumns}
        numColumns={numColumns}
        data={items}
        renderItem={({ item, index }) => (
          <ProductCard
            item={item}
            index={index}
            selected={selectedIds.has(item.id.toString())}
            orientation={orientation}
            cardWidth={cardWidth}
            onToggleSelect={toggleSelect}
          />
        )}
        keyExtractor={item => item.id.toString()}
        extraData={selectedIds}
        recycleItems
        contentContainerStyle={
          {
            paddingBottom: safeAreaInsets.bottom + 20,
            paddingHorizontal: horizontalPadding,
            rowGap: gap,
            columnGap: gap,
            justifyContent: 'space-between',
          } as ViewStyle
        }
        estimatedItemSize={orientation === 'portrait' ? 350 : 300}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 20 },
  image: { width: '100%', height: 200, borderRadius: 8 },
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: 'black',
    borderWidth: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  controls: {
    marginBottom: 10,
    gap: 10,
  },
});

export default App;
