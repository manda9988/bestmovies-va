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
    <div className={styles.logo} onClick={handleResetFilters}>
      <b>
        <span>Find</span><span>movies</span>
      </b>
    </div>
  );
}
