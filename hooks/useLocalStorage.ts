import { UserType } from "@/types/types";

const useLocalStorage = () => {
  const addData = (key: string, value: UserType) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const deleteData = (key: string) => {
    localStorage.removeItem(key);
  };

  const updateData = (key: string, value: UserType) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getData = (key: string): UserType | null | undefined => {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) {
      return null;
    }
    try {
      return JSON.parse(storedValue);
    } catch (error) {
      return null;
    }
  };

  return { updateData, deleteData, addData, getData };
};

export default useLocalStorage;
