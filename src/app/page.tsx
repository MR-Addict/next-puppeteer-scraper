"use client";

import { useState } from "react";
import style from "./page.module.css";

export default function Home() {
  const [title, setTitle] = useState<{ success: boolean; message: string | number } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const url = formData.get("url") as string;
    const res = await fetch(`/api?url=${url}`);
    if (!res.ok) return setTitle({ success: false, message: res.status });

    const title = await res.text();
    setTitle({ success: true, message: title });
  }

  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        <form onSubmit={handleSubmit}>
          <input type="url" name="url" placeholder="Enter a URL" required />
          <button type="submit">Submit</button>
        </form>

        {title && <p data-success={title.success}>{title.message}</p>}
      </div>
    </main>
  );
}
