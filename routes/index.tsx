import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { COLORS, SIZES, SHAPES } from "../lib/things.ts";
import type { Thing, FullThing } from "../lib/things.ts";

export const handler: Handlers<any> = {
  async GET(_, ctx: HandlerContext) {
    const db: Deno.Kv = await Deno.openKv();
    const entries = db.list({prefix: ["things"]});
    const things: FullThing[] = [];
    for await (const entry of entries) {
      things.push({
        id: entry.key[1],
        color: COLORS[entry.value.color],
        size: SIZES[entry.value.size],
        shape: SHAPES[entry.value.shape],
      });
    }
    return ctx.render(things);
  },
};


export default function Home({ data }: PageProps<FullThing[]>) {
  return (
    <>
      <Head>
        <title>Things!</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <Counter start={3} />
        <hr class="my-4" />
        <p>
          <a href="/colors">Colors</a>
        </p>
      </div>
    </>
  );
}
