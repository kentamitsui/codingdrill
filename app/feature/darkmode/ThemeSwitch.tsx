"use client";

import { useTheme } from "next-themes";
import Icon_DarkMode from "@/app/components/darkmode/Icon_DarkMode";
import Icon_LightMode from "@/app/components/darkmode/Icon_LightMode";
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

  // サーバーサイドではユーザー側のカラーテーマを判別出来ない
  // なので、レンダリング時にnullを返す事で、
  if (!mounted) {
    return null;
  } else if (mounted && resolvedTheme === "dark") {
    return <Icon_LightMode toggle={() => setTheme("light")} />;
  } else return <Icon_DarkMode toggle={() => setTheme("dark")} />;
}
