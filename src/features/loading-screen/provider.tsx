"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  createContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";

// Definisi tipe untuk Context
interface LoadingScreenContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

// Menyediakan context dengan nilai default
const defaultContextValue: LoadingScreenContextType = {
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
};

export const LoadingScreenContext =
  createContext<LoadingScreenContextType>(defaultContextValue);

// Komponen LoadingScreenProvider yang membungkus children dan menyediakan context
export const LoadingScreenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fungsi untuk mulai dan menghentikan loading
  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  // Menggunakan useMemo untuk menghindari pembuatan ulang context setiap render
  const contextValue = useMemo(
    () => ({ isLoading, startLoading, stopLoading }),
    [isLoading, startLoading, stopLoading]
  );

  return (
    <LoadingScreenContext.Provider value={contextValue}>
      {children}
      <LoadingScreen isLoading={isLoading} />
    </LoadingScreenContext.Provider>
  );
};

// Komponen untuk menampilkan loading screen
const LoadingScreen: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return (
    <motion.div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-filter backdrop-blur-sm",
        isLoading ? "visible" : "invisible"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ scale: 0.8, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-12 w-12 text-primary" />
        </motion.div>
        <motion.h2
          className="text-lg font-semibold"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Loading...
        </motion.h2>
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Please wait while we process your request.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
