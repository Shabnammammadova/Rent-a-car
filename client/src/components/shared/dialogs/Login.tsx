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
import GithubIcon from "@/assets/images/github-icon.png"
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
import { Link, useNavigate } from "react-router-dom"
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
    const navigate = useNavigate()
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
    const handleForgotPasswordClick = () => {
        closeDialog();
        navigate("/forgot-password");
    };


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

                            <Link to={"/forgot-password"} className="text-primary m-auto flex justify-center underline" onClick={handleForgotPasswordClick}>Forgot Password?</Link>
                            <Button className="w-full"
                                disabled={isPending}
                                type="submit">Sign In</Button>

                        </form>
                    </Form>
                    <div className="flex flex-col">
                        <button
                            className="w-[300px] mb-2 mt-2 flex mx-auto  justify-center items-center gap-2  p-2 cursor-pointer border border-solid rounded-3xl  border-inherit font-bold"
                            onClick={() => {
                                window.location.href = "http://localhost:3000/auth/google";
                            }}
                        >
                            <img src={GoogleIcon} className="w-[1.5rem] h-[1.5rem]" alt="" />
                            Google
                        </button>
                        <button
                            className="w-[300px] mb-2 mt-2 flex mx-auto  justify-center items-center gap-2 p-2 cursor-pointer border border-solid rounded-3xl  border-inherit font-bold"
                            onClick={() => {
                                window.location.href = "http://localhost:3000/auth/github";
                            }}
                        >
                            <img src={GithubIcon} className="w-[1.5rem] h-[1.5rem] " alt="" />
                            Github
                        </button>
                    </div>

                </DialogContent>
            </>

        </Dialog>
    )
}