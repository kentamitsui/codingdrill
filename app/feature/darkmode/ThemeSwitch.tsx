"use client";

import { useTheme } from "next-themes";
import Icon_DarkMode from "@/app/components/darkmode/Icon_DarkMode";
import Icon_LightMode from "@/app/components/darkmode/Icon_LightMode";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, [setTheme]);

  if (!mounted) {
    return null;
  } else if (mounted && resolvedTheme === "dark") {
    return <Icon_LightMode toggle={() => setTheme("light")} />;
  } else return <Icon_DarkMode toggle={() => setTheme("dark")} />;
}
