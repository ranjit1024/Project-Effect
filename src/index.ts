import { Effect } from "effect"
import { addNote, listNotes, removeNote } from "./notes"

const [, , command, ...args] = process.argv

let program

switch (command) {
  case "add":
    program = addNote(args.join(" "))
    break
  case "list":
    program = listNotes
    break
  case "remove":
    program = removeNote(Number(args[0]))
    break
  default:
    program = Effect.sync(() =>
      console.log("Commands: add | list | remove")
    )
}

Effect.runPromise(program)
