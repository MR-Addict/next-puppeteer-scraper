import { z } from "zod";

const AppEnv = z.object({
  /**
   * Only used in local development, when deployed on Vercel, this will be
   * ignored and replaced by @sparticuz/chromium executablePath
   * @see https://github.com/Sparticuz/chromium
   */
  BROWSER_PATH: z.string()
});

const VercelEnv = z.object({
  /**
   * Vercel production URL, available at both build and runtime
   * @see https://vercel.com/docs/environment-variables/system-environment-variables#VERCEL_PROJECT_PRODUCTION_URL
   */
  VERCEL_PROJECT_PRODUCTION_URL: z.string()
});

AppEnv._type;

type Env = ({ VERCEL: false } & z.infer<typeof AppEnv>) | ({ VERCEL: true } & z.infer<typeof VercelEnv>);

export const env: Env = (() => {
  const vercelEnv = VercelEnv.safeParse(process.env);

  if (!vercelEnv.success) {
    const appEnv = AppEnv.parse(process.env);
    return { VERCEL: false, ...appEnv };
  }

  return { VERCEL: true, ...vercelEnv.data };
})();
