
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="py-8 sm:py-16">
      <h1 className="mb-4 text-2xl font-semibold">Whaaat?..</h1>
      <p className="mb-8 text-sm text-muted-foreground">
         page not found...
        <br />
        Probably this page doesn't exist
      </p>
      <div className="flex flex-row gap-2">
        <Link href="/">
          Go to Homepage
        </Link>
      </div>
    </main>
  );
}
