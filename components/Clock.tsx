"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("bn-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
});

export default function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000 * 15);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="corner corner--left">
      <div className="clock">
        {time ?? "\u2014\u2014:\u2014\u2014"}
        <span className="clock__tz">{"\u0995\u09b2\u0995\u09be\u09a4\u09be"}</span>
      </div>
    </div>
  );
}
