/** Site-wide settings controlled from the admin panel */
export interface SiteSettings {
  primaryColor: string;
  logoText: string;
  logoAccent: string;
  /** Optional logo image URL (blob or remote). If set, replaces the icon square. */
  logoImage: string;
}

/** Default site settings */
export const defaultSettings: SiteSettings = {
  primaryColor: "#C5A46D",
  logoText: "Estate",
  logoAccent: "Luxe",
  logoImage: "",
};
