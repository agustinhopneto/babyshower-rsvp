import { useCallback } from 'react';

export function useClipboard() {
  const copyContent = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }, []);

  return {
    copyContent,
  };
}
