/**
 * Returns a random integer between min (inclusive) and max (exclusive)
 */

export function getRandomNumberInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}
