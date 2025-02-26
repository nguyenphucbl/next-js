"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import clsx from "clsx";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const handleToggle = () => {
    const activeTheme =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(activeTheme);
  };
  const activeColor = "bg-gray-200 dark:bg-gray-800";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={handleToggle}
          className={clsx({ [activeColor]: theme === "light" })}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleToggle}
          className={clsx({ [activeColor]: theme === "dark" })}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleToggle}
          className={clsx({ [activeColor]: theme === "system" })}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
