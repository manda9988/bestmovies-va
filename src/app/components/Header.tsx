// src/app/components/Header.tsx

"use client";

import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const router = useRouter();

  const handleResetFilters = () => {
    router.push("/?page=1");
    router.refresh();
  };

  return (
    <div className={styles.logo}>
      <h1>
        <span className={styles.clickable} onClick={handleResetFilters}>
          BestMovies
        </span>
      </h1>
    </div>
  );
}
