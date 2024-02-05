"use client"


import { Button } from "@uidu/button-ui"
import { RHFInput } from "@uidu/input-ui"
import { useForm } from "react-hook-form"



export default function FormsIndexPage() {

    const { control, formState: { errors }, watch, handleSubmit } = useForm()

    return (
        <div className="min-h-dvh">
            <form className="p-4" onSubmit={handleSubmit((data) => console.log(data))}>


                <RHFInput
                    name="test1"
                    control={control}
                    rules={{ required: "required! jhgfdre" }}
                    error={(errors?.test1?.message as string)}
                    helperText="chooseeeeeeeee"
                />


                <Button type="submit" > Invia </Button>
            </form>
        </div>
    )
}
