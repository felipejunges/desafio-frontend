export const useLocalStorage = (key) => {
    const setItem = (value) => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    const getItem = () => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
    }

    const clear = () => {
        window.localStorage.clear();
    }

    return { setItem, getItem, clear };
}