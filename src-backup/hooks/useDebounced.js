const { useState, useEffect } = require("react");

const useDebounced = (value, timeout = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [value, timeout]);

  return debouncedValue;
};

export default useDebounced;
