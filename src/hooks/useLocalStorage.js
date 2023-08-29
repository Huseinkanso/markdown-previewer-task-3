import { useState } from "react";

function useLocalStorage(key, initialValue) {
    // Get initial value from localStorage or use the provided initial value
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;
  
    // Create state to hold the current value
    const [value, setValue] = useState(initial);
  
    // Update localStorage whenever the value changes
    const updateValue = (newValue) => {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    };
  
    return [value, updateValue];
  }
export default useLocalStorage  