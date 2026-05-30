export function normalizeKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replaceAll(".", "_")
    .replaceAll("@", "_")
    .replaceAll("#", "_")
    .replaceAll("$", "_")
    .replaceAll("[", "_")
    .replaceAll("]", "_")
    .replaceAll("/", "_");
}