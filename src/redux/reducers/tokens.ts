import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from '@reduxjs/toolkit'
import {
  _tokens,
  jettonList,
  listTokens,
  tokenBalance,
  usdtBalance,
} from '../../api/tokens'
import { cleanUpDecimal } from '../../utils/numberUtils'
import { RootState } from '../store'
import { TokenBalanced, TokensState } from '../types/tokens'
import { fromNano } from '@ton/core'
import { toUserFriendlyAddress } from '@tonconnect/sdk'

const initialState: TokensState = {
  tokens: [],
  displayList: [],
  totalTokens: _tokens,
}

export const retrieveTokens = createAsyncThunk(
  'tokens/retrieveTokens',
  async (
    { walletAddress, balance }: { walletAddress: string; balance: number },
    thunkAPI
  ) => {
    let jettonsBalanced: TokenBalanced[] = []
    if (walletAddress) {
      const jettons = await jettonList(walletAddress)

      jettons.map((token: any) => {
        const { jetton } = token
        const jettonBalanced: TokenBalanced = {
          balance: Number(Number(fromNano(token.balance)).toFixed(3)),
          name: jetton.name,
          symbol: jetton.symbol,
          address: toUserFriendlyAddress(jetton.address),
          decimals: jetton.decimals,
          chainId: 0,
          logoURI: jetton.image,
        }

        jettonsBalanced.push(jettonBalanced)
      })
    }

    jettonsBalanced.push({
      balance,
      name: 'TONCOIN',
      symbol: 'TON',
      address: import.meta.env.VITE_PROXYTON_ADDRESS,
      decimals: 9,
      chainId: 0,
      logoURI: 'https://static.ston.fi/logo/ton_symbol.png',
    })

    console.log(jettonsBalanced)

    return jettonsBalanced
  }
)

const handleFilterTokens = (
  state: TokensState,
  { payload }: PayloadAction<string>
) => {
  if (payload.trim().length === 0) {
    state.displayList = state.tokens
  } else {
    state.displayList = state.tokens.filter(
      (token) =>
        token.name.toLowerCase().includes(payload) ||
        token.symbol.toLowerCase().includes(payload) ||
        token.address.includes(payload)
    )
  }
}

export const tokensSlice = createSlice({
  initialState,
  name: 'tokens',
  reducers: {
    filterTokens: handleFilterTokens,
  },
  extraReducers: (builder) => {
    builder.addCase(
      retrieveTokens.fulfilled,
      (state: TokensState, { payload }) => {
        state.tokens = payload
        state.displayList = payload
        state.totalTokens = payload
      }
    )
    builder.addCase(
      retrieveTokens.rejected,
      (state: TokensState, { payload }) => {
        // state.tokens = tmp_tokens;
        // state.displayList = tmp_tokens;
      }
    )
  },
})

export const { filterTokens } = tokensSlice.actions

export const selectTokens = (state: RootState): TokensState => state.tokens

export default tokensSlice.reducer
