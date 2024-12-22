import { ModalEnum, useDialog } from "@/hooks/useDialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "../../ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import authService from "@/services/auth/auth"
import { AxiosError } from "axios"
import { AuthResponseType } from "@/services/auth/types"
import { toast } from "sonner"
import { getCurrentUserAsync } from "@/store/features/userSlice"
import { useAppDispatch } from "@/hooks/redux"
import { Button } from "@/components/ui/button"
const formSchema = z.object({
    email: z.string().min(2).max(50),
})



export const ForgotPasswordDialog = () => {
    const { isOpen, closeDialog, openDialog, type } = useDialog()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })
    const dispatch = useAppDispatch()
    const { mutate, isPending } = useMutation({
        mutationFn: authService.forgotPassword,
        onSuccess: (response) => {
            toast.success(response.data.message);
            closeDialog()
            dispatch(getCurrentUserAsync())
        },
        onError: (error: AxiosError<AuthResponseType>) => {
            const message = error.response?.data.message ?? "Something went wrong!Please try again.";
            toast.error(message)

        }
    })


    if (isOpen && type !== ModalEnum.FORGOTPASSWORD) {
        return null
    }


    function onSubmit(values: z.infer<typeof formSchema>) {

        mutate(values)
    }



    return (
        <Dialog open={isOpen} onOpenChange={closeDialog}>
            <>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogDescription>
                            <button onClick={() => openDialog(ModalEnum.FORGOTPASSWORD)} className="text-primary">Send link</button>
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="name@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button className="w-full"
                                disabled={isPending}
                                type="submit">Back</Button>

                        </form>
                    </Form>
                </DialogContent>
            </>

        </Dialog>
    )
}