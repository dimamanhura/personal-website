export const generateSlug = (text: string): string => {
  return text
    .toString()
    .normalize('NFD') // Decompose combined characters into base + diacritic
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (accents)
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both ends
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '') // Remove all non-word characters (except hyphens)
    .replace(/--+/g, '-') // Replace multiple hyphens with a single one
    .replace(/^-+/, '') // Trim hyphens from the start
    .replace(/-+$/, ''); // Trim hyphens from the end
};
