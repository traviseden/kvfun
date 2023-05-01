export const COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'purple', 'pink', 'silver', 'gold', 'beige', 'brown'];
export const SIZES = ['tiny', 'small', 'medium', 'big', 'large', 'huge', 'massive', 'gigantic'];
export const SHAPES = ['square', 'circle', 'rectangle', 'triangle', 'polygon', 'parallelogram'];

export type Color = typeof COLORS[number];
export type Size = typeof SIZES[number];
export type Shape = typeof SHAPES[number];

export type Thing = {
    id: number
    color: Color;
    size: Size;
    shape: Shape;
}

export type NormalizedThing = {
    id: number,
    color: number,
    size: number,
    shape: number,
}
  