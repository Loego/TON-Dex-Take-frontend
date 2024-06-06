import {
  Address,
  JettonMaster,
  JettonWallet,
  TonClient,
  beginCell,
  internal,
  toNano,
} from "@ton/ton";
import { conversionRate } from "./swap";
import { listTokens, Token, tokenInfo } from "./tokens";
import { delay, generateAddress, generateHash } from "./util";
import { Router } from "../contracts/Router";
import { Pool as PoolContract } from "../contracts/Pool";

export interface Pool {
  address: string;
  token1?: Token;
  token2?: Token;
  providerFee: number;
  info: PoolInfo | null;
}

interface PoolInfo {
  liquidity?: number;
  volume24H?: number;
  volume7D?: number;
  fwdRate: number;
  bwdRate: number;
  token1Locked?: number;
  token2Locked?: number;
  poolFees?: number;
  liquidityChange?: number;
  volumeChange?: number;
}

const _pools: Map<string, Pool> = new Map();
const _tokens_to_pool_addr: Map<string, string> = new Map();
const POOL_PER_PAGE = 10;

export const listPools = async (
  client: TonClient,
  page: number,
  loadInfo: boolean = true
): Promise<Pool[]> => {
  await delay(100);
  const routerAddress = import.meta.env.VITE_ROUTER_ADDRESS;
  if (_pools.size === 0) {
    let tokens = await listTokens(0);
    let o = tokens.length > 5 ? 5 : tokens.length;
    tokens = tokens.slice(0, o);

    const router = client.open(
      Router.createFromAddress(Address.parse(routerAddress))
    );

    for (let i = 0; i < tokens.length; i++) {
      let t1 = tokens[i];
      for (let j = i + 1; j < tokens.length; j++) {
        let t2 = tokens[j];
        let id1 = t1.address + "_" + t2.address;
        let id2 = t2.address + "_" + t1.address;

        const token1Contract = client.open(
          JettonMaster.create(Address.parse(t1.address))
        );
        const token2Contract = client.open(
          JettonMaster.create(Address.parse(t2.address))
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

        const { reserve0, reserve1, token0Address, token1Address } =
          await pool.getPoolData();

        console.log(reserve0, reserve1, token0Address, token1Address);

        if (reserve0 > 0 && reserve1 > 0) {
          let np: Pool = {
            address: generateAddress(),
            // info: loadInfo
            //   ? {
            //       fwdRate: rates.fwd,
            //       bwdRate: rates.bwd,
            //       liquidity: Math.random() * 1e8,
            //       volume24H: d24V,
            //       volume7D: Math.random() * 1e8 * 2,
            //       token1Locked: t1V,
            //       poolFees: 0.08 * 0.01 * d24V,
            //       token2Locked: t1V * rates.fwd,
            //       liquidityChange: lChange,
            //       volumeChange: vChange,
            //     }
            //   : null,
            info: null,
            providerFee: 0.0002,
            token1: t1,
            token2: t2,
          };
          _pools.set(np.address, np);
          _tokens_to_pool_addr.set(id1, np.address);
          _tokens_to_pool_addr.set(id2, np.address);
        }
      }
    }
  }
  let offset = page === -1 ? 0 : page * POOL_PER_PAGE;
  let count = page === -1 ? _pools.size : POOL_PER_PAGE;
  return Array.from(_pools.values()).slice(offset).slice(0, count);
};

export interface PoolPositionInfo {
  pool?: Pool;
  token1V?: number;
  token2V?: number;
  liquidityTokens: number;
  share: number;
}

let _user_positions: PoolPositionInfo[] = [];

export const listPositions = async (
  address: string
): Promise<PoolPositionInfo[]> => {
  await delay(100);
  return _user_positions;
};

export const calculateShare = async (
  token1: string,
  token2: string,
  value: number
): Promise<PoolPositionInfo> => {
  await delay(100);
  return {
    liquidityTokens: value * 4.24,
    share: Math.random() / 10,
  };
};

export interface LPTokenRate {
  token1: number;
  token2: number;
}

export const lpTokenRate = async (
  token1: string,
  token2: string,
  value: number
): Promise<LPTokenRate> => {
  await delay(100);
  return {
    token1: Math.random() * 10,
    token2: Math.random() * 10,
  };
};

export const addLiquidity = async (
  client: TonClient,
  sender: any,
  fromAddress: string,
  token1: string,
  token2: string,
  value1: number,
  value2: number
): Promise<boolean> => {
  const routerAddress = import.meta.env.VITE_ROUTER_ADDRESS;

  const token1Contract = client.open(
    JettonMaster.create(Address.parse(token1))
  );
  const token2Contract = client.open(
    JettonMaster.create(Address.parse(token2))
  );

  const token1WalletAddress = await token1Contract.getWalletAddress(
    Address.parse(fromAddress)
  );
  const token2WalletAddress = await token2Contract.getWalletAddress(
    Address.parse(fromAddress)
  );

  console.log(token1WalletAddress.toString(), token2WalletAddress.toString());

  const routerToken1WalletAddress = await token1Contract.getWalletAddress(
    Address.parse(routerAddress)
  );
  const routerToken2WalletAddress = await token2Contract.getWalletAddress(
    Address.parse(routerAddress)
  );

  // const token1WalletContract = client.open(
  //   JettonWallet.create(token1WalletAddress)
  // );
  // const token2WalletContract = client.open(
  //   JettonWallet.create(token2WalletAddress)
  // );

  const forwardPayload1 = beginCell()
    .storeUint(0xfcf9e58f, 32) // provide lp
    .storeAddress(routerToken2WalletAddress) // another token wallet address of router
    .storeCoins(toNano(0.1))
    .endCell();
  const messageBody1 = beginCell()
    .storeUint(0x0f8a7ea5, 32) // opcode for jetton transfer
    .storeUint(0, 64) // query id
    .storeCoins(toNano(value1)) // jetton amount, amount * 10^9
    .storeAddress(Address.parse(routerAddress))
    .storeAddress(Address.parse(routerAddress)) // response destination
    .storeMaybeRef(null) // no custom payload
    .storeCoins(toNano(0.1)) // forward amount - if >0, will send notification message
    .storeBit(1)
    .storeRef(forwardPayload1)
    .endCell();

  const internalMessage1 = {
    to: token1WalletAddress,
    value: toNano(0.5),
    body: messageBody1,
  };

  const forwardPayload2 = beginCell()
    .storeUint(0xfcf9e58f, 32) // provide lp
    .storeAddress(routerToken1WalletAddress) // another token wallet address of router
    .storeCoins(toNano(0.1))
    .endCell();
  const messageBody2 = beginCell()
    .storeUint(0x0f8a7ea5, 32) // opcode for jetton transfer
    .storeUint(0, 64) // query id
    .storeCoins(toNano(value2)) // jetton amount, amount * 10^9
    .storeAddress(Address.parse(routerAddress))
    .storeAddress(Address.parse(routerAddress)) // response destination
    .storeMaybeRef(null) // no custom payload
    .storeCoins(toNano(0.1)) // forward amount - if >0, will send notification message
    .storeBit(1)
    .storeRef(forwardPayload2)
    .endCell();

  const internalMessage2 = {
    to: token2WalletAddress,
    value: toNano(0.5),
    body: messageBody2,
  };

  await sender.send([internalMessage1, internalMessage2]);

  // const router = client.open(
  //   Router.createFromAddress(Address.parse(routerAddress))
  // );

  // const poolAddress = await router.getPoolAddress(
  //   routerToken1WalletAddress,
  //   routerToken2WalletAddress
  // );

  // console.log(poolAddress.toString());

  // const pool = client.open(PoolContract.createFromAddress(poolAddress));

  // const { reserve0, reserve1, token0Address, token1Address } =
  //   await pool.getPoolData();

  // console.log(reserve0, reserve1, token0Address, token1Address);

  // console.log(token1Address.toString(), token2Address.toString());

  // let share = await calculateShare(token1, token2, value);
  // let rates = await conversionRate(token1, token2);

  // let id1 = token1 + "_" + token2;
  // let id2 = token2 + "_" + token1;
  // if(!_tokens_to_pool_addr.has(id1) && !_tokens_to_pool_addr.has(id2)){

  //   let np: Pool = {
  //     address: generateAddress(),
  //     info: null,
  //     providerFee: 0.0002,
  //     token1: await tokenInfo(token1),
  //     token2: await tokenInfo(token2),
  //   };
  //   _pools.set(np.address, np);
  //   _tokens_to_pool_addr.set(id1, np.address);
  //   _tokens_to_pool_addr.set(id2, np.address);
  // }

  // let pid = _tokens_to_pool_addr.get(id1);

  // if(pid){
  //   let p = _pools.get(pid);

  //   if(p){
  //     let ps = _user_positions.findIndex(p=>p.pool?.address === pid);
  //     if(ps !== -1){
  //       const oldPosition = _user_positions[ps];
  //       const newPosition = {
  //         ...oldPosition,
  //         share: oldPosition.share + share.share,
  //         liquidityTokens: oldPosition.liquidityTokens + share.liquidityTokens,
  //         token1V: value,
  //         token2V: value * rates.fwd,
  //       };

  //       _user_positions = [..._user_positions.slice(0, ps),newPosition, ..._user_positions.slice(ps+1)];

  //     }else{

  //       p = {
  //         ...p,
  //         info:{
  //           fwdRate: rates.fwd,
  //           bwdRate: rates.bwd,
  //         }
  //       };

  //       const newPosition: PoolPositionInfo = {
  //         liquidityTokens: share.liquidityTokens,
  //         share: share.share,
  //         token1V: value,
  //         token2V: value * rates.fwd,
  //         pool: p
  //       };
  //       _user_positions = [..._user_positions , newPosition];
  //     }
  //   }
  // }
  await delay(100);
  return true;
};

export const removeLiquidity = async (
  token1: string,
  token2: string,
  lpValue: number
): Promise<boolean> => {
  let id1 = token1 + "_" + token2;
  let pid = _tokens_to_pool_addr.get(id1);
  if (pid) {
    let p = _pools.get(pid);
    if (p) {
      let ps = _user_positions.findIndex((p) => p.pool?.address === pid);
      if (ps === -1) return false;

      let psElement = _user_positions[ps];
      console.log({ lt: psElement.liquidityTokens, lpValue });

      psElement = {
        ...psElement,
        liquidityTokens: psElement.liquidityTokens - lpValue,
      };

      console.log({ lt: psElement.liquidityTokens, lpValue });
      if (psElement.liquidityTokens <= 0) {
        _user_positions = [
          ..._user_positions.slice(0, ps),
          ..._user_positions.slice(ps + 1),
        ];
      } else {
        _user_positions = [
          ..._user_positions.slice(0, ps),
          psElement,
          ..._user_positions.slice(ps + 1),
        ];
      }
    }
  }
  await delay(100);
  return true;
};

export const approveTokenAccess = async (
  address: string,
  token: string
): Promise<boolean> => {
  await delay(100);
  return true;
};
export const removeApproval = async (
  address: string,
  token1: string,
  token2: string
): Promise<boolean> => {
  await delay(100);
  return true;
};

export const getPool = async (id: string): Promise<Pool | null> => {
  await delay(100);
  return _pools.get(id) ?? null;
};

export enum TransactionType {
  SWAP = "Swap",
  ADD = "Add",
  REMOVE = "Remove",
}

export interface PoolTransaction {
  id: string;
  type: TransactionType;
  totalValue: number;
  token1Amount: number;
  token2Amount: number;
  token1: Token;
  token2: Token;
  account: string;
  time: number;
}

export const poolTransactions = async (
  id: string,
  page: number
): Promise<PoolTransaction[]> => {
  await delay(100);
  const pool = _pools.get(id);
  if (!pool || !pool.token1 || !pool.token2) {
    return [];
  }

  let transactions: PoolTransaction[] = [];
  let allTypes: TransactionType[] = [
    TransactionType.ADD,
    TransactionType.REMOVE,
    TransactionType.SWAP,
  ];
  let getRandomType = () =>
    allTypes[Math.floor(Math.random() * allTypes.length)];

  for (let i = 0; i < 10; i++) {
    const time = new Date().getTime() - Math.random() * 10 * 60 * 30 * 1000;
    transactions.push({
      account: generateAddress(),
      id: generateHash(),
      time,
      token1Amount: Math.random() * 100,
      token2Amount: Math.random() * 100,
      token1: pool.token1,
      token2: pool.token2,
      totalValue: Math.random() * 1000,
      type: getRandomType(),
    });
  }
  return transactions;
};
