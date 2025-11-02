import React, { useCallback, useMemo } from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';
import debounce from 'lodash.debounce';

interface DebouncedInputProps extends TextInputProps {
  onDebouncedChange: (value: string) => void;
  minLength?: number;
  delay?: number;
}

export const DebouncedInput: React.FC<DebouncedInputProps> = ({
  onDebouncedChange,
  delay = 500,
  minLength = 3,
  placeholder = 'Type here...',
  style,
  ...props
}) => {
  const debouncedChangeHandler = useMemo(
    () =>
      debounce((value: string) => {
        if (value.length >= minLength) {
          onDebouncedChange(value);
        } else {
          onDebouncedChange('');
        }
      }, delay),
    [delay, minLength, onDebouncedChange],
  );

  const handleChangeText = useCallback(
    (text: string) => {
      debouncedChangeHandler(text);
    },
    [debouncedChangeHandler],
  );

  React.useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);
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
