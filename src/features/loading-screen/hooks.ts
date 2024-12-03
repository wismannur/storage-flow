import { useContext } from "react";
import { LoadingScreenContext } from "./provider";

export const useLoadingScreen = () => {
  const context = useContext(LoadingScreenContext);
  if (!context) {
    throw new Error(
      "useLoadingScreen must be used within a LoadingScreenProvider"
    );
  }
  return context;
};
