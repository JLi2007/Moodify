interface Playlist {
  src: string
}

const playlists: Playlist[] = [
  {
    src: 'https://open.spotify.com/embed/playlist/2F6JtyDh4aHd77mfcxrz4R?utm_source=generator'
  }
]

export function Push(src: string): void {
  console.log({ src });
  playlists.unshift({src});
}
