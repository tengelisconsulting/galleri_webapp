export const API_PREFIX = "/db";

function reduceAnds(ands: string[]): string {
  const predicatesAsStr = ands
    .reduce((acc, curr) => acc + "," + curr);
  return `and(${predicatesAsStr})`;
}

export function getPGQueryUrl(
  table: string,
  clause?: string[][],                               // DNF - ors of ands
  select?: string[]                                 // default means '*'
): string {
  const base = `${API_PREFIX}/${table}`;
  if (!clause) {
    return base;
  }
  const andsAsStr = clause
    .map((andPredicates) => reduceAnds(andPredicates));
  const contents = andsAsStr
    .reduce((acc, curr) => acc + "," + curr);
  if (!select) {
    return `${base}?or(${contents})`;
  }
  const selectStr = select
    .reduce((acc, curr) => acc + "," + curr);
  return `${base}?or(${contents})&select=${selectStr}`;
}
