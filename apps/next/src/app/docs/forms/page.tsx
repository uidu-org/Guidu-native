"use client"


import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@uidu/button-ui";
import { CheckboxBase } from "@uidu/checkbox-ui";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@uidu/command-ui";
import { RHFCheckbox, RHFInput, RHFRadioGroup, RHFSelect, UiForm } from "@uidu/forms-ui";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "@uidu/popover-ui";
import { CarFront } from "lucide-react";
import { useState } from "react";
import { Control, Controller, useForm, } from "react-hook-form";
import { useList } from "react-use";
import { z } from "zod";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    selectTest: z.string().min(2, {
        message: "Select is required by zod",
    }),
    multiselect: z.array(z.string()).refine(data => data.length >= 1, {
        message: "multiselect must contain at least 1 item.",
    }),
    checkboxTest: z.literal<boolean>(true, { errorMap: () => ({ message: "Custom message here", }), }),
    radioTest: z.string().min(1, {
        message: "use a radio",
    })
});


export default function FormsIndexPage() {
    // { control, formState: { errors }, watch, handleSubmit }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            multiselect: [""],
            checkboxTest: false,
            radioTest: "",
            selectTest: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className="min-h-dvh">
            <UiForm {...form} >
                <form id="formica" className="p-4" onSubmit={form.handleSubmit(onSubmit)}>

                    <RHFInput
                        name="username"
                        control={form.control}
                        rules={{ required: "required! jhgfdre" }}
                        error={(form.formState.errors?.username?.message as string)}
                        helperText="chooseeeeeeeee"
                    />

                    {/* <RHFPinCode name="pin-code" control={form.control} rules={{ required: true }} mask /> */}

                    <div>
                        {/* <RHFCalendar name="calendarTest" control={form.control} rules={{ required: "123s" }} key={"1"} dateFormat="d MMMM yyyy, h:mm aa" /> */}
                    </div>

                    <MyComboBox
                        name={"multiselect"}
                        control={form.control}
                        initialItems={[
                            {
                                value: "next.js",
                                label: "Next.js",
                            }
                        ]} />

                    <RHFCheckbox
                        name="checkboxTest"
                        control={form.control}
                        rules={{ required: true }}
                        error={(form.formState.errors?.username?.message as string)}
                        helperText="checkbox helper text" />

                    <RHFRadioGroup
                        name="radioTest"
                        control={form.control}
                        rules={{ required: true }}
                        error={(form.formState.errors?.username?.message as string)}
                        helperText="checkbox helper text"
                        values={["1", "2", "3", "4"]}
                        label="choose one"
                    />

                    <RHFSelect
                        name="selectTest"
                        control={form.control}
                        rules={{ required: true }}
                        error={(form.formState.errors?.username?.message as string)}
                        helperText="checkbox helper text"
                        items={frameworks}
                    />

                </form>

            </UiForm>


            <hr />

            <div className="h-96">

            </div>

            <hr />

            <Button form="formica" type="submit" > Invia </Button>

            <hr />

            {/* <Multiselect initialItems={ } options={ } /> */}


        </div>
    )

}


function MyComboBox({ initialItems, control, name }: { control: Control }) {


    const [value, { push, removeAt }] = useList<string>(initialItems.map((i) => i.value));

    const [open, setOpen] = useState(false)


    const handleItemSelect = (itemValue: string) => {
        // Check if the value is already in the array
        if (value.includes(itemValue)) {
            // If it exists, remove it
            removeAt(value.indexOf(itemValue));
        } else {
            // If it doesn't exist, push it
            push(itemValue);
        }
    };

    return (
        <>

            <Controller
                rules={{ required: true }}
                name={name}
                control={control}
                render={({ field: { onChange } }) => (
                    <PopoverRoot open={open} onOpenChange={setOpen} >
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between"
                            >
                                {value
                                    ? frameworks.find((framework) => framework.value === value)?.label
                                    : "Select framework..."}
                                <CarFront className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <Command>
                            <PopoverContent>

                                <CommandInput
                                    placeholder="Filter fruits"
                                    aria-label="Filter fruits"
                                />

                                <CommandEmpty>No framework found.</CommandEmpty>

                                <CommandGroup >
                                    {frameworks.map((fr) => (
                                        <CommandItem
                                            style={{
                                                backgroundColor: value.includes(fr.value) ? "gray" : undefined
                                            }}
                                            key={fr.value}
                                            // onSelect={() => {
                                            //     console.log(fr.value)
                                            //     handleItemSelect(fr.value)
                                            // }}
                                            value={fr.value} >
                                            {fr.label}
                                            <span className="ml-auto" >
                                                <CheckboxBase className=" h-4 w-4" checked={value.includes(fr.value)} onCheckedChange={() => {
                                                    if (value.includes(fr.value)) {
                                                        // If it exists, remove it
                                                        removeAt(value.indexOf(fr.value));
                                                        onChange(value.filter((val) => val !== fr.value))

                                                    } else {
                                                        // If it doesn't exist, push it
                                                        push(fr.value);
                                                        onChange([...value, fr.value])
                                                    }
                                                }} />

                                            </span>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>

                            </PopoverContent>
                        </Command>
                    </PopoverRoot>
                )} />
            <Button onClick={() => {
                console.log(value);

            }} >Stampa value</Button>
        </>
    );
}

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]