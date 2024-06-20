import { playlists } from "./playlists";

export function Push(src: string): void {
  console.log({ src });
  playlists.unshift({src});
}
