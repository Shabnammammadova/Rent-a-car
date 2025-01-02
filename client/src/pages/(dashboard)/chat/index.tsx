import { RenderIf } from "@/components/shared/RenderIf";
import { paths } from "@/constants/paths";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useSocket } from "@/hooks/use-socket";
import { cn } from "@/lib/utils";
import conversationService from "@/services/conversation";
import { selectUserData } from "@/store/features/userSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ChatPage = () => {
    const { id } = useParams()
    const { user } = useSelector(selectUserData)
    const inputRef = useRef<HTMLInputElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const { data: conversationData, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.ADMIN_CONVERSATIONS],
        queryFn: conversationService.getAll

    });

    // console.log("getAll response:", conversationData);

    const { data: chatData, isLoading: isChatLoading, status } = useQuery({
        queryKey: [QUERY_KEYS.ADMIN_CHAT, id],
        queryFn: () => conversationService.getById({ id: id! }),
        enabled: !!id
    })
    // console.log("useParams id:", id);

    // console.log("chatData", chatData);
    const [messages, setMessages] = useState<{ text: string; userId: string, createdAt: string }[]>([])


    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;
        socket.on("message", (message) => {
            if (message.conversation !== id) return
            console.log(message);

        })
    }, [socket])




    useEffect(() => {
        if (wrapperRef.current) {
            wrapperRef.current.scrollTo({
                top: wrapperRef.current.scrollHeight,
                behavior: "smooth"
            })
        }
    }, [messages])





    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (!socket) return;
        e.preventDefault();
        const message = inputRef.current?.value.trim();
        const to = chatData?.data?.item?.userId;
        const from = user?._id;
        if (!message || !to || !from) return;
        inputRef.current!.value = "";
        socket.emit("message", { message, to, from });
        setMessages((prev) => [
            ...prev,
            { text: message, userId: from, createdAt: new Date().toISOString() }
        ])
    }

    useEffect(() => {
        if (status === "success" && chatData) {
            setMessages(chatData.data?.item?.messages || [])
        }
    }, [chatData])



    // console.log("chatData", chatData);
    // console.log("chatData.data", chatData?.data);
    // console.log("chatData.data.items", chatData?.data?.item);
    // console.log("chatData.data.items.messages", chatData?.data?.item?.messages);



    useEffect(() => {
        if (!socket) return;
        socket.on("message", (message) => {
            if (message.conversation !== window.location.pathname.split("/").pop()) return;
            setMessages((prev) => [...prev, message])
            console.log(message);
        })
    }, [socket])

    if (isLoading || isChatLoading) return <div>Loading...</div>

    // console.log("conversation", conversationData);

    const conversations = conversationData?.data?.items || []


    // console.log("chatMessages", chatMessages);

    return (
        <div className="flex h-full min-h-[calc(100vh-250px)]antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                    <div className="flex flex-row items-center justify-center h-12 w-full">
                        <div
                            className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                ></path>
                            </svg>
                        </div>
                        <div className="ml-2 font-bold text-2xl">QuickChat</div>
                    </div>
                    <div
                        className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
                    >
                        <div className="h-20 w-20 rounded-full border overflow-hidden">
                            <img
                                src="https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg"
                                alt="Avatar"
                                className="h-full w-full"
                            />
                        </div>
                        <div className="text-sm font-semibold mt-2">Admin</div>
                        <div className="flex flex-row items-center mt-3">
                            <div
                                className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full"
                            >
                                <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
                            </div>
                            <div className="leading-none ml-1 text-xs">Active</div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-8">
                        <div className="flex flex-row items-center justify-between text-xs">
                            <span className="font-bold">Active Conversations</span>
                            <span
                                className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
                            >4</span>
                        </div>
                        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">

                            {
                                conversations.map((conversation) => (
                                    <Link to={paths.DASHBOARD.CHAT.USER(conversation._id)}
                                        key={conversation._id}
                                        className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                                        style={{
                                            backgroundColor: id === conversation._id ? "#f1f1f1" : ""
                                        }}
                                    >
                                        <div
                                            className="flex uppercase  items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                                        >
                                            {conversation.userName[0]}
                                        </div>
                                        <div className="ml-2 text-sm font-semibold">{conversation.userName}</div>
                                    </Link>
                                ))
                            }
                        </div>

                        <div className="flex flex-col space-y-1 mt-4 -mx-2">

                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-auto h-full p-6">
                    <div
                        className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
                    >


                        <RenderIf condition={!!id}>

                            <div
                                ref={wrapperRef} className="flex flex-col h-full overflow-x-auto mb-4">
                                <div className="flex flex-col h-full">
                                    <div
                                        className="grid grid-cols-12 gap-y-2 max-h-[640px]">

                                        {
                                            messages.map((message, idx) => (
                                                <MessageItem key={idx} message={message.text} owner={message.userId === user?._id} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div
                                className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
                            >
                                <div>
                                    <button
                                        className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex-grow ml-4">
                                    <form id="chat-form" onSubmit={handleSubmit} className="relative w-full">
                                        <input
                                            type="text"
                                            ref={inputRef}
                                            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                        />
                                        <button
                                            className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                                        >
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                        </button>
                                    </form>
                                </div>
                                <div className="ml-4">
                                    <button type="submit" form="chat-form"
                                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                    >
                                        <span>Send</span>
                                        <span className="ml-2">
                                            <svg
                                                className="w-4 h-4 transform rotate-45 -mt-px"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                ></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </RenderIf>

                        <RenderIf condition={!id}>
                            <div className="flex w-full h-full items-center justify-center my-44">
                                <p className="text-xl text-primary font-bold">Select a conversation to start chatting with the user</p>
                            </div>
                        </RenderIf>

                    </div>
                </div>
            </div>
        </div>
    );
};

const MessageItem = ({ message, owner }: { message: string, owner: boolean }) => {
    return (
        <div className={cn(" p-3 rounded-lg",
            owner ? "col-start-6 col-end-13" : "col-start-1 col-end-8"
        )}>
            <div className={cn("flex  items-center", owner && "justify-start flex-row-reverse")}>
                <div
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                >
                    A
                </div>
                <div
                    className={cn("relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl", owner ? "bg-indigo-100 mr-3" : "bg-white mr-2")}
                >
                    <div>{message}</div>
                </div>
            </div>
        </div>
    )
}



export default ChatPage