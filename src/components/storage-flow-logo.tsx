"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const StorageFlowLogo = ({ className }: { className?: string }) => {
  const { theme } = useTheme();

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
    >
      <rect width="160" height="160" rx="16" fill="currentColor" />
      <text
        x="145"
        y="135"
        fill={theme === "dark" ? "#0F172A" : "#FFFFFF"}
        fontSize="85"
        fontWeight="bold"
        textAnchor="end"
        dominantBaseline="alphabetic"
      >
        SF
      </text>
    </svg>
  );
};

export default StorageFlowLogo;