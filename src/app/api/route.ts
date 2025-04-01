import { puppeteerPromise } from "@/lib/puppeteer/puppeteerPromise";

export const maxDuration = 60;

export async function GET() {
  const browser = await puppeteerPromise;
  const page = await browser.newPage();
  await page.goto("https://example.com");
  const title = await page.title();
  await page.close();
  return new Response(title);
}
