export const MainPanel = () => {
    return(
        <div className="flex flex-row gap-2">
            <div className="container bg-dashboard_dark border-2 border-dark w-1/5 p-3">
                <h2>Main</h2>
            </div>
            <div className="container bg-dashboard_dark border-2 border-dark w-3/5 p-3">
                <h2>Chart</h2>
            </div>
            <div className="container bg-dashboard_dark border-2 border-dark w-1/5 p-3">
                <h2>Order Book</h2>
            </div>
        </div>
    )
}