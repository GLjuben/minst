export interface iphotos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

type Modify<T, R> = Omit<T, keyof R> & R;

export type tPhotos = Modify<iphotos, { collapsed: boolean }>;
