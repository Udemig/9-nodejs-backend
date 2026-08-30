export const getProfilePicture = (url: string): string => {
  return url === "default" ? "/default.jpg" : url;
};
