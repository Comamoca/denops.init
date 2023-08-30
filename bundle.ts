import { bundle } from "https://deno.land/x/emit/mod.ts";

const url = new URL(import.meta.resolve("./main.ts"));
const { code } = await bundle(url);

await Deno.writeTextFile("./online.ts", code);
