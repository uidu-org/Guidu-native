import { docs } from "@/app/source";
import { DocsBody, DocsPage } from "fumadocs-ui/page";
import { ExternalLinkIcon } from "lucide-react";
import { notFound } from "next/navigation";

export default function Page({ params }: { params: { slug?: string[] } }) {
  const page = docs.getPage(params.slug);

  if (!page) notFound();

  const Content = page.data.exports.default;

  return (
      <DocsPage
        toc={page.data.exports.toc}
        tableOfContent={{
          footer: (
            <a
              // href={`https://github.com/yeecord/website/tree/master/${page.file.path}`}
              rel="noreferrer noopener"
              target="_blank"
              className="inline-flex items-center text-xs text-muted-foreground hover:text-accent-foreground"
            >
            - Github - <ExternalLinkIcon className="ml-2 h-3 w-3" />
            </a>
          ),
        }}
      >
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          {page.data.title}
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          {page.data.description}
        </p>
        <DocsBody>
          <Content />
        </DocsBody>
      </DocsPage>
  );
}

export function generateStaticParams(): { slug: string[] }[] {
  return docs.getPages().map((page) => ({
    slug: page.slugs,
  }));
}

// export function generateMetadata({ params }: { params: { slug?: string[] } }) {
//   const page = docs.getPage(params.slug);

//   if (page == null) notFound();

//   return {
//     title: page.data.title,
//     description: page.data.description,
//     alternates: {
//       canonical: `${domain}/docs/` + (params.slug ?? []).join("/"),
//     },
//     openGraph: {
//       images: {
//         url: `/og${page.url}.png`,
//         width: 1200,
//         height: 630,
//         alt: "Banner",
//       },
//       title: page.data.title,
//       description: page.data.description,
//     },
//   } satisfies Metadata;
// }
