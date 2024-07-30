import { useState } from "react";
import icon from "../../assets/three_line.svg";
const faqData = [
  {
    question: "What is Staking?",
    answer:
      "Staking is the process of actively participating in transaction validation (similar to mining) on a proof-of-stake (PoS) blockchain.",
  },
  {
    question: "How are the staking rewards funded?",
    answer:
      "To stake, you need to hold a specific amount of the cryptocurrency and use a staking platform to lock your funds.",
  },
  {
    question: "What is SCALE?",
    answer:
      "Staking can provide rewards in the form of additional tokens or coins, thus generating passive income.",
  },
  {
    question: "How often are rewards distributed?",
    answer:
      "Staking involves risks, including market volatility and the potential loss of staked assets. Always do thorough research.",
  },
  {
    question: "How can I unstake my SCALE tokens?",
    answer:
      "Staking involves risks, including market volatility and the potential loss of staked assets. Always do thorough research.",
  },
];

function Stake() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="flex flex-col gap-10 justify-center md:px-20 px-10 pt-10 md:pb-0 pb-24 items-center h-full w-full">
      <div className="w-full rounded-xl relative p-6 grid md:grid-cols-4 grid-cols-2 gap-4 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90">
        <div>
          <h2 className="text-black dark:text-white text-base pb-3">
            Available to Stake
          </h2>
          <div className="flex items-center gap-3">
            <img src={icon} alt="" />
            <h2 className='text-black dark:text-white text-[20px] font-[600] pb-3"'>
              0.0
            </h2>
          </div>
          <h2 className="text-black dark:text-white text-base ">$ 0.00</h2>
        </div>
        <div>
          <h2 className="text-black dark:text-white text-base pb-3">
            Staking
          </h2>
          <div className="flex items-center gap-3">
            <img src={icon} alt="" />
            <h2 className='text-black dark:text-white text-[20px] font-[600] pb-3"'>
              0.0
            </h2>
          </div>
          <h2 className="text-black dark:text-white text-base ">$ 0.00</h2>
        </div>
        <div>
          <h2 className="text-black dark:text-white text-base pb-3">
            Rewards
          </h2>
          <div className="flex items-center gap-3">
            <h2 className='text-black dark:text-white text-[20px] font-[600] pb-3"'>
              15.23% APR
            </h2>
          </div>
          <h2 className="text-black dark:text-white text-base underline">
            More Info
          </h2>
        </div>
        <div>
          <h2 className="text-black dark:text-white text-base pb-3">
            Unstaking
          </h2>
          <div className="flex items-center gap-3">
            <img src={icon} alt="" />
            <h2 className='text-black dark:text-white text-[20px] font-[600] pb-3"'>
              0.0
            </h2>
          </div>
          <h2 className="text-black dark:text-white text-base ">$ 0.00</h2>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-10 w-full">
        <div className="md:w-[50%] w-full flex flex-col gap-10">
          <div className="w-full rounded-xl relative p-6 flex flex-col bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90">
            <h2 className="text-black dark:text-white text-[18px] font-semibold pb-3">
              Stake
            </h2>
            <p className="text-black dark:text-white text-base font-medium">
              Earn a share of the protocol&apos;s fees while staking SCALE
            </p>
            <div className="flex items-center justify-center pt-3 w-full">
              <div className="flex items-center gap-4 rounded-xl w-fit border p-2">
                <button className="py-2 px-6 text-black dark:text-white bg-[#0364F733] rounded-xl">
                  Stake
                </button>
                <button className="py-2 px-6 text-black dark:text-white rounded-xl">
                  Unstake
                </button>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-black dark:text-white text-xs font-semibold">
                  Available Amount:
                </h2>
                <h2 className="text-black dark:text-white text-xs font-semibold">
                  2.8989 USDT (Max)
                </h2>
              </div>
              <div className="flex items-center my-4 justify-between border border-black dark:border-white p-3 rounded-xl">
                <input
                  type="number"
                  className="bg-transparent outline-none w-[400px] text-black dark:text-white"
                  placeholder="0.00"
                />
                <div className="bg-white dark:bg-gray-800 bg-opacity-90 w-fit p-2 rounded-xl dark:bg-opacity-90 text-black dark:text-white">
                  MAX
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-black dark:text-white text-xs font-semibold">
                  Available Amount:
                </h2>
                <h2 className="text-black dark:text-white text-xs font-semibold">
                  2.8989 USDT (Max)
                </h2>
              </div>

              <div className="text-right py-2">
                <h2 className="text-black dark:text-white text-xs font-semibold text-opacity-40">
                  Est Network Fee: 0.0003 SCALE
                </h2>
              </div>

              <button className="bg-gradient-to-tr from-[#B5D73E] to-[#06A5FF] w-full rounded-xl py-3">
                Stake
              </button>
            </div>
          </div>
          <div className="w-full rounded-xl relative p-6 flex flex-col bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90">
            <h2 className="text-black dark:text-white text-xl font-semibold pb-3">
              History
            </h2>
            <p className="text-black dark:text-white">No History Found</p>
          </div>
        </div>
        <div className="md:w-[50%] w-full">
          <div className="w-full rounded-xl relative p-6 flex flex-col bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90">
            <h2 className="text-black dark:text-white text-[18px] font-semibold pb-3">
              FAQ
            </h2>

            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`rounded-xl p-4 border border-gray-800 dark:border-white mb-4 cursor-pointer ${
                  openIndex === index ? "bg-gray-100 dark:bg-gray-700" : ""
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-black text-[20px] dark:text-white font-semibold">
                    {faq.question}
                  </h2>
                  <p className="text-black dark:text-white">
                    {openIndex === index ? "-" : "+"}
                  </p>
                </div>
                {openIndex === index && (
                  <p className="text-black dark:text-white mt-2">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stake;
