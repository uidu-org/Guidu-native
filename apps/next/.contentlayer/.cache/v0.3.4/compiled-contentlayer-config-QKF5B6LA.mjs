// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";

// src/lib/rehype-component.ts
import fs from "fs";
import path from "path";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

// __registry__/index.tsx
import * as React from "react";
var Index = {
  "accordion-demo": {
    name: "accordion-demo",
    type: "components:example",
    egistryDependencies: ["accordion"],
    component: React.lazy(() => import("@/docs/components/example/accordion-demo")),
    files: ["src/docs/components/example/accordion-demo.tsx"]
  },
  "alert-demo": {
    name: "alert-demo",
    type: "components:example",
    egistryDependencies: ["alert"],
    component: React.lazy(() => import("@/docs/components/example/alert-demo")),
    files: ["src/docs/components/example/alert-demo.tsx"]
  },
  "alert-destructive": {
    name: "alert-destructive",
    type: "components:example",
    egistryDependencies: ["alert"],
    component: React.lazy(() => import("@/docs/components/example/alert-destructive")),
    files: ["src/docs/components/example/alert-destructive.tsx"]
  },
  "alert-dialog-demo": {
    name: "alert-dialog-demo",
    type: "components:example",
    egistryDependencies: ["alert-dialog", "button"],
    component: React.lazy(() => import("@/docs/components/example/alert-dialog-demo")),
    files: ["src/docs/components/example/alert-dialog-demo.tsx"]
  },
  "avatar-demo": {
    name: "avatar-demo",
    type: "components:example",
    egistryDependencies: ["avatar"],
    component: React.lazy(() => import("@/docs/components/example/avatar-demo")),
    files: ["src/docs/components/example/avatar-demo.tsx"]
  },
  "badge-demo": {
    name: "badge-demo",
    type: "components:example",
    egistryDependencies: ["badge"],
    component: React.lazy(() => import("@/docs/components/example/badge-demo")),
    files: ["src/docs/components/example/badge-demo.tsx"]
  },
  "badge-destructive": {
    name: "badge-destructive",
    type: "components:example",
    egistryDependencies: ["badge"],
    component: React.lazy(() => import("@/docs/components/example/badge-destructive")),
    files: ["src/docs/components/example/badge-destructive.tsx"]
  },
  "badge-outline": {
    name: "badge-outline",
    type: "components:example",
    egistryDependencies: ["badge"],
    component: React.lazy(() => import("@/docs/components/example/badge-outline")),
    files: ["src/docs/components/example/badge-outline.tsx"]
  },
  "badge-secondary": {
    name: "badge-secondary",
    type: "components:example",
    egistryDependencies: ["badge"],
    component: React.lazy(() => import("@/docs/components/example/badge-secondary")),
    files: ["src/docs/components/example/badge-secondary.tsx"]
  },
  "button-demo": {
    name: "button-demo",
    type: "components:example",
    egistryDependencies: ["button"],
    component: React.lazy(() => import("@/docs/components/example/button-demo")),
    files: ["src/docs/components/example/button-demo.tsx"]
  }
};

// src/lib/rehype-component.ts
function rehypeComponent() {
  return async (tree) => {
    visit(tree, (node) => {
      const { value: srcPath } = getNodeAttributeByName(node, "src") || {};
      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value;
        const fileName = getNodeAttributeByName(node, "fileName")?.value;
        if (!name && !srcPath) {
          return null;
        }
        try {
          for (const component of Object.values(Index)) {
            let src;
            if (srcPath) {
              src = srcPath;
            } else {
              src = fileName ? component.files.find((file) => {
                return file.endsWith(`${fileName}.tsx`) || file.endsWith(`${fileName}.ts`);
              }) || component.files[0] : component.files[0];
            }
            const filePath = path.join(process.cwd(), src);
            let source = fs.readFileSync(filePath, "utf8");
            source = source.replaceAll(
              `@/docs/components/example${component.name}/`,
              "@/components/"
            );
            source = source.replaceAll("export default", "export");
            node.children?.push(
              u("element", {
                tagName: "pre",
                properties: {
                  __src__: src,
                  __style__: component.name
                },
                attributes: [
                  {
                    name: "styleName",
                    type: "mdxJsxAttribute",
                    value: component.name
                  }
                ],
                children: [
                  u("element", {
                    tagName: "code",
                    properties: {
                      className: ["language-tsx"]
                    },
                    children: [
                      {
                        type: "text",
                        value: source
                      }
                    ]
                  })
                ]
              })
            );
          }
        } catch (error) {
          console.error(error);
        }
      }
      if (node.name === "ComponentPreview") {
        const name = getNodeAttributeByName(node, "name")?.value;
        if (!name) {
          return null;
        }
        try {
          for (const component of Object.values(Index)) {
            const src = component.files[0];
            const filePath = path.join(process.cwd(), src);
            let source = fs.readFileSync(filePath, "utf8");
            source = source.replaceAll(
              `@/docs/components/example${component.name}/`,
              "@/components/"
            );
            source = source.replaceAll("export default", "export");
            node.children?.push(
              u("element", {
                tagName: "pre",
                properties: {
                  __src__: src
                },
                children: [
                  u("element", {
                    tagName: "code",
                    properties: {
                      className: ["language-tsx"]
                    },
                    children: [
                      {
                        type: "text",
                        value: source
                      }
                    ]
                  })
                ]
              })
            );
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
}
function getNodeAttributeByName(node, name) {
  return node.attributes?.find((attribute) => attribute.name === name);
}

// contentlayer.config.js
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
  documentTypes: [Docs],
  mdx: {
    rehypePlugins: [rehypeComponent]
  }
});
export {
  Docs,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-QKF5B6LA.mjs.map
