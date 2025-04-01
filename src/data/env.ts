import { z } from "zod";

const Env = z.object({
  BROWSER_PATH: z.string().optional()
});

export const env = Env.parse(process.env);
