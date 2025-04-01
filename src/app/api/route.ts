import { puppeteerPromise } from "@/lib/puppeteer/puppeteerPromise";

export const maxDuration = 60;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const site = searchParams.get("url");
  if (!site) return new Response("No site provided", { status: 400 });

  try {
    const browser = await puppeteerPromise;
    const page = await browser.newPage();
    await page.goto(site);
    const title = await page.title();
    await page.close();
    return new Response(title);
  } catch (err) {
    return new Response(null, { status: 500 });
  }
}
