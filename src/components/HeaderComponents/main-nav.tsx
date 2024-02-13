import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { getFirstStringBetweenSlashes } from "./sidebar";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/heightanomaly/analysis/tables"
        className={`text-sm font-medium  ${
          getFirstStringBetweenSlashes(pathname + "/") === "heightanomaly"
            ? "text-primary"
            : "text-muted-foreground"
        } transition-colors hover:text-primary`}
      >
        <h1 className="lg:text-2xl sm:text-sm font-semibold">
        Аномалия высоты
        </h1>
      </Link>
    </nav>
  );
}
