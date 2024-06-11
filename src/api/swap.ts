import { delay } from "./util";
import TonWeb from "tonweb";
import { Router, ROUTER_REVISION, ROUTER_REVISION_ADDRESS } from "@ston-fi/sdk";
import { tokenInfo } from "./tokens";
import { Address, JettonMaster, TonClient } from "@ton/ton";
import { Router as RouterContract } from "../contracts/Router";
import { Pool as PoolContract } from "../contracts/Pool";
import { TokenBalanced } from "../redux/types/tokens";
interface ConversionInfo {
  fwd: number;
  bwd: number;
}
let rate_number = 0;

const _ratesCache: Map<string, Map<string, number>> = new Map();
const provider = new TonWeb.HttpProvider(import.meta.env.VITE_endpointUrl);
const router = new Router(provider, {
  revision: ROUTER_REVISION.V1,
  address: ROUTER_REVISION_ADDRESS.V1,
});

export const conversionRate = async (
  client: TonClient,
  token1: TokenBalanced,
  token2: TokenBalanced
): Promise<ConversionInfo> => {
  const routerAddress = import.meta.env.VITE_ROUTER_ADDRESS;

  const router = client.open(
    RouterContract.createFromAddress(Address.parse(routerAddress))
  );

  const token1Contract = client.open(
    JettonMaster.create(Address.parse(token1.address))
  );
  const token2Contract = client.open(
    JettonMaster.create(Address.parse(token2.address))
  );

  const routerToken1WalletAddress = await token1Contract.getWalletAddress(
    Address.parse(routerAddress)
  );
  const routerToken2WalletAddress = await token2Contract.getWalletAddress(
    Address.parse(routerAddress)
  );

  const poolAddress = await router.getPoolAddress(
    routerToken1WalletAddress,
    routerToken2WalletAddress
  );

  console.log(poolAddress.toString());

  const pool = client.open(PoolContract.createFromAddress(poolAddress));

  // console.log("token1_real:", token1_info?.decimals, token2_info?.decimals);
  // console.log("conversionrate entered:")

  const token1RouterAddress = (
    await token1Contract.getWalletAddress(Address.parse(routerAddress))
  ).toString();
  const token2RouterAddress = (
    await token2Contract.getWalletAddress(Address.parse(routerAddress))
  ).toString();

  // const pool = await router.getPool({ jettonAddresses: [token1, token2] });

  if (pool) {
    const poolData = await pool.getPoolData();
    const { token0Address, token1Address } = poolData;

    console.log(token0Address.toString(), token1Address.toString());

    if (token0Address) {
      let convert_rate;

      console.log("token information:", token1.decimals, token2.decimals);

      const accept_decimal =
        token1.decimals >= token2.decimals ? token1.decimals : token2.decimals;

      console.log("accept_decimals", accept_decimal);

      const expectedOutputsData = await pool.getExpectedOutputs(
        new TonWeb.utils.BN(10 ** accept_decimal),
        token0Address
      );

      const [jettonToReceive, protocolFeePaid, refFeePaid] =
        expectedOutputsData;
      console.log("jettonToreceive:", jettonToReceive.toString());
      //console.log("token2_info", token2_info.decimals);
      convert_rate =
        Number(jettonToReceive) /
        10 **
          (accept_decimal -
            token1.decimals +
            accept_decimal -
            token2.decimals +
            accept_decimal);

      console.log("convert rate", convert_rate);

      rate_number =
        token1RouterAddress === token0Address.toString()
          ? convert_rate
          : 1 / convert_rate;
      console.log("rate_number", rate_number);
      console.log("other_rate:", 1 / rate_number);
    }
  }
  return {
    fwd: rate_number,
    bwd: 1 / rate_number,
  };
};

export const estimateSwapFee = async (
  value: number,
  token1: string,
  token2: string
): Promise<number> => {
  await delay(100);
  return value * 0.0001;
};

interface SwapInfo {
  estimatedOutput: number;
  minimumOutput: number;
  price: number;
  priceImpact: number;
  providerFee: number;
}

interface TokenInput {
  token1: TokenBalanced;
  token2: TokenBalanced;
  value: number;
  slippage?: number;
  deadline?: number;
  multihop?: boolean;
}

export const swapInfo = async (
  client: TonClient,
  input: TokenInput
): Promise<SwapInfo> => {
  await delay(100);
  let rate = await conversionRate(client, input.token1, input.token2);
  // %0.1
  let priceImpact = 0.1 / 100;
  let maxSlippage = input.slippage ?? 0.5 / 100;
  let fee = await estimateSwapFee(
    input.value,
    input.token1.address,
    input.token2.address
  );
  let allowedMovement = rate.fwd * maxSlippage;
  let min = (rate.fwd - allowedMovement) * input.value;
  let est = (1 - priceImpact) * rate.fwd * input.value;
  return {
    estimatedOutput: est,
    minimumOutput: min,
    price: rate.fwd,
    priceImpact,
    providerFee: fee,
  };
};

interface SwapOutput {
  successful: boolean;
  swapValue: number;
}

export const confirmSwap = async (
  client: TonClient,
  input: TokenInput
): Promise<SwapOutput> => {
  await delay(100);
  let rate = await conversionRate(client, input.token1, input.token2);
  return {
    successful: true,
    swapValue: rate.fwd * input.value,
  };
};
