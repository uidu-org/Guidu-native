import { map } from "@/_map";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";

export const docs = loader({
  rootDir: "docs",
  source: createMDXSource(map),
  baseUrl: "/docs",
});