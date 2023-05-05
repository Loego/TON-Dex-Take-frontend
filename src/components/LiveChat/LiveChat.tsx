import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid"

export const LiveChat = () => {
    return(
        <div className=" fixed flex right-28 bottom-32 w-14 h-14 bg-[#662483] rounded-full items-center justify-center hover:scale-110 transition-transform ease-in hover:outline-2 outline-dashed outline-offset-4" onClick={()=> {console.log("OK")}}>
            <ChatBubbleLeftRightIcon className="w-6 h-6"></ChatBubbleLeftRightIcon>
        </div>
    )
}