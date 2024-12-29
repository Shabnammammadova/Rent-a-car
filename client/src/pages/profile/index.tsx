import { useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import { selectUserData } from "@/store/features/userSlice";

const ProfilePage = () => {
    const { user } = useAppSelector(selectUserData);

    const [avatarPreview, setAvatarPreview] = useState<string>(user?.avatar || "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);


    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submit avatar file:", avatarFile);
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center p-4">
            <div className="bg-white shadow-md rounded-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-50 rounded-lg">
                    <div className="text-center">
                        <div className="relative">
                            <img
                                src={avatarPreview}
                                alt="User Avatar"
                                className="w-24 h-24 rounded-full mx-auto"
                            />
                            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer">
                                <span className="text-xs">Edit</span>
                            </label>
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                        </div>
                        <h1 className="text-3xl font-bold pt-8 lg:pt-0">{user?.name || "Your name"}</h1>
                    </div>
                    <div className="mt-6 space-y-2">
                        <div>
                            <p className="text-sm font-bold">Github</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold">Twitter</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold">Instagram</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold">Facebook</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 md:col-span-2">
                    <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Full Name</label>
                            <input
                                type="text"
                                className="mt-1 p-2 block w-full border rounded-md"
                                defaultValue={user?.name || "John Doe"}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                className="mt-1 p-2 block w-full border rounded-md"
                                defaultValue={user?.email || "john@example.com"}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Phone</label>
                            <input
                                type="text"
                                className="mt-1 p-2 block w-full border rounded-md"
                                placeholder="(239) 816-9029"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Mobile</label>
                            <input
                                type="text"
                                className="mt-1 p-2 block w-full border rounded-md"
                                placeholder="(320) 380-4539"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600">Address</label>
                            <input
                                type="text"
                                className="mt-1 p-2 block w-full border rounded-md"
                                placeholder="Baku"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 md:col-span-2"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;


//         <div className="  bg-gray-100 flex justify-center items-center p-4">
//             <div className="bg-white shadow-md rounded-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="p-6 bg-blue-50 rounded-lg">
//                     <div className="text-center">
//                         {user?.avatar ? (
//                             <img
//                                 src={user.avatar}
//                                 alt="User Avatar"
//                                 className="w-24 h-24 rounded-full mx-auto"
//                             />
//                         ) : (
//                             <img src="https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg" alt="" className="w-24 h-24 rounded-full mx-auto" />
//                         )}
//                         {user?.name ? (
//                             <h1 className="text-3xl font-bold pt-8 lg:pt-0">{user.name}</h1>
//                         ) : (
//                             <h1 className="text-3xl font-bold pt-8 lg:pt-0">Your name</h1>
//                         )}
//                     </div>
//                     <div className="mt-6 space-y-2">
//                         <div>
//                             <p className="text-sm font-bold">Github</p>
//                         </div>
//                         <div>
//                             <p className="text-sm font-bold">Twitter</p>
//                         </div>
//                         <div>
//                             <p className="text-sm font-bold">Instagram</p>
//                         </div>
//                         <div>
//                             <p className="text-sm font-bold">Facebook</p>
//                         </div>
//                     </div>
//                 </div>


//                 <div className="p-6 md:col-span-2">
//                     <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
//                     <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600">Full Name</label>
//                             {
//                                 user?.name ? (
//                                     <input
//                                         type="text"
//                                         className="mt-1 p-2 block w-full border rounded-md"
//                                         defaultValue={user.name}
//                                     />
//                                 ) : (
//                                     <input
//                                         type="text"
//                                         className="mt-1 p-2 block w-full border rounded-md"
//                                         placeholder="John Doe"
//                                     />
//                                 )
//                             }

//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600">Email</label>
//                             {
//                                 user?.email ? (
//                                     <input
//                                         type="email"
//                                         className="mt-1 p-2 block w-full border rounded-md"
//                                         defaultValue={user.email}
//                                     />
//                                 ) : (
//                                     <input
//                                         type="email"
//                                         className="mt-1 p-2 block w-full border rounded-md"
//                                         placeholder="john@example.com"
//                                     />
//                                 )
//                             }

//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600">Phone</label>
//                             <input
//                                 type="text"
//                                 className="mt-1 p-2 block w-full border rounded-md"
//                                 placeholder="(239) 816-9029"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600">Mobile</label>
//                             <input
//                                 type="text"
//                                 className="mt-1 p-2 block w-full border rounded-md"
//                                 placeholder="(320) 380-4539"
//                             />
//                         </div>
//                         <div className="col-span-1 md:col-span-2">
//                             <label className="block text-sm font-medium text-gray-600">Address</label>
//                             <input
//                                 type="text"
//                                 className="mt-1 p-2 block w-full border rounded-md"
//                                 placeholder="Baku"
//                             />
//                         </div>
//                         <button
//                             type="submit"
//                             className="bg-blue-500 text-white px-4 py-2 rounded mt-4 md:col-span-2"
//                         >
//                             Save Changes
//                         </button>
//                     </form>
//                 </div>

//             </div>
//         </div>
//     );
// };




