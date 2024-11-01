import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function useLocalStorage(key: string, defaultValue: any) {
  // console.log({key, defaultValue});
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    // console.log({storedValue});
    return storedValue === null 
        ? defaultValue 
        : storedValue[0] === '{' 
            ? JSON.parse(storedValue)
            : storedValue;
  });
  // console.log({key, value});
  useEffect(() => {
    const listener = (e: any) => {
      if (e.type === key) {
        const newValue = localStorage.getItem(key);
        setValue(
            (newValue && newValue[0] === '{') 
                ? JSON.parse(newValue)
                : e.newValue
        );
      }
    };
    window.addEventListener(key, listener);

    return () => {
      window.removeEventListener('storage', listener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage = (newValue: any) => {
    setValue((currentValue: string) => {
      const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;
      localStorage.setItem(key, typeof result === 'object' ? JSON.stringify(result) : result);
      return result;
    });
  };

  return [value, setValueInLocalStorage];
}
