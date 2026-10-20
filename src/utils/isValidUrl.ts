export default function isValidUrl(url: string) {
  if (!url) return false;

  const link = new URL(url);

  try {
    return link.protocol === "https:" || link.protocol === "http:";
  } catch (error) {
    return false;
  }
}
