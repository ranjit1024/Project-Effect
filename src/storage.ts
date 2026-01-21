import { Effect } from "effect";

const FILE_PATH = "./notes.json";

export interface Note {
  id: number;
  text: string;
}

export const readNotes = Effect.tryPromise({
  try: async () => {
    const file = Bun.file(FILE_PATH);

    if (!(await file.exists())) return [];

    const text = await file.text();
    return JSON.parse(text) as Note[];
  },
  catch: () => new Error("Failed to read notes"),
});

export const writeNotes = (notes: Note[]) =>
  Effect.tryPromise({
    try: async () => {
      await Bun.write(FILE_PATH, JSON.stringify(notes, null, 2));
      
    },
    catch: () => new Error("Failed to write notes"),
  });