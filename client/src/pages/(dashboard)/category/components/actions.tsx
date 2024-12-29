import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { paths } from "@/constants/paths";
import { QUERY_KEYS } from "@/constants/query-keys";
import categoryService from "@/services/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long."),
});

type Props = {
    type: "create"
}

const CategoryForm = ({ type }: Props) => {
    const navigate = useNavigate();
    const isCreated = type === "create";


    const { data, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.ADMIN_CATEGORY],
        queryFn: () => categoryService.getAll(),
        enabled: isCreated
    })
    console.log(data, isLoading);


    const { mutateAsync } = useMutation({
        mutationFn: categoryService.create,
        onSuccess: () => {
            navigate(paths.DASHBOARD.CATEGORY.LIST);
        },
        onError: (error) => {
            console.error("Error:", error);
            toast.error("Failed to create category");
        },
    });


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });


    async function onSubmit(data: z.infer<typeof formSchema>) {
        const promise = mutateAsync(data);
        toast.promise(promise, {
            loading: "Creating category...",
            success: "Category created successfully",
            error: "Failed to create category",
        });
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-primary mb-4 pt-6">Create Category</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Category" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button asChild variant="secondary">
                            <Link to="/dashboard/category" className="mr-2">
                                Back
                            </Link>
                        </Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CategoryForm;
