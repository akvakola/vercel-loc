export function generateRandomString(prefix: string = ""): string {
  return `${Date.now()}${Math.random().toString(36).substring(2, 9)}`;
}
