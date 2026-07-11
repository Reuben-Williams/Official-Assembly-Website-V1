const staticBasePath = process.env.NEXT_PUBLIC_STATIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: staticBasePath,
  assetPrefix: staticBasePath ? `${staticBasePath}/` : "",
};

export default nextConfig;
