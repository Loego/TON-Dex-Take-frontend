import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";
import { listTokens, tokenBalance, usdtBalance } from "../../api/tokens";
import { cleanUpDecimal } from "../../utils/numberUtils";
import { RootState } from "../store";
import { TokenBalanced, TokensState } from "../types/tokens";

const initialState :TokensState ={
  tokens:[],
  displayList:[]
};

export const retrieveTokens = createAsyncThunk(
  "tokens/retrieveTokens", async (walletAddress:string|null, thunkAPI)=>{
      let newList:TokenBalanced[] = await listTokens(0);
      
      newList = await Promise.all(newList.map(async (token):Promise<TokenBalanced> => {
        let balance = 0;
        //await usdtBalance(token.address);
        if(walletAddress !== null && walletAddress !== ""){
          balance = await tokenBalance(token.address , walletAddress);
          console.log("balance:", balance);
        }
        //balance = cleanUpDecimal(balance);
        console.log("balance1:", balance);
        return { ...token, balance };
      }));
      
      return newList;
  });


const handleFilterTokens = (state:TokensState, { payload }:PayloadAction<string>) => {
  if (payload.trim().length === 0){
    state.displayList = state.tokens;
  }else{
    state.displayList = state.tokens.filter(token=>
      token.name.toLowerCase().includes(payload) ||
      token.symbol.toLowerCase().includes(payload) ||
      token.address.includes(payload));
  }
};

export const tokensSlice = createSlice({
  initialState,
  name:"tokens",
  reducers:{
    filterTokens:handleFilterTokens
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveTokens.fulfilled, (state: TokensState, { payload }) => {
      state.tokens = payload;
      state.displayList = payload;
    });
    builder.addCase(retrieveTokens.rejected,(state: TokensState, { payload}) => {
      // state.tokens = tmp_tokens;
      // state.displayList = tmp_tokens;
    })
  }

});


export const { filterTokens }= tokensSlice.actions;

export const selectTokens = (state: RootState): TokensState => state.tokens;

export default tokensSlice.reducer;