import { Song } from "./song";

export interface Artist {
    id: number;
    name: string;
    songs: Song[]
}
