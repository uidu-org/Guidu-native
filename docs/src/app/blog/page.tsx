import BreadcrumbDemo from "@/docs/demos/core/breadcrumb-demo";
import ToastDemo from "@/docs/demos/core/toast-demo";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid h-screen place-content-center">
      <p>Page Blog</p>
      <Link className="underline" href={"/"}>
        Go Back
      </Link>
      <BreadcrumbDemo />
      <ToastDemo />
    </div>
  );
}
