export const COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'purple', 'pink', 'silver', 'gold', 'beige', 'brown'] as const;
export const SIZES = ['tiny', 'small', 'medium', 'big', 'large', 'huge', 'massive', 'gigantic'] as const;
export const SHAPES = ['square', 'circle', 'rectangle', 'triangle', 'polygon', 'parallelogram'] as const;

export type Thing = {
    color: typeof COLORS[number];
    size: typeof SIZES[number];
    shape: typeof SHAPES[number];
}

export type FullThing = Thing & {id: number}