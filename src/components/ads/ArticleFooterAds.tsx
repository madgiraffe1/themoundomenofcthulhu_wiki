import { AdBanner } from "./AdBanner";

interface ArticleFooterAdsProps {
  banner728Key?: string;
  banner468Key?: string;
}

export function ArticleFooterAds({
  banner728Key,
  banner468Key,
}: ArticleFooterAdsProps) {
  if (!banner728Key && !banner468Key) {
    return null;
  }

  return (
    <div className="hidden md:flex border-t border-border pt-12 mt-12 flex-col items-center gap-8">
      <AdBanner
        type="banner-728x90"
        adKey={banner728Key}
        eager
      />
      <AdBanner
        type="banner-468x60"
        adKey={banner468Key}
        eager
      />
    </div>
  );
}
