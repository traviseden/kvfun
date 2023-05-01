import { Head } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { COLORS, SIZES, SHAPES } from "../../lib/things.ts";
import type { Thing, NormalizedThing } from "../../lib/things.ts";


type ThingByFieldProps =
| {error: string}
| {fields: string, things: Thing[]}

export const handler: Handlers<ThingByFieldProps> = {
  async GET(_, ctx: HandlerContext<ThingByFieldProps>) {
    const { fields, field } = ctx.params;
    let index;
    let prefix;
    if (fields === 'colors') {
      index = COLORS.indexOf(field);
      prefix = ["things_by_color", index];
    } else if (fields === 'sizes') {
      index = SIZES.indexOf(field);
      prefix = ["things_by_size", index];
    } else if (fields === 'shapes') {
      index = SHAPES.indexOf(field);
      prefix = ["things_by_shape", index];
    } else {
      return ctx.render({error: "Invalid field"})
    }

    const db: Deno.Kv = await Deno.openKv();
    const entries = db.list<NormalizedThing>({prefix});
    const things: Thing[] = [];
    for await (const entry of entries) {
      things.push({
        id: entry.value.id,
        color: COLORS[entry.value.color],
        size: SIZES[entry.value.size],
        shape: SHAPES[entry.value.shape],
      });
    }
    return ctx.render({fields, things});
  },
};


export default function ColorSingle({ data }: PageProps<ThingByFieldProps>) {
  if ('error' in data) return (
    <>
      <Head>
        <title>Error!</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">

      </div>
    </>
  );

  return (
    <>
      <Head>
        <title>Things by {data.fields}!</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <nav class="w-full rounded-md">
          <ol class="list-reset flex">
            <li>
              <a
                href="/"
                class="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                >Home</a
              >
            </li>
            <li>
              <span class="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
            </li>
            <li>
              <a
                href={`/${data.fields}`}
                class="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                >{data.fields.charAt(0).toUpperCase() + data.fields.slice(1)}</a
              >
            </li>
            <li>
              <span class="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
            </li>
            <li class="text-neutral-500 dark:text-neutral-400">{data.things[0].shape.charAt(0).toUpperCase() + data.things[0].shape.slice(1)}</li>
          </ol>
        </nav>
        {data.things.length > 0 ? (
          <ul class="mt-6">
            {data.things.map(({id, shape, color, size}: any) => (
              <li>{id}: {size} {color} {shape}</li>
            ))}
          </ul>
        ) : (
          <p>no things!</p>
        )}
      </div>
    </>
  );
}
