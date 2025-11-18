'use client';

import { useEffect, useState } from "react";
import moment from "moment";

export default function Clock() {
  const [time, setTime] = useState(moment().format("L LTS"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("L LTS"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>{time}</>
  );
}
