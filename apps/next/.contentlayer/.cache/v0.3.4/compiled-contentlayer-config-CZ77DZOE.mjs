// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/")
  }
};
var Docs = defineDocumentType(() => ({
  name: "Docs",
  filePathPattern: `components/**/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string"
      // required: true,
    },
    description: {
      type: "string"
    }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./src/docs/content",
  documentTypes: [Docs]
});
export {
  Docs,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-CZ77DZOE.mjs.map
