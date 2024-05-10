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
      <div className="w-20 h-auto m-5 ">

      <Button className="text-black" >icona</Button>
        <Button variant={"danger"} className="text-black" >danger</Button>
        <Button  className="text-black" >icona</Button>
      </div>
       
      <div className="flex flex-col justify-start">
     <div> <span>Default</span><Badge variant={'default'} max={10} testId={"prova"} >{6}</Badge></div>
      <div><span>Added</span><Badge variant={'added'} max={30}>{23}</Badge></div>
      <div><span>Important</span><Badge variant={'important'} max={50}>{55}</Badge></div>
      <div><span>Primary</span><Badge variant={'primary'} max={70}>{2}</Badge></div>
      <div><span>PrimaryInverted</span><Badge variant={'primaryInverted'} max={99}>{100}</Badge></div>
      <div><span>Removed</span><Badge variant={'removed'} max={100}>{10000}</Badge></div>
      </div>
    </div>
  );
}
