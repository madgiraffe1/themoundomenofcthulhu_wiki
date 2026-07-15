"use client";

import Script from "next/script";

function firstValue(...values: Array<string | undefined>) {
  return values.find((value) => value && value !== "0");
}

export default function Analytics() {
  const gaId = firstValue(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  const clarityId = firstValue(process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID, process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID);

  return (
    <>
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />
          <Script id="google-analytics" strategy="lazyOnload">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}</Script>
        </>
      )}
      {clarityId && (
        <Script id="microsoft-clarity" strategy="lazyOnload">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `}</Script>
      )}
    </>
  );
}
