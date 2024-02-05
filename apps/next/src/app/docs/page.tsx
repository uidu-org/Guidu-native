import Link from "next/link";

export default function IndexDocsPage() {
    return (
        <div className="min-h-dvh">

            <div>IndexDocsPage</div>
            <Link href="/docs/core/button">
                Go to Button
            </Link>
            <Link href="/docs/forms">
                Go to forms
            </Link>
        </div>
    )
}
