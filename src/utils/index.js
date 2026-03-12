export function createPageUrl(pageName) {
  if (!pageName) return "/";
  const normalized = pageName.replace(/\s+/g, "").replace(/[^a-zA-Z0-9_-]/g, "");
  return normalized === "" ? "/" : `/${normalized}`;
}
