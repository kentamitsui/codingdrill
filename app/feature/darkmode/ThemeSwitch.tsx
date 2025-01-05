"use client";

import { useTheme } from "next-themes";
import Icon_DarkMode from "@/app/feature/darkmode/components/Icon_DarkMode";
import Icon_LightMode from "@/app/feature/darkmode/components/Icon_LightMode";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/components/AppContext";

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
    <Icon_LightMode toggle={() => setTheme("light")} />
  ) : (
    <Icon_DarkMode toggle={() => setTheme("dark")} />
  );
}
