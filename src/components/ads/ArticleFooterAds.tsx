"use client";

import { useCallback, useState } from "react";
import { AdBanner } from "./AdBanner";

interface ArticleFooterAdsProps {
  banner728Key?: string;
  banner468Key?: string;
}

export function ArticleFooterAds({
  banner728Key,
  banner468Key,
}: ArticleFooterAdsProps) {
  const [renderedSlots, setRenderedSlots] = useState<Record<string, boolean>>({});
  const hasRenderedAd = Object.values(renderedSlots).some(Boolean);

  const setSlotRendered = useCallback(
    (slot: string, hasRenderedContent: boolean) => {
      setRenderedSlots((current) => ({
        ...current,
        [slot]: hasRenderedContent,
      }));
    },
    [],
  );

  if (!banner728Key && !banner468Key) {
    return null;
  }

  return (
    <div
      className={
        hasRenderedAd
          ? "hidden md:flex border-t border-border pt-12 mt-12 flex-col items-center gap-8"
          : "hidden md:flex h-0 overflow-hidden flex-col items-center"
      }
    >
      <AdBanner
        type="banner-728x90"
        adKey={banner728Key}
        eager
        onRenderStateChange={(hasContent) =>
          setSlotRendered("banner-728x90", hasContent)
        }
      />
      <AdBanner
        type="banner-468x60"
        adKey={banner468Key}
        eager
        onRenderStateChange={(hasContent) =>
          setSlotRendered("banner-468x60", hasContent)
        }
      />
    </div>
  );
}
