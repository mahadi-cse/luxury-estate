/** Site-wide settings controlled from the admin panel */
export interface SiteSettings {
  primaryColor: string;
  logoText: string;
  logoAccent: string;
}

/** Default site settings */
export const defaultSettings: SiteSettings = {
  primaryColor: "#C5A46D",
  logoText: "Estate",
  logoAccent: "Luxe",
};
