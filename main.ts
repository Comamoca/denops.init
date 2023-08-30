import { base } from "./templates/base.ts";
import { deno } from "./templates/deno.ts";
import { deps } from "./templates/deps.ts";

console.log("Create directory...");
Deno.mkdir("./denops/plugin", { recursive: true });

console.log("Copying templates...");
Deno.writeTextFile("./denops/plugin/main.ts", base);
Deno.writeTextFile("./deps.ts", deps);
Deno.writeTextFile("./deno.json", deno);

console.log("Execute `deno cache ./denops/plugin/main.ts`...");
const cache = new Deno.Command(
  "deno",
  {
    args: ["cache", "./denops/plugin/main.ts"],
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
