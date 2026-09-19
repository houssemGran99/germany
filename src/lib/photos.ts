import { generatedPhotos } from "@/data/photos.generated";
import type { Photo } from "@/data/types";

const byId = new Map(generatedPhotos.map((p) => [p.id, p]));

/** Returns undefined when the photo could not be fetched — callers render a
 *  gradient placeholder instead of a broken image. See IMAGE-TODO.md. */
export function getPhoto(id: string): Photo | undefined {
  return byId.get(id);
}

export function getPhotos(ids: string[]): Photo[] {
  return ids.map((id) => byId.get(id)).filter((p): p is Photo => Boolean(p));
}

export const allPhotos = generatedPhotos;
