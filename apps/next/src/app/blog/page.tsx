import BreadcrumbDemo from "@/docs/demos/breadcrumb-demo";
import ToastDemo from "@/docs/demos/toast-demo";
import { Button, ButtonGroup } from "@uidu/core-ui";
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
      <ButtonGroup>
        
        <Button isLoading className="text-black" >icona</Button>
        <Button variant={"danger"} className="text-black" >danger</Button>
        <Button  className="text-black" >icona</Button>
       
      </ButtonGroup>
    </div>
  );
}
