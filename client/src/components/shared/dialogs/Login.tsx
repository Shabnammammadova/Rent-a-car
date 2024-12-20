import { ModalEnum, useDialog } from "@/hooks/useDialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "../../ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import GoogleIcon from "@/assets/images/google-icon.png"
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
const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
})



export const LoginDialog = () => {
    const { isOpen, closeDialog, openDialog, type } = useDialog()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    const dispatch = useAppDispatch()
    const { mutate, isPending } = useMutation({
        mutationFn: authService.login,
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


    if (isOpen && type !== ModalEnum.LOGIN) {
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
                        <DialogTitle className="text-xl lg:text-3xl">Sign In</DialogTitle>
                        <DialogDescription>

                            Don't have an account?{""}
                            <button onClick={() => openDialog(ModalEnum.REGISTER)} className="text-primary">Create an account</button>

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
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <button onClick={() => openDialog(ModalEnum.FORGOTPASSWORD)} className="text-primary m-auto flex justify-center underline">Forget Password?</button>
                            <Button className="w-full"
                                disabled={isPending}
                                type="submit">Sign In</Button>

                        </form>
                    </Form>
                    <div className="mt-4 text-center">
                        <button
                            className="w-[300px] mb-2 mt-2 flex mx-auto  justify-center items-center gap-8 p-2 cursor-pointer border border-solid rounded-3xl  border-inherit"
                            onClick={() => {
                                window.location.href = "http://localhost:3000/auth/google";
                            }}
                        >
                            <img src={GoogleIcon} className="w-[1.5rem] h-[1.5rem]" alt="" />
                            Sign In with Google
                        </button>
                    </div>
                </DialogContent>
            </>

        </Dialog>
    )
}