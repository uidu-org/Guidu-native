import { componentList } from "@/config/docsComponent";

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

    return (

        <div className="col-span-12 lg:col-span-10 xl:col-span-8 lg:px-16 mt-10">
            <div className="w-full prose prose-neutral">

                <Component />

            </div>
        </div>

    )
}
