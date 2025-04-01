import chromium from "@sparticuz/chromium";
import puppeteer, { Browser } from "puppeteer-core";

import { env } from "@/data/env";

let globalWithPuppeteer = global as typeof globalThis & { _puppeteerInstance: Browser | null };

async function createPuppeteer(): Promise<Browser> {
  if (!globalWithPuppeteer._puppeteerInstance) {
    globalWithPuppeteer._puppeteerInstance = await puppeteer.launch({
      args: chromium.args,
      headless: chromium.headless,
      defaultViewport: chromium.defaultViewport,
      executablePath: env.BROWSER_PATH || (await chromium.executablePath())
    });
  }
  return globalWithPuppeteer._puppeteerInstance;
}

export const puppeteerPromise = createPuppeteer();
