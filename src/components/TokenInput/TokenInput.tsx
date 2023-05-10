import { useState } from "react"
import { TokenBalanced } from "../../redux/types/tokens";

interface IProps {
    label: string;
    value: number;
    token: TokenBalanced|null;
    onChange?: (value: number) => void;
    onSelectToken?: () => void;
    showMax?: boolean;
}

export default function TokenInput({ label, onChange, value, token, onSelectToken, showMax} : IProps) {
    const [token_balance, setToken_balance] = useState(0)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        if (!!onChange && value.match(/^\d*(\.\d+)?$/g)){
          const returnValue = parseFloat(value);
          onChange(Number.isNaN(returnValue) ? 0 : returnValue);
        }
      };

    const handleMaxClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if(onChange && token?.balance){
          onChange(token.balance);
        }
      };


    return(
        <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
                <label>label</label>
                <label>Available: </label>
            </div>
            <div className=" bg-[#FFFFFF] border border-[#B9BBBE] h-11 rounded-md flex flex-row items-center">
                <div className='px-3 py-2 border-r-2 border-[#B9BBBE] w-3/4'>
                    <input type="number" className=" text-dark w-full outline-none" value={`${value}`} onChange={handleChange} />
                </div>
                <div className='px-3 py-2 border-[#B9BBBE] w-1/4' onClick={onSelectToken}>
                    <div className="">
                        { token != null?
                            <img src={token?.logoURI} alt={token.name} /> : null }
                        <span>{ token !== null ? token.symbol: "Select Token"}</span>
                    </div>
                    <span className="">
                        { showMax && token?.balance ? 
                            <small
                                className=""
                                onClick={handleMaxClick}>MAX
                            </small> : ""
                        }
                        Balance: <b> { token?.balance??0} </b>
                    </span>
                </div>
            </div> 
        </div>
    )
}