import { LiveChat } from "../LiveChat/LiveChat"
import { FeaturePage } from "./FeaturePage"
import { PriorityPage } from "./PriorityPage"

export const LandingPage = () => {
    return(
        <>
        <FeaturePage />
        <PriorityPage />
        <LiveChat />
        </>
    )
}