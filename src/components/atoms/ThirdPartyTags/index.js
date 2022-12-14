import Script from "next/script";

const ThirdPartyTags = () => {
  return (
    <>
      {/* Ketch Cookie Policy */}
      <Script
        id="ketch-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function () {var a=document.createElement("script");a.type="text/javascript",a.src="https://global.ketchcdn.com/web/v1/config/whitemansionltd/web/boot.js",a.defer=a.async=!0,document.getElementsByTagName("head")[0].appendChild(a),window.semaphore=window.semaphore||[];})();`,
        }}
      />

      {/* HotJar */}
      <Script
        id="hotjar-script"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:1495297,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />

      {/* WhatsApp */}
      <Script
        id="whatsapp-script"
        strategy="afterInteractive"
        src="https://apps.elfsight.com/p/platform.js"
      />

      <div className="elfsight-app-54ab0dcf-b66f-433d-b97e-f25328a55d59"></div>

      {/* Feefo Floating Widget */}
      {/* <Script
        strategy="afterInteractive"
        src="https://api.feefo.com/api/javascript/tradepricesdirect-com"
      />

      <div id="feefo-service-review-floating-widgetId"></div> */}
    </>
  );
};

export default ThirdPartyTags;
