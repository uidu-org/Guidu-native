import BreadcrumbDemo from "@/docs/demos/breadcrumb-demo";
import Link from "next/link";

export default function Page() {
  return (
    <div className='grid place-content-center h-screen'>
      <p>Page Blog</p>
      <Link className="underline" href={"/"}>Go Back</Link>
      <BreadcrumbDemo />
    </div>
  )
}
