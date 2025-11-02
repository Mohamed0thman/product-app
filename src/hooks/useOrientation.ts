import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';

type Orientation = 'portrait' | 'landscape';

export function useOrientation(): Orientation {
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState<Orientation>(
    width > height ? 'landscape' : 'portrait'
  );

  useEffect(() => {
    const newOrientation = width > height ? 'landscape' : 'portrait';
    if (newOrientation !== orientation) {
      setOrientation(newOrientation);
    }
  }, [width, height, orientation]);

  return orientation;
}
