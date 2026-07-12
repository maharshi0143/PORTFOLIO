export function normalizeTechStack(techstack) {
  if (Array.isArray(techstack)) return techstack;
  if (typeof techstack === "string")
    return techstack
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
}
