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
    await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 2 });
    await page.goto(site, { waitUntil: "networkidle2" });
    const screenshot = await page.screenshot({ type: "webp", omitBackground: true });
    await page.close();
    return new Response(screenshot, { headers: { "Content-Type": "image/webp" } });
  } catch (err) {
    return new Response(null, { status: 500 });
  }
}
