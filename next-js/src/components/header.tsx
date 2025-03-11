import { ModeToggle } from "./toggle-theme";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="flex justify-between items-center p-4">
        <ul className="flex space-x-4">
          <li className="font-semibold text-lg hover:text-blue-500 p-1 cursor-pointer dark:hover:bg-slate-200 rounded-sm">
            <Link href={"/login"}>Login</Link>
          </li>
          <li className="font-semibold text-lg hover:text-blue-500 p-1 cursor-pointer dark:hover:bg-slate-200 rounded-sm">
            <Link href={"/register"}>Register</Link>
          </li>
        </ul>
        <ModeToggle />
      </nav>
    </header>
  );
}
