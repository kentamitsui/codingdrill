"use client";

import { useTheme } from "next-themes";
import DarkModeToggleButton from "@/app/feature/darkmode/components/DarkModeToggleButton";
import LightModeToggleButton from "@/app/feature/darkmode/components/LightModeToggleButton";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/context/AppContext";

export default function ThemeSwitch() {
  const { setCurrentTheme } = useAppContext();
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  // コンポーネントのマウント後に現在のテーマを AppContextに反映
  useEffect(() => {
    if (resolvedTheme) {
      setCurrentTheme(resolvedTheme); // 状態を安全に更新
    }
  }, [resolvedTheme, setCurrentTheme]);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return resolvedTheme === "dark" ? (
    <LightModeToggleButton toggle={() => setTheme("light")} />
  ) : (
    <DarkModeToggleButton toggle={() => setTheme("dark")} />
  );
}
