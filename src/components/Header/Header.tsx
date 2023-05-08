import {TonConnectButton, TonConnectUI, TonConnectUIProvider, useTonConnectUI} from "@tonconnect/ui-react";
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
    WalletIcon,
    ArrowRightOnRectangleIcon,
    ArrowLeftOnRectangleIcon
  } from '@heroicons/react/24/outline'

import { Link } from "react-router-dom";
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'

const products = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
  ]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

export const Header = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [tonConnectUi] = useTonConnectUI();

    return (
    <header className="bg-littledark fixed w-full">
      <nav className="mx-auto flex items-center justify-between p-6 lg:px-20" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          { mobileMenuOpen == false ? <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)} 
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6"  aria-hidden="true"/>
          </button> : <></> }
          
        </div>
        <Popover.Group className="hidden lg:gap-x-12 lg:flex items-center">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
              Product
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
            <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-white/70 bg-gray-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                    {item.name}
                  </a>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>

        <Link to ="/exchange" className="text-sm font-semibold leading-6 text-white">
          Features
        </Link>
        <Link to ="/exchange" className="text-sm font-semibold leading-6 text-white">
          Exchange
        </Link>
        <Link to ="/exchange" className="text-sm font-semibold leading-6 text-white">
          MarketPlace
        </Link>
        <Link to = "/exchange" className="text-sm font-semibold leading-6 text-white">
          Company
        </Link>
      </Popover.Group>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-12">
        <button className="inline-flex gap-2 text-sm font-semibold leading-6 text-white bg-transparent"
          onClick={() => tonConnectUi.connectWallet()}>
          <p>Connect Wallet</p>
          <WalletIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </nav>
    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
      <div className="fixed inset-0 z-10" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-700 px-6 py-6">
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-white/75">
            <div className="space-y-2 py-6">
              <Disclosure as="div" className="-mx-3">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white/70 hover:bg-white hover:text-black">
                      Product
                      <ChevronDownIcon
                        className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 space-y-2">
                      {[...products, ...callsToAction].map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white/70 hover:bg-white hover:text-black"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white/70 hover:bg-white hover:text-black"
              >
                Features
              </a>
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white/70 hover:bg-white hover:text-black"
              >
                Marketplace
              </a>
              <Link to = "/exchange" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white/70 hover:bg-white hover:text-black">
                Company
              </Link>
              <Link to = "/exchange" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white/70 hover:bg-white hover:text-black">
                Exchange
              </Link>
            </div>
            <div className="py-6 flex justify-center">
              <button className="-mx-3 block w-1/2 bg-btn_color rounded-lg px-2 py-1.5 text-base font-bold leading-7 text-white hover:bg-purple-800"
              onClick={() => tonConnectUi.connectWallet()}
              >
                Connect Wallet
              </button>
              {/* <TonConnectButton /> */}
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  </header>
    )
}


