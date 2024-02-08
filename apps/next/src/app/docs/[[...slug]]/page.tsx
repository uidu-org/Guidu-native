import { DocsToc } from "@/components/layout/DocsToc";
import { componentList } from "@/config/docsComponent";
import { getHeadings } from "@/lib/getHeadings";

interface ComponentList {
    [key: string]: React.FC;
}

type SlugKey = keyof ComponentList;

interface DocPageProps {
    params: {
        slug: string[];
    };
}


export default function DocsPages({ params }: DocPageProps) {
    const slug = params.slug?.join("") || ""

    if (!componentList.hasOwnProperty(slug)) return null
    const Component = componentList[slug]

    const headings = getHeadings(
        //docs stringify per leggere e creare i #inner anchor link
    );

    return (
        <>
            <div className="col-span-12 lg:col-span-10 xl:col-span-8 lg:px-16 mt-10">
                <div className="w-full prose prose-neutral">

                    <Component />

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
