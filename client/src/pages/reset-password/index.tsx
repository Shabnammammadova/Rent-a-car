// import { Button } from "@/components/ui/button";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
// import authService from "@/services/auth/auth";
// import { AxiosError } from "axios";
// import { toast } from "sonner";


// const formSchema = z.object({
//     password: z.string().min(2).max(50),
//     confirmPassword: z.string().min(2).max(50),
// }).refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirm"],
// });

// export const ResetPassword = () => {
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             password: "",
//             confirmPassword: ""
//         },
//     })
//     const { mutate, isPending } = useMutation({
//         mutationFn: authService.resetPassword,
//         onSuccess: (response) => {
//             toast.success("Enter a new password for Morent App");
//             console.log(response);

//         },
//         onError: (error: AxiosError) => {
//             const message = error.response?.data?.message ?? "Something went wrong! Please try again.";
//             toast.error(message);
//         },
//     });

//     function onSubmit(values: z.infer<typeof formSchema>) {
//         mutate(values);
//     }

//     return (
//         <div className="container mx-auto py-16">
//             <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
//                 <h2 className="text-3xl font-bold text-center mb-4">Reset Password</h2>
//                 <p className="text-center mb-8">
//                     Enter a new password for Morent App.
//                 </p>
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                         <FormField
//                             control={form.control}
//                             name="password"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Password</FormLabel>
//                                     <FormControl>
//                                         <Input
//                                             type="password" placeholder="********" {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="confirmPassword"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Confirm Password</FormLabel>
//                                     <FormControl>
//                                         <Input
//                                             type="password" placeholder="********" {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <Button
//                             className="w-full"
//                             disabled={isPending}
//                             type="submit"
//                         >
//                             Reset Password
//                         </Button>
//                     </form>
//                 </Form>
//                 <div className="mt-4 text-center">
//                 </div>
//             </div>
//         </div>
//     );
// };



import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth/auth";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { paths } from "@/constants/paths";

const formSchema = z.object({
    password: z.string().min(2).max(50),
    confirmPassword: z.string().min(2).max(50),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
});

export const ResetPassword = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
    });
    const { mutate, isPending } = useMutation({
        mutationFn: authService.resetPassword,
        onSuccess: (response) => {
            toast.success("Password reset successful!");
            navigate(paths.HOME)
            console.log(response);
        },
        onError: (error: AxiosError) => {
            const message = error.response?.data?.message ?? "Something went wrong! Please try again.";
            toast.error(message);
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (!token) {
            toast.error("Token is missing");
            return;
        }
        mutate({ token, password: values.password });
    };

    return (
        <div className="container mx-auto py-16">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-4">Reset Password</h2>
                <p className="text-center mb-8">
                    Enter a new password for Morent App.
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className="w-full"
                            disabled={isPending}
                            type="submit"
                        >
                            Reset Password
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};
