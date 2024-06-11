import {
  Address,
  beginCell,
  Cell,
  Contract,
  contractAddress,
  ContractProvider,
  Sender,
  SendMode,
  Slice,
} from "@ton/core";

export type LPWalletConfig = {
  isLocked: number;
  adminAddress: Address;
  LPWalletCode: Cell;
  poolCode: Cell;
  tempUpgrade: Cell;
};

export function LPWalletConfigToCell(config: LPWalletConfig): Cell {
  return beginCell()
    .storeUint(config.isLocked, 1)
    .storeAddress(config.adminAddress)
    .storeRef(config.LPWalletCode)
    .storeRef(config.poolCode)
    .storeRef(config.tempUpgrade)
    .endCell();
}

export const Opcodes = {
  increase: 0x7e8764ef,
};

export class LPWallet implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  static createFromAddress(address: Address) {
    return new LPWallet(address);
  }

  static createFromConfig(config: LPWalletConfig, code: Cell, workchain = 0) {
    const data = LPWalletConfigToCell(config);
    const init = { code, data };
    return new LPWallet(contractAddress(workchain, init), init);
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
    });
  }

  async getBalance(provider: ContractProvider) {
    const result = await provider.get("get_wallet_data", []);

    return result.stack.readBigNumber();
  }
}
