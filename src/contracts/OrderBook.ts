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
} from '@ton/core'

const HOLE_ADDRESS = 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c'

export type OrderBookConfig = {
  isLocked: number
  adminAddress: Address
  routerAddress: Address
  tempUpgrade: Cell
}

export function OrderBookConfigToCell(config: OrderBookConfig): Cell {
  return beginCell()
    .storeUint(config.isLocked, 1)
    .storeRef(
      beginCell()
        .storeUint(0, 256)
        .storeUint(0, 256)
        .storeUint(10, 32)
        .endCell()
    )
    .storeAddress(config.adminAddress)
    .storeAddress(config.routerAddress)
    .storeAddress(Address.parse(HOLE_ADDRESS))
    .storeRef(beginCell().endCell())
    .storeRef(beginCell().endCell())
    .storeRef(config.tempUpgrade)
    .endCell()
}

export const Opcodes = {}

export class OrderBook implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  static createFromAddress(address: Address) {
    return new OrderBook(address)
  }

  static createFromConfig(config: OrderBookConfig, code: Cell, workchain = 0) {
    const data = OrderBookConfigToCell(config)
    const init = { code, data }
    return new OrderBook(contractAddress(workchain, init), init)
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
    })
  }

  async getOrderBookData(provider: ContractProvider) {
    const result = await provider.get('get_OrderBook_data', [])
    return result.stack.readNumber()
  }

  async getPoolAddress(
    provider: ContractProvider,
    token1: Address,
    token2: Address
  ) {
    const result = await provider.get('get_pool_address', [
      {
        type: 'slice',
        cell: beginCell().storeAddress(token1).endCell(),
      },
      {
        type: 'slice',
        cell: beginCell().storeAddress(token2).endCell(),
      },
    ])
    return result.stack.readAddress()
  }
}
