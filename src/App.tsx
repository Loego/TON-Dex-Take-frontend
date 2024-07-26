import './App.css'
import { useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Exchange } from './components/Exchange/Exchange'
import { LandingPage } from './components/LandingPage/LandingPage'
import Header from './components/Header/Header'
import { config } from 'dotenv'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { retrieveTokens } from './redux/reducers/tokens'
import { selectAccount } from './redux/reducers/account'
import Modals from './components/Modals'
import { SwapPanel } from './components/Exchange/SwapPanel'
import Staking from './components/Stake'
import Footer from './components/Footer/Footer'
import AppFooter from './components/Footer/AppFooter'
import Pools from './components/Pools'
import { useTonClient } from './hook/useTonClient'
import { Address, fromNano } from '@ton/core'
config()

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { walletAddress } = useAppSelector(selectAccount)
  const dispatch = useAppDispatch()
  const client = useTonClient()

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode)
  }
  console.log('wallet_address;', isDarkMode)

  useEffect(() => {
    console.log(walletAddress)
    const fetchTokens = async () => {
      if (walletAddress && client) {
        const balance = await client.getBalance(Address.parse(walletAddress))
        dispatch(
          retrieveTokens({ walletAddress, balance: Number(fromNano(balance)) })
        )
      }
    }
    fetchTokens()
  }, [dispatch, walletAddress, client])

  return (
    <>
      <div
        className={`h-screen w-full relative flex flex-col ${
          isDarkMode ? 'dark' : ''
        }`}
      >
        <div className='bg-white dark:bg-black fixed top-0 left-0 bg-light-mode w-full h-full bg-no-repeat bg-center bg-cover -z-50 dark:opacity-50 blur-md' />
        <Header toggleMode={toggleMode} isDarkMode={isDarkMode} />
        <div className='flex-1 main w-full h-full flex flex-col overflow-auto z-0'>
          <div className='flex-1 p-2 md:p-5 z-0'>
            <Routes>
              <Route path='/exchange' element={<Exchange />} />
              <Route path='/swap' element={<SwapPanel />} />
              <Route path='/liquidity' element={<Pools />} />
              <Route path='/stake' element={<Staking />} />
              <Route path='/' element={<LandingPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
        <AppFooter />
      </div>
      <Modals />
    </>
  )
}

export default App
