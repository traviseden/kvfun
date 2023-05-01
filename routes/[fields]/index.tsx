// deno-lint-ignore-file no-explicit-any
import { Head } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import  {COLORS, SIZES, SHAPES} from "../../lib/things.ts";
import  {Color, Size, Shape} from "../../lib/things.ts";

type List = Color[] | Size[] | Shape[];

type FieldOptionsProps =
| {error: string}
| {fields: string, list: List}

export const handler: Handlers<FieldOptionsProps> = {
  GET(_, ctx: HandlerContext<FieldOptionsProps>) {
    const { fields } = ctx.params;
    let list: List = [];
    if (fields === 'colors') {
      list = COLORS;
    } else if (fields === 'sizes') {
      list = SIZES;
    } else if (fields === 'shapes') {
      list = SHAPES;
    } else {
      return ctx.render({error: "Invalid field"})
    }
    return ctx.render({fields, list});
  },
};

export default function Colors({ data }: PageProps<FieldOptionsProps>) {
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
        <title>Things by color!</title>
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
            <li class="text-neutral-500 dark:text-neutral-400">{data.fields.charAt(0).toUpperCase() + data.fields.slice(1)}</li>
          </ol>
        </nav>

        <ul class="mt-6">
            {data.list.map((field: string) => (
                <li><a href={`/${data.fields}/${field}`}>{field}</a></li>
            ))}
        </ul>
      </div>
    </>
  );
}
