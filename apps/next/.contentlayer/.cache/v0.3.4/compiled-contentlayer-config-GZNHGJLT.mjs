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
    registryDependencies: ["accordion"],
    component: React.lazy(() => import("@/docs/components/example/accordion-demo")),
    files: ["src/docs/components/example/accordion-demo.tsx"]
  },
  "alert-demo": {
    name: "alert-demo",
    type: "components:example",
    registryDependencies: ["alert"],
    component: React.lazy(() => import("@/docs/components/example/alert-demo")),
    files: ["src/docs/components/example/alert-demo.tsx"]
  },
  "alert-destructive": {
    name: "alert-destructive",
    type: "components:example",
    registryDependencies: ["alert"],
    component: React.lazy(() => import("@/docs/components/example/alert-destructive")),
    files: ["src/docs/components/example/alert-destructive.tsx"]
  },
  "alert-dialog-demo": {
    name: "alert-dialog-demo",
    type: "components:example",
    registryDependencies: ["alert-dialog", "button"],
    component: React.lazy(() => import("@/docs/components/example/alert-dialog-demo")),
    files: ["src/docs/components/example/alert-dialog-demo.tsx"]
  },
  "avatar-demo": {
    name: "avatar-demo",
    type: "components:example",
    registryDependencies: ["avatar"],
    component: React.lazy(() => import("@/docs/components/example/avatar-demo")),
    files: ["src/docs/components/example/avatar-demo.tsx"]
  },
  "badge-demo": {
    name: "badge-demo",
    type: "components:example",
    registryDependencies: ["badge"],
    component: React.lazy(() => import("@/docs/components/example/badge-demo")),
    files: ["src/docs/components/example/badge-demo.tsx"]
  },
  "badge-destructive": {
    name: "badge-destructive",
    type: "components:example",
    registryDependencies: ["badge"],
    component: React.lazy(() => import("@/docs/components/example/badge-destructive")),
    files: ["src/docs/components/example/badge-destructive.tsx"]
  },
  "badge-outline": {
    name: "badge-outline",
    type: "components:example",
    registryDependencies: ["badge"],
    component: React.lazy(() => import("@/docs/components/example/badge-outline")),
    files: ["src/docs/components/example/badge-outline.tsx"]
  },
  "badge-secondary": {
    name: "badge-secondary",
    type: "components:example",
    registryDependencies: ["badge"],
    component: React.lazy(() => import("@/docs/components/example/badge-secondary")),
    files: ["src/docs/components/example/badge-secondary.tsx"]
  },
  "button-demo": {
    name: "button-demo",
    type: "components:example",
    registryDependencies: ["button"],
    component: React.lazy(() => import("@/docs/components/example/button-demo")),
    files: ["src/docs/components/example/button-demo.tsx"]
  },
  "button-secondary": {
    name: "button-secondary",
    type: "components:example",
    registryDependencies: ["button"],
    component: React.lazy(() => import("@/docs/components/example/button-secondary")),
    files: ["src/docs/components/example/button-secondary.tsx"]
  },
  "button-destructive": {
    name: "button-destructive",
    type: "components:example",
    registryDependencies: ["button"],
    component: React.lazy(() => import("@/docs/components/example/button-destructive")),
    files: ["src/docs/components/example/button-destructive.tsx"]
  },
  "button-outline": {
    name: "button-outline",
    type: "components:example",
    registryDependencies: ["button"],
    component: React.lazy(() => import("@/docs/components/example/button-outline")),
    files: ["src/docs/components/example/button-outline.tsx"]
  },
  "button-ghost": {
    name: "button-ghost",
    type: "components:example",
    registryDependencies: ["button"],
    component: React.lazy(() => import("@/docs/components/example/button-ghost")),
    files: ["src/docs/components/example/button-ghost.tsx"]
  },
  "button-link": {
    name: "button-link",
    type: "components:example",
    registryDependencies: ["button"],
    component: React.lazy(() => import("@/docs/components/example/button-link")),
    files: ["src/docs/components/example/button-link.tsx"]
  },
  "button-with-icon": {
    name: "button-with-icon",
    type: "components:example",
    registryDependencies: ["button"],
    component: React.lazy(() => import("@/docs/components/example/button-with-icon")),
    files: ["src/docs/components/example/button-with-icon.tsx"]
  },
  "button-loading": {
    name: "button-loading",
    type: "components:example",
    registryDependencies: ["button"],
    component: React.lazy(() => import("@/docs/components/example/button-loading")),
    files: ["src/docs/components/example/button-loading.tsx"]
  },
  "button-icon": {
    name: "button-icon",
    type: "components:example",
    registryDependencies: ["button"],
    component: React.lazy(() => import("@/docs/components/example/button-icon")),
    files: ["src/docs/components/example/button-icon.tsx"]
  },
  "button-as-child": {
    name: "button-as-child",
    type: "components:example",
    registryDependencies: ["button"],
    component: React.lazy(() => import("@/docs/components/example/button-as-child")),
    files: ["src/docs/components/example/button-as-child.tsx"]
  },
  "card-demo": {
    name: "card-demo",
    type: "components:example",
    registryDependencies: ["card", "button", "switch"],
    component: React.lazy(() => import("@/docs/components/example/card-demo")),
    files: ["src/docs/components/example/card-demo.tsx"]
  },
  "card-with-form": {
    name: "card-with-form",
    type: "components:example",
    registryDependencies: ["button", "card", "input", "label", "select"],
    component: React.lazy(() => import("@/docs/components/example/card-with-form")),
    files: ["src/docs/components/example/card-with-form.tsx"]
  },
  "carousel-demo": {
    name: "carousel-demo",
    type: "components:example",
    registryDependencies: ["carousel"],
    component: React.lazy(() => import("@/docs/components/example/carousel-demo")),
    files: ["src/docs/components/example/carousel-demo.tsx"]
  },
  "carousel-size": {
    name: "carousel-size",
    type: "components:example",
    registryDependencies: ["carousel"],
    component: React.lazy(() => import("@/docs/components/example/carousel-size")),
    files: ["src/docs/components/example/carousel-size.tsx"]
  },
  "carousel-spacing": {
    name: "carousel-spacing",
    type: "components:example",
    registryDependencies: ["carousel"],
    component: React.lazy(() => import("@/docs/components/example/carousel-spacing")),
    files: ["src/docs/components/example/carousel-spacing.tsx"]
  },
  "carousel-orientation": {
    name: "carousel-orientation",
    type: "components:example",
    registryDependencies: ["carousel"],
    component: React.lazy(() => import("@/docs/components/example/carousel-orientation")),
    files: ["src/docs/components/example/carousel-orientation.tsx"]
  },
  "carousel-api": {
    name: "carousel-api",
    type: "components:example",
    registryDependencies: ["carousel"],
    component: React.lazy(() => import("@/docs/components/example/carousel-api")),
    files: ["src/docs/components/example/carousel-api.tsx"]
  },
  "carousel-plugin": {
    name: "carousel-plugin",
    type: "components:example",
    registryDependencies: ["carousel"],
    component: React.lazy(() => import("@/docs/components/example/carousel-plugin")),
    files: ["src/docs/components/example/carousel-plugin.tsx"]
  },
  "checkbox-demo": {
    name: "checkbox-demo",
    type: "components:example",
    registryDependencies: ["checkbox"],
    component: React.lazy(() => import("@/docs/components/example/checkbox-demo")),
    files: ["src/docs/components/example/checkbox-demo.tsx"]
  },
  "checkbox-disabled": {
    name: "checkbox-disabled",
    type: "components:example",
    registryDependencies: ["checkbox"],
    component: React.lazy(() => import("@/docs/components/example/checkbox-disabled")),
    files: ["src/docs/components/example/checkbox-disabled.tsx"]
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
//# sourceMappingURL=compiled-contentlayer-config-GZNHGJLT.mjs.map
