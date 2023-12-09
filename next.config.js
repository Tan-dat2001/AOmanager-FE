// >>>> Recoil: Duplicate atom key
// https://github.com/facebookexperimental/Recoil/issues/733#issuecomment-923492445
const intercept = require("intercept-stdout");

// safely ignore recoil warning messages in dev (triggered by HMR)
function interceptStdout(text) {
  if (text.includes("Duplicate atom key")) {
    return "";
  }
  return text;
}
// <<<< Recoil: Duplicate atom key

if (process.env.NODE_ENV === "development") {
  intercept(interceptStdout);
}

/** @type {import('next').NextConfig} */

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      loader: "file-loader",
      options: {
        outputPath: "images",
      },
    });
    return config;
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  env: {
    BASE_URL: "http://localhost:8080/api",
  }
};
