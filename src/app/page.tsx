"use client";

import { useState } from "react";
import style from "./page.module.css";

export default function Home() {
  const [pending, setPending] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const url = formData.get("url") as string;
    const res = await fetch(`/api?url=${url}`);

    if (!res.ok) setScreenshot(null);
    else {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setScreenshot(url);
    }

    setPending(false);
  }

  return (
    <main className={style.wrapper} data-pending={pending}>
      <div className={style.container}>
        <form onSubmit={handleSubmit}>
          <input type="url" name="url" placeholder="Enter a URL" required />
          <button type="submit" disabled={pending}>
            Submit
          </button>
        </form>

        {screenshot && !pending && (
          <div className={style.screenshot}>
            <img src={screenshot} alt="Screenshot" />
          </div>
        )}
      </div>
    </main>
  );
}
