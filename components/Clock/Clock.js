'use client';

import { useEffect, useState } from "react";

export default function Clock() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      setDate(
        new Date().toLocaleString("en-GB", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).replace(",", "")
      );
  };

  update(); // initial render
  const interval = setInterval(update, 1000);

  return () => clearInterval(interval);
  }, []);

  return <>{date}</>;
}
