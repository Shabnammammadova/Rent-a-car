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
import { Link } from "react-router-dom";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export const ForgotPassword = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: authService.forgotPassword, // Ensure you have this method in your `authService`
        onSuccess: (response) => {
            toast.success("Password reset email sent! Please check your inbox.");
            console.log(response);

        },
        onError: (error: AxiosError) => {
            const message = error.response?.data?.message ?? "Something went wrong! Please try again.";
            toast.error(message);
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values);
    }

    return (
        <div className="container mx-auto py-16">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-4">Forgot Password</h2>
                <p className="text-center mb-8">
                    Enter your email address and we’ll send you a link to reset your password.
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        <Button
                            className="w-full"
                            disabled={isPending}
                            type="submit"
                        >
                            Send Reset Link
                        </Button>
                    </form>
                </Form>
                <div className="mt-4 text-center">
                    <Link to="/" className="text-primary underline">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
