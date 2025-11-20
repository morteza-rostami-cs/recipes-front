// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// === سرآشپز RTL + Persian Theme (Inline – No external file) ===
const theme = extendTheme({
  direction: "rtl",
  fonts: {
    heading: `'Almarai', 'Vazirmatn', sans-serif`,
    body: `'Vazirmatn', 'Almarai', sans-serif`,
  },
  config: { cssVarPrefix: "ck" },
  styles: { global: { "html, body": { direction: "rtl" } } },
});

// === Font Preload (SEO + UX) – Inlined ===
const FontPreload = () => (
  <>
    <link
      rel="preload"
      href="https://fonts.googleapis.com/css2?family=Almarai:wght@700;800&family=Vazirmatn:wght@600;700&display=swap"
      as="style"
      crossOrigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Almarai:wght@700;800&family=Vazirmatn:wght@600;700&display=swap"
      crossOrigin="anonymous"
    />
  </>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* === Manual SEO + RTL + Persian (No Helmet, No Package) === */}
    <>
      {/* Apply RTL + lang globally */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.lang = 'fa';
            document.documentElement.dir = 'rtl';
          `,
        }}
      />

      {/* SEO Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#9333EA" />
      <title>سرآشپز – آشپزی حرفه‌ای با حس خانه</title>
      <meta
        name="description"
        content="دستور پخت‌های ایرانی و جهانی با مواد در دسترس، گام به گام و با حس خانه. سرآشپز همراه شماست."
      />
      <meta
        name="keywords"
        content="آشپزی, دستور پخت, غذای ایرانی, سرآشپز, آشپزی خانگی"
      />
      <meta property="og:title" content="سرآشپز – آشپزی حرفه‌ای با حس خانه" />
      <meta
        property="og:description"
        content="دستور پخت‌های ایرانی و جهانی با مواد در دسترس، گام به گام و با حس خانه."
      />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fa_IR" />

      {/* PWA Ready */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/favicon.ico" />

      {/* Font Preload */}
      <FontPreload />
    </>

    <ChakraProvider theme={theme} resetCSS>
      <App />
    </ChakraProvider>
  </StrictMode>
);
