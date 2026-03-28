const createMDX = require("@next/mdx");

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({});

module.exports = withMDX(nextConfig);

