export const USERNAME_PATTERN = /^[a-zA-Z0-9_.-]+$/;

export function sanitizeUsername(username: string): string {
  return username
    .toLowerCase()
    .split("")
    .map((c) => (c === " " ? "_" : c))
    .filter((c) => USERNAME_PATTERN.test(c))
    .join("");
}
