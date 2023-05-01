import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import { PageProps } from "$fresh/server.ts";
import type { Thing } from "../lib/things.ts";

export default function Home({ data }: PageProps<Thing[]>) {
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
          {' - '}
          <a href="/sizes">Sizes</a>
          {' - '}
          <a href="/shapes">Shapes</a>
        </p>
      </div>
    </>
  );
}
