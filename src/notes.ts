import { Effect } from "effect";
import { readNotes, writeNotes } from "./storage";

export const addNote = (text: string) =>
  Effect.flatMap( readNotes, (notes) => {
    const newNote = {
      id: Date.now(),
      text,
    };

    return writeNotes([...notes, newNote]);
  });

export const listNotes = Effect.flatMap(readNotes, (notes) =>
  Effect.sync(() => {
    notes.forEach((n, i) => {
      console.log(`${i + 1}. ${n.text}`);
    });
  }),
);

export const removeNote = (index: number) =>
  Effect.flatMap(readNotes, (notes) => {
    const updated = notes.filter((_, i) => i !== index - 1);
    return writeNotes(updated);
  });

