import React, { useCallback, useMemo } from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';
import debounce from 'lodash.debounce';

interface DebouncedInputProps extends TextInputProps {
  onDebouncedChange: (value: string) => void;
  delay?: number;
}

export const DebouncedInput: React.FC<DebouncedInputProps> = ({
  onDebouncedChange,
  delay = 500,
  placeholder = 'Type here...',
  style,
  ...props
}) => {
  const debouncedChangeHandler = useMemo(
    () =>
      debounce((value: string) => {
        onDebouncedChange(value);
      }, delay),
    [delay, onDebouncedChange],
  );

  React.useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  const handleChangeText = useCallback(
    (text: string) => {
      debouncedChangeHandler(text);
    },
    [debouncedChangeHandler],
  );

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        placeholder={placeholder}
        style={[styles.input, style]}
        onChangeText={handleChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});
