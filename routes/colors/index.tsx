import { Head } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { COLORS, SIZES, SHAPES } from "../../lib/things.ts";
import type { Thing, FullThing } from "../../lib/things.ts";

export default function Colors({ data }: PageProps<FullThing[]>) {
  return (
    <>
      <Head>
        <title>Things by color!</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <ul>
            {COLORS.map((color) => (
                <li><a href={`/colors/${color}`}>{color}</a></li>
            ))}
        </ul>
      </div>
    </>
  );
}
