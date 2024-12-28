"use client";

import { useTheme } from "next-themes";
import Icon_DarkMode from "@/app/feature/darkmode/components/Icon_DarkMode";
import Icon_LightMode from "@/app/feature/darkmode/components/Icon_LightMode";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

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
