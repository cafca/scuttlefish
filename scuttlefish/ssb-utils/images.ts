const loadImage = (uri: string): string => {
  if (uri == null) return null;
  let result = "";
  // convert base64 to base16
  const raw = atob(uri.slice(1, 45));
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += hex.length === 2 ? hex : "0" + hex;
  }
  const prefix = result.slice(0, 2);
  const suffix = result.slice(2);
  return `/static/${prefix}/${suffix}`;
};

export default {
  loadImage
};
