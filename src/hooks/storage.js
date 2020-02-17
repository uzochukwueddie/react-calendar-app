import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
    const [item, setItemValue] = useState(() => {
        try {
            return window.localStorage.getItem(key)
            ? JSON.parse(window.localStorage.getItem(key))
            : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            setItemValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    };

    return [item, setValue];
};