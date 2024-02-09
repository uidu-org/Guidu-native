import { DocsToc } from "@/components/layout/DocsToc";
import { Route } from "@/components/layout/Sidebar";
import { MDXContent } from "@/docs/components/mdx-content";
import { getHeadings } from "@/lib/getHeadings";
import { allDocs } from "contentlayer/generated";

interface ComponentList {
    [key: string]: React.FC;
}

type SlugKey = keyof ComponentList;

interface DocPageProps {
    params: {
        slug: string[];
    };
}

async function getDocFromParams({ params }: DocPageProps) {
    const slug = params.slug?.join("/") || "";
    console.log("slug", slug);

    const doc = allDocs.find((doc) => doc.slugAsParams === slug);

    if (!doc) {
        null;
    }

    const headings = getHeadings(doc?.body.raw);

    const currentRoute: Route = {
        key: doc?._id,
        title: doc?.title,
        path: `/${doc?._raw?.sourceFilePath}`,
    };

    return { doc, headings, currentRoute };
}

export default async function DocsPages({ params }: DocPageProps) {
    const slug = params.slug?.join("") || ""

    const { doc, headings, currentRoute } = await getDocFromParams({ params });


    // if (!componentList.hasOwnProperty(slug)) return null
    // const Component = componentList[slug]

    // const headings = getHeadings(
    //     //docs stringify per leggere e creare i #inner anchor link
    // );

    return (
        <>
            <div className="col-span-12 lg:col-span-10 xl:col-span-8 lg:px-16 mt-10">
                <div className="w-full prose prose-neutral">

                    <MDXContent code={doc.body.code} />

                </div>
            </div>
            {headings && headings.length > 0 && (
                <div className="hidden z-10 xl:flex xl:col-span-2 mt-8 pl-4">
                    <DocsToc headings={headings} />
                </div>
            )}
        </>

    )
}
