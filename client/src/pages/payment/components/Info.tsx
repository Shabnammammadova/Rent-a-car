import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"

// import { toast } from "@/components/hooks/use-toast"
// import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"



const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    phoneNumber: z.string(),
    address: z.string(),
    city: z.string(),
    pickUpLocation: z.string(),
    dropOffLocation: z.string(),
    pickUpDate: z.string(),
    dropOffDate: z.string(),
    pickUpTime: z.string(),
    dropOffTime: z.string(),
    newsLetter: z.boolean(),
    termsConditions: z.boolean()
})

type FormType = UseFormReturn<z.infer<typeof FormSchema>>

export const Info = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            phoneNumber: "",
            address: "",
            city: "",
            pickUpLocation: "",
            dropOffLocation: "",
            pickUpDate: "",
            dropOffDate: "",
            pickUpTime: "",
            dropOffTime: "",
            newsLetter: false,
            termsConditions: false
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);

    }

    return (
        <Form {...form}>
            <form className="flex flex-col lg:gap-y-8 gap-y-6 lg:order-none order-1" onSubmit={form.handleSubmit(onSubmit)}>
                <BillingStep form={form} />
                <RentalStep form={form} />
                <ConfirmationStep form={form} />
            </form>
        </Form>
    )
}


const BillingStep = ({ form }: { form: FormType }) => {
    return <div className="rounded-[10px] bg-white w-full lg:p-6 p-4">
        <div className="flex justify-between items-end">
            <div>
                <h3 className="text-lg lg:text-xl font-bold leading-[150%] tracking-[-0.6px] text-secondary-500">Billing Info</h3>
                <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6 ">Please enter your billing info</p>
            </div>
            <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6 ">Step 1 of 3</p>
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-2  gap-x-6  lg:gap-x-8 gap-y-4 lg:gap-y-6">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                            <Input placeholder="Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Town/City</FormLabel>
                        <FormControl>
                            <Input placeholder="Town or City" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    </div>
}


const RentalStep = ({ form }: { form: FormType }) => {
    return <div className="rounded-[10px] bg-white w-full lg:p-6 p-4"><div className="flex justify-between items-end">
        <div>
            <h3 className="text-lg lg:text-xl font-bold leading-[150%] tracking-[-0.6px] text-secondary-500">Rental Info</h3>
            <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6 ">Please select your rental dateinfo</p>
        </div>
        <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6 ">Step 2 of 3</p>
    </div>
        <div className="flex items-center gap-x-2 mb-4 lg:mb-6">
            <span className="inline-block w-4 h-4 border-4 border-[rgba(53,99,233,0.30)] rounded-full">
                <span className="block w-2 h-2 bg-primary rounded-full" />
            </span>
            <p className="text-secondary-500 font-semibold text-base leading-[20px] tracking-[-0.32px]">
                Pick - Up
            </p>
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-2  gap-x-6  lg:gap-x-8 gap-y-4 lg:gap-y-6">
            <FormField
                control={form.control}
                name="pickUpLocation"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Locations</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your city" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="pickUpLocation"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Date</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your date" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="pickUpLocation"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your time" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </div>
        <div className="flex items-center gap-x-2 mb-4 lg:mb-6 mt-8">
            <span className="inline-block w-4 h-4 border-4 border-[rgba(53,99,233,0.30)] rounded-full">
                <span className="block w-2 h-2 bg-information rounded-full" />
            </span>
            <p className="text-secondary-500 font-semibold text-base leading-[20px] tracking-[-0.32px]">
                Drop-Off
            </p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-4 lg:gap-y-6">
            <FormField
                control={form.control}
                name="pickUpLocation"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Locations</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your city" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="pickUpLocation"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Date</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your date" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="pickUpLocation"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your time" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </div>
    </div>

}

const ConfirmationStep = ({ form }: { form: FormType }) => {
    return <div className="rounded-[10px] bg-white w-full lg:p-6 p-4">
        <div className="flex justify-between items-end">
            <div>
                <h3 className="text-lg lg:text-xl font-bold leading-[150%] tracking-[-0.6px] text-secondary-500">Confirmation</h3>
                <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6 ">We are getting to the end. Just few clicks and your rental is ready!</p>
            </div>
            <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6 ">Step 3 of 3</p>
        </div>
        <div>
            <FormField
                control={form.control}
                name="newsLetter"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-5 space-y-0 rounded-[10px] bg-[#F6F7F9] p-4 lg:px-8">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className="leading-none">
                            <FormLabel className="cursor-pointer">
                                I agree with sending an Marketing and newsletter emails. No spam, promissed!
                            </FormLabel>

                        </div>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="termsConditions"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-5 space-y-0 rounded-[10px] bg-[#F6F7F9] p-4 lg:px-8 mt-6">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className="leading-none">
                            <FormLabel className="cursor-pointer">
                                I agree with our terms and conditions and privacy policy.
                            </FormLabel>

                        </div>
                    </FormItem>
                )}
            />
            <Button className="lg:mt-8 mt-6">Rent Now</Button>
        </div>
    </div>
}