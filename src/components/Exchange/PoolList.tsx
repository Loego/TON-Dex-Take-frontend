import { useEffect, useState } from "react";
import { showModal } from "../../redux/reducers/modals";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "./exchange.header.scss";
import { retrieveTopPools, selectInfo } from "../../redux/reducers/info";
import { useTonClient } from "../../hook/useTonClient";

export default function PoolList() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const info = useAppSelector(selectInfo);
  const client = useTonClient();

  const showTokenPair = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsShow(!isShow);
  };

  const handleSettingModal = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(showModal("exchange-setting"));
  };

  useEffect(() => {
    if (client) {
      dispatch(retrieveTopPools(client));
    }
  }, [client]);

  return (
    <div className="flex items-center justify-center w-full px-20">
      <div className="token-pair-dropdown">
        <div className="token-pair-dropdown-search-panel">
          <div className="token-search-panel-container">
            <div className="token-search-panel-main-container">
              <div className="token-search-icon-div">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for a token pair"
                className="token-search-input-form"
              ></input>
            </div>
          </div>
        </div>
        <div className="token-pair-divider"></div>
        <div className="token-pair-main-content">
          <div>
            {info.topPools &&
              info.topPools.map((pool, index) => {
                return (
                  <div key={index}>
                    {pool.token1?.symbol} / {pool.token2?.symbol}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
