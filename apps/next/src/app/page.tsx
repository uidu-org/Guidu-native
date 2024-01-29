"use client"

import { Button } from "@uidu/button-ui"
import { Input, RHFInput } from "@uidu/input-ui"
import { useForm } from "react-hook-form"

export default function Home() {

  const { control, handleSubmit } = useForm({})

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">


      {/* <Button variant={"default"} isLoading>
        Ciao gidu native
      </Button>


      <Avatar >
        <AvatarImage src="https://images.unsplash.com/photo-1537799943037-f5da89a65689?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <AvatarFallback >
          <p>Lorem, ipsum.</p>
        </AvatarFallback>
      </Avatar> */}


      <Input label="input text" className="" error="required" onChange={console.log} />

      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <RHFInput name="input1" control={control} rules={{ required: true }} />

        <Button type="submit" >
          Invia
        </Button>
      </form>

    </main>
  )
}
