const base = `import { Denops, ensure, execute, is } from "../../deps.ts";

export async function main(denops: Denops): Promise<void> {
  // ここにプラグインの処理を記載する
  // console.log("Hello Denops!");

  denops.dispatcher = {
    async echo(text: unknown): Promise<unknown> {
      ensure(text, is.String);
      return await Promise.resolve(text);
    },
  };

  await execute(
    denops,
    \`command! -nargs=1 HelloWorldEcho echomsg denops#request('\${denops.name}', 'echo', [<q-args>])\`,
  );
}
`;
const deno = "{}";
const deps =
  `export { type Denops } from "https://deno.land/x/denops_std@v6.5.1/mod.ts";
export { execute } from "https://deno.land/x/denops_std@v6.5.1/helper/mod.ts";
export { ensure } from "https://deno.land/x/unknownutil@v3.18.1/mod.ts";
export { is } from "https://deno.land/x/unknownutil@v3.18.1/mod.ts";
`;
console.log("Create directory...");
Deno.mkdir("./denops/plugin", {
  recursive: true,
});
console.log("Copying templates...");
Deno.writeTextFile("./denops/plugin/main.ts", base);
Deno.writeTextFile("./deps.ts", deps);
Deno.writeTextFile("./deno.json", deno);
console.log("Execute `deno cache ./denops/plugin/main.ts`...");
const cache = new Deno.Command("deno", {
  args: [
    "cache",
    "./denops/plugin/main.ts",
  ],
});
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
