import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { QUERY_KEYS } from "@/constants/query-keys";
import categoryService from "@/services/category";
import locationService from "@/services/location";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";


const formSchema = z.object({
    name: z.string().min(2),
    description: z.string(),
    price: z
        .number({
            invalid_type_error: 'Price must be a number',
            required_error: 'Price is required',
        })
        .positive(),
    categoryId: z.string().min(2, { message: 'Category is required' }),
    fuel: z.string().min(2),
    gearBox: z.string().min(2),
    pickUpLocationId: z.string().min(2),
    dropOffLocationIds: z.array(z.string().min(2))

});
const Create = () => {
    const { data: categoryData } = useQuery({
        queryKey: [QUERY_KEYS.CATEGORIES],
        queryFn: categoryService.getAll
    })
    const { data: locationData } = useQuery({
        queryKey: [QUERY_KEYS.LOCATIONS],
        queryFn: locationService.getAll
    })
    const categoryOptions = useMemo(() => {
        if (!categoryData?.data.items) return [];

        return categoryData.data.items.map((category) => ({
            value: category._id,
            label: category.name
        }))
    }, [categoryData])


    const locationOptions = useMemo(() => {
        if (!locationData?.data.items) return [];

        return locationData.data.items.map((location) => ({
            value: location._id,
            label: location.name
        }))
    }, [locationData])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            categoryId: '',

        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        // const promise = createProduct(data).then(() => {
        //     form.reset();
        // });
        // toast.promise(promise, {
        //     loading: 'Creating product...',
        //     success: 'Product created successfully',
        //     error: 'Failed to create product',
        // });
    }
    return (
        <div>
            <h1 className="text-2xl font -bold text-primary mb-4">Create Rent</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mercedes" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fuel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fuel</FormLabel>
                                    <FormControl>
                                        <Input placeholder="10L" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gearBox"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gear Box</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Manual" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="100"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange({ target: { value: parseFloat(e.target.value) } });
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categoryOptions.map((category) => (
                                                <SelectItem key={category.value} value={category.value}>
                                                    {category.label}
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
                            name="pickUpLocationId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pick Up Location</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select location" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {locationOptions.map((location) => (
                                                <SelectItem key={location.value} value={location.value}>
                                                    {location.label}
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
                            name="dropOffLocationIds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Drop Off Locations</FormLabel>
                                    <MultiSelect
                                        options={locationOptions}
                                        onValueChange={(value) => field.onChange(value)}
                                        // defaultValue={selectedFrameworks}
                                        placeholder="Select Drop Off Locations"
                                        variant="inverted"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Type..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* <FormField
                        control={form.control}
                        name="imageUrl"
                        render={() => (
                            <FormItem>
                                <FormLabel>Product Image</FormLabel>
                                {/* {field.value ? (
                                    <>
                                        <img src={field.value} width={100} height={100} alt="Product" />
                                        <button onClick={() => field.onChange({ target: { value: '' } })}>X</button>
                                    </>
                                ) : (
                                    <UploadButton
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            const { url } = res[0];
                                            console.log('res', res);

                                            field.onChange({ target: { value: url } });
                                        }}
                                    />
                                )} */}
                        <FormMessage />
                        {/* </FormItem>
                        )}
                    /> */}
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button asChild variant="secondary"  >
                            <Link to="/dashboard/rents" className="mr-2">
                                Back
                            </Link>
                        </Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default Create