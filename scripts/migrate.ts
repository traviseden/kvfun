// // deno-lint-ignore-file no-explicit-any
import { COLORS, SIZES, SHAPES } from "../lib/things.ts";
import type { NormalizedThing } from "../lib/things.ts";

const CURRENT = 12;

export async function handleMigration() {
    const db: Deno.Kv = await Deno.openKv();
    const migrationStatus = await db.get<number>(["stuff", "migration"]).then((res) => Number(res?.value) || 0);
    if (CURRENT <= migrationStatus) {
        console.log("no migration");
        return;
    }

    console.log({migrationStatus, CURRENT});
    console.log("MIGRATE!")
    await db.set(["stuff", "migration"], CURRENT);
    await dropCollections(db, ["things"], ["things_by_color"], ["things_by_size"], ["things_by_shape"]);
    await addManyThings(db);    
}

async function dropCollections(db: Deno.Kv, ...collections: Deno.KvKey[]) {
    console.log("dropCollections");
    let count = 0;
    for (const collection of collections) {
        const things = db.list({prefix: collection});
        for await (const thing of things) {
            await db.delete(thing.key);
            count++;
        }
    }
    console.log("deleted", count, "things");
}

async function addManyThings(db: Deno.Kv) {
    console.log("addManyThings");
    let id;
    for (id = 1; id <= 1000; id++) {
        const color = Math.floor(Math.random() * COLORS.length);
        const size = Math.floor(Math.random() * SIZES.length);
        const shape = Math.floor(Math.random() * SHAPES.length);
        const thing: NormalizedThing = {id, color, size, shape};
        const primaryKey = ["things", id];
        const byColorKey = ["things_by_color", color, id];
        const bySizeKey = ["things_by_size", size, id];
        const byShapeKey = ["things_by_shape", shape, id];
        await db.atomic()
            .set(primaryKey, thing)
            .set(byColorKey, thing)
            .set(bySizeKey, thing)
            .set(byShapeKey, thing)
            .commit();
    }
}
