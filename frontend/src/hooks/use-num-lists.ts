import { useEffect, useState } from 'react';
import { useViewport } from './use-viewport';

export const useNumLists = () => {
  const [numLists, setNumLists] = useState(7);
  const { width } = useViewport();

  useEffect(() => {
    if (width < 600) {
      setNumLists(1);
    } else if (width < 1000) {
      setNumLists(3);
    } else if (width < 1300) {
      setNumLists(5);
    } else {
      setNumLists(7);
    }
  }, [width]);

  return {
    numLists,
  };
};
