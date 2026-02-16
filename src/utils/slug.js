export function slugifyTR(text = "") {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replaceAll("ş", "s")
      .replaceAll("ı", "i")
      .replaceAll("ğ", "g")
      .replaceAll("ü", "u")
      .replaceAll("ö", "o")
      .replaceAll("ç", "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }