import { fromFileUrl } from "path";
import { ensureDir } from "fs";

function pathResolver(meta: ImportMeta): (path: string) => string {
  return (path) => fromFileUrl(new URL(path, meta.url));
}

const resolver = pathResolver(import.meta);

console.log("Create directory...");
await ensureDir("./denops/plugin");

console.log("Copying templates...");
Deno.copyFile(resolver("./templates/base.ts"), "./denops/plugin/main.ts");
Deno.copyFile(resolver("./templates/deps.ts"), "./deps.ts");
Deno.copyFile(resolver("./templates/deno.json"), "./deno.json");

console.log("Execute `deno cache ./denops/plugin/main.ts`...");
const cache = new Deno.Command(
  "deno",
  {
    args: ["cache", "--reload", "./denops/plugin/main.ts"],
  },
);

const { _, stdout, stderr } = await cache.output();

const decoder = new TextDecoder();

console.log(decoder.decode(stdout));
console.log(decoder.decode(stderr));

console.log("All done 🎉");
console.log(`Boiler plate structure is show below.
You edit to \`main.ts\` start develop to denops plugin.`);
console.log(`.
├── deno.json
├── deno.lock
├── denops
│   └── plugin
│       └── main.ts
└── deps.ts
`);

console.log("Happy hacking!✨");
