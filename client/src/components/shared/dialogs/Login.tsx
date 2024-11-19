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

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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

    if (isOpen && type !== ModalEnum.LOGIN) {
        return null
    }


    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }



    return (
        <Dialog open={isOpen} onOpenChange={closeDialog}>
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
                                        <Input placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="w-full" type="submit">Sign In</Button>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}