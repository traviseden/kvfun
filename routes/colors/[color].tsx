import { Head } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { COLORS, SIZES, SHAPES } from "../../lib/things.ts";
import type { Thing, FullThing } from "../../lib/things.ts";

export const handler: Handlers<any> = {
  async GET(_, ctx: HandlerContext) {
    const { color } = ctx.params;
    const index = COLORS.indexOf(color as typeof COLORS[number]);
    const db: Deno.Kv = await Deno.openKv();
    const entries = db.list({prefix: ["things_by_color", index]});
    const things: Thing[] = [];
    for await (const entry of entries) {
      things.push({
        color: COLORS[entry.value.color],
        size: SIZES[entry.value.size],
        shape: SHAPES[entry.value.shape],
      });
    }
    return ctx.render(things);
  },
};


export default function ColorSingle({ data }: PageProps<Thing[]>) {
  return (
    <>
      <Head>
        <title>Things by color!</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        {data.length > 0 ? (
          <ul>
            {data.map(({shape, color, size}) => (
              <li>{size} {color} {shape}</li>
            ))}
          </ul>
        ) : (
          <p>no things!</p>
        )}
      </div>
    </>
  );
}
