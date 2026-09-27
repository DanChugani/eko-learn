/** Matches an unfilled placeholder such as [RATE] or [TUTOR 1 NAME]. */
export const PLACEHOLDER_PATTERN = /\[[A-Z][A-Z0-9 _]*\]/;

export function isPlaceholder(value: unknown): boolean {
  return typeof value === 'string' && PLACEHOLDER_PATTERN.test(value);
}

/** Returns the value only when it is real data, otherwise undefined. */
export function realOrUndefined<T>(value: T): T | undefined {
  return isPlaceholder(value) ? undefined : value;
}

export interface PlaceholderHit {
  path: string;
  value: string;
}

/** Walks any config object and lists every string that still contains a placeholder. */
export function findPlaceholders(input: unknown, path = ''): PlaceholderHit[] {
  if (isPlaceholder(input)) return [{ path, value: input as string }];
  if (Array.isArray(input)) {
    return input.flatMap((item, i) => findPlaceholders(item, `${path}[${i}]`));
  }
  if (input !== null && typeof input === 'object') {
    return Object.entries(input).flatMap(([key, value]) =>
      findPlaceholders(value, path ? `${path}.${key}` : key),
    );
  }
  return [];
}
