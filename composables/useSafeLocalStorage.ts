export const useSafeLocalStorage = () => {
  const checkAvailability = () => !!window?.localStorage;

  const setItem = (key: string, value: string) => {
    if (!checkAvailability()) {
      return;
    }

    localStorage.setItem(key, value);
  };

  const getItem = (key: string) => {
    if (!checkAvailability()) {
      return null;
    }

    return localStorage.getItem(key);
  };

  return {
    setItem,
    getItem,
  };
};
