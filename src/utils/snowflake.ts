import { BigString } from "@discordeno/types";

export const DISCORD_EPOCH = 1420070400000;

export function convertSnowflakeToDate(id: BigString) {
  if (typeof id === "string") id = BigInt(id);

  return new Date(Number(id >> 22n) + DISCORD_EPOCH);
}
