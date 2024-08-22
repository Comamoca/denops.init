import { bundle } from "jsr:@deno/emit@0.44.0";

const url = new URL(import.meta.resolve("./main.ts"));
const { code } = await bundle(url);

await Deno.writeTextFile("./online.ts", code);
