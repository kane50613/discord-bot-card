import { env } from "@/env";
import { createRestManager } from "@discordeno/rest";
import { unstable_cache } from "next/cache";

const rest = createRestManager({
  token: env.BOT_TOKEN,
});

const userId = atob(env.BOT_TOKEN.split(".")[0]);

export const getApplication = unstable_cache(
  async () => await rest.getApplicationInfo(),
  ["application", userId],
);

export const getUser = unstable_cache(
  async () => await rest.getUser(userId),
  ["user", userId],
);
