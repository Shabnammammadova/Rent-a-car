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
import { PhoneInput } from "@/components/ui/phone-input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/query-keys"
import { RenderIf } from "@/components/shared/RenderIf"
import { DatePicker } from "@/components/ui/date-picker"
import { cn } from "@/lib/utils"
import { useNavigate, useParams } from "react-router-dom"
import { AxiosError, AxiosResponse } from "axios"
import { GetByIdRentResponseType } from "@/services/rent/types"
import { Location } from "@/types"
import { useEffect } from "react"
import reservationService from "@/services/reservation"
import Spinner from "@/components/shared/Spinner"
import { paths } from "@/constants/paths"
import { toast } from "sonner"
import { CreateReservationResponseType } from "@/services/reservation/types"



const FormSchema = z.object({
    name: z.string().min(4, {
        message: "Name must be at least 4 characters.",
    }),
    phoneNumber: z.string().min(1, {
        message: "Phone number is required"
    }),
    address: z.string().min(4, {
        message: "Adresses must be at least 4 characters"
    }),
    city: z.string().min(4, {
        message: "City must be at least 4 characters.",
    }),
    pickUpLocation: z.string().min(1, {
        message: "Pick up location is required",
    }),
    dropOffLocation: z.string().min(1, {
        message: "Drop off location is required"
    }),
    pickUpDate: z.string().min(1, {
        message: "Pick up date is required"
    }),
    dropOffDate: z.string().min(1, {
        message: "Drop off date is required"
    }),
    newsLetter: z.literal<boolean>(true, {
        message: "You must agree to receive newsLetter"
    }),
    termsConditions: z.literal<boolean>(true, {
        message: "You must agree to terms and conditions"
    })
})

type FormType = UseFormReturn<z.infer<typeof FormSchema>>

// type Props = {
//     possibleDropOffLocation: Location[];
//     pickUpLocation: Location
// }

export const Info = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>()
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
            newsLetter: false,
            termsConditions: false
        },
    })
    const { mutate, isPending } = useMutation({
        mutationFn: reservationService.create,
        onSuccess: () => {
            toast.success("Reservation created successfully")
            navigate(paths.RESERVATIONS);
            form.reset()
        },
        onError:
            (error: AxiosError<CreateReservationResponseType>) => {
                toast.error(error?.response?.data?.message || "Something went wrong")
            }
    })
    function onSubmit(data: z.infer<typeof FormSchema>) {
        const payload = {
            rentId: id!,
            startDate: data.pickUpDate,
            endDate: data.dropOffDate,
            billingName: data.name,
            billingPhoneNumber: data.phoneNumber,
            billingAddress: data.address,
            billingTownCity: data.city,
            dropOffLocation: data.dropOffLocation,
            pickUpLocation: data.pickUpLocation
        }
        mutate(payload)

    }

    return (
        <Form {...form}>
            <form className="flex flex-col lg:gap-y-8 gap-y-6 lg:order-none order-1" onSubmit={form.handleSubmit(onSubmit)}>
                <BillingStep form={form} />
                <RentalStep form={form} />
                <ConfirmationStep pending={isPending} form={form} />
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
                            {/* <Input placeholder="Phone Number" {...field} /> */}
                            <PhoneInput defaultCountry="US" international placeholder="Your Number" />
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
    const { id } = useParams<{ id: string }>()
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData([QUERY_KEYS.RENT_DETAIL, id]) as AxiosResponse;


    const rentData = data?.data as GetByIdRentResponseType || null
    const possibleDropOffLocationss = rentData?.item.dropOffLocations as Location[] ?? []
    const pickUpLocation = rentData?.item.pickUpLocation as Location


    useEffect(() => {
        form.setValue("pickUpLocation", pickUpLocation._id)
    }, [])
    // const { data: locationData, isLoading: locationLoading } = useQuery({
    //     queryKey: [QUERY_KEYS.LOCATIONS],
    //     queryFn: locationService.getAll
    // })

    // const locations = locationData?.data?.items ?? []

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
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your city" />
                                </SelectTrigger>
                            </FormControl>
                            {/* <SelectItem value={pickUpLocation._id} disabled>
                                {pickUpLocation.name}
                            </SelectItem> */}
                            {pickUpLocation && pickUpLocation._id && (
                                <SelectItem value={pickUpLocation._id} disabled>
                                    {pickUpLocation.name}
                                </SelectItem>
                            )}

                            <SelectContent>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="pickUpDate"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Date</FormLabel>
                        <DatePicker hidePastDates
                            variant="secondary"
                            onChange={(date) => field.onChange(date?.toISOString() || "")} />
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
                        <FormLabel>Location</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your city" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <RenderIf condition={possibleDropOffLocationss.length === 0}>
                                    <SelectItem value="-" disabled>
                                        No drop off locations available

                                    </SelectItem>
                                </RenderIf>
                                {possibleDropOffLocationss.map((location) => (
                                    <SelectItem key={location._id} value="loading">
                                        {location.name}
                                    </SelectItem>

                                ))}


                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="pickUpDate"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Date</FormLabel>
                        <DatePicker hidePastDates onChange={(date) => field.onChange(date?.toISOString() || "")} />
                        <FormMessage />
                    </FormItem>
                )}
            />

        </div>
    </div >

}

const ConfirmationStep = ({ form, pending }: { form: FormType, pending: boolean }) => {
    const errors = form.formState.errors
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
                            <FormLabel className={cn("cursor-pointer", errors.newsLetter && "text-red-500")}>
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
                            <FormLabel className={cn("cursor-pointer", errors.termsConditions && "text-red-500")}>
                                I agree with our terms and conditions and privacy policy.
                            </FormLabel>

                        </div>
                    </FormItem>
                )}
            />
            <Button disabled={pending} className="lg:mt-8 mt-6">
                <RenderIf condition={pending}>
                    <Spinner />
                </RenderIf>
                Rent Now</Button>
        </div>
    </div>
}