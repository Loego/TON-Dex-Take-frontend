import { delay } from "./util";
import TonWeb from "tonweb";
import { Router, ROUTER_REVISION, ROUTER_REVISION_ADDRESS } from '@ston-fi/sdk';
import { tokenInfo } from "./tokens";

interface ConversionInfo{
    fwd: number;
    bwd: number;
};
let rate_number = 0;

const _ratesCache: Map<string, Map<string, number>> = new Map();
const provider = new TonWeb.HttpProvider(import.meta.env.VITE_endpointUrl)
const router = new Router(provider, {
  revision: ROUTER_REVISION.V1,
  address: ROUTER_REVISION_ADDRESS.V1,
});


export const conversionRate = async (token1: string, token2: string): Promise<ConversionInfo> => {
  await delay(100);
  
  const token1_info = await tokenInfo(token1);
  const token2_info = await tokenInfo(token2);
  // console.log("token1_real:", token1_info?.decimals, token2_info?.decimals);
  // console.log("conversionrate entered:")
  
  const pool = await router.getPool({ jettonAddresses: [token1, token2] });

  if(pool){
    const poolData = await pool.getData();
    const {
      reserve0,
      reserve1,
      token0WalletAddress,
      token1WalletAddress,
      lpFee,
      protocolFee,
      refFee,
      protocolFeeAddress,
      collectedToken0ProtocolFee,
      collectedToken1ProtocolFee,
    } = poolData;

    if(token0WalletAddress && token1_info && token2_info){
      let convert_rate;

      console.log("token information:", token1_info.decimals, token2_info.decimals);
      
      const accept_decimal = (token1_info.decimals >= token2_info.decimals) ? token1_info.decimals : token2_info.decimals;

      console.log("accept_decimals", accept_decimal);

      const expectedOutputsData = await pool.getExpectedOutputs({
        amount: new TonWeb.utils.BN(10 ** accept_decimal),
        jettonWallet: token0WalletAddress,
      });
  
      const { jettonToReceive, protocolFeePaid, refFeePaid } = expectedOutputsData;
      console.log("jettonToreceive:", jettonToReceive.toString());
      //console.log("token2_info", token2_info.decimals);
      convert_rate = (jettonToReceive)/(10 ** (accept_decimal-token1_info.decimals + accept_decimal-token2_info.decimals + accept_decimal));

      rate_number = convert_rate < 1 ? 1/convert_rate : convert_rate;
      console.log("rate_number", rate_number);
      console.log("other_rate:", (1/rate_number));
    }
  }
  return {
    fwd: rate_number,
    bwd: 1/rate_number
  }
};

export const estimateSwapFee = async (value: number, token1: string, token2: string): Promise<number> => {
  await delay(100);
  return value * 0.0001;
};

interface SwapInfo{
    estimatedOutput: number;
    minimumOutput: number;
    price: number;
    priceImpact: number;
    providerFee: number;
};

interface TokenInput{
    token1: string;
    token2: string;
    value: number;
    slippage?: number;
    deadline?: number;
    multihop?: boolean;
};

export const swapInfo = async (input: TokenInput): Promise<SwapInfo> => {
  await delay(100);
  let rate = await conversionRate(input.token1, input.token2);
  // %0.1
  let priceImpact = 0.1 / 100;
  let maxSlippage = input.slippage ?? 0.5 / 100;
  let fee = await estimateSwapFee(input.value, input.token1, input.token2);
  let allowedMovement = rate.fwd * maxSlippage;
  let min = (rate.fwd - allowedMovement) * input.value;
  let est = (1 - priceImpact) * rate.fwd * input.value;
  return {
    estimatedOutput: est,
    minimumOutput: min,
    price: rate.fwd,
    priceImpact,
    providerFee: fee
  };
};

interface SwapOutput{
  successful: boolean;
  swapValue: number;
};

export const confirmSwap = async (input: TokenInput): Promise<SwapOutput> => {
  await delay(100);
  let rate = await conversionRate(input.token1, input.token2);
  return {
    successful: true,
    swapValue: rate.fwd * input.value
  };
};

  