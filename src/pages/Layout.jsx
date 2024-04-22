import React, { useEffect, useState } from 'react';
import {
  Page,
  Navbar,
  Link,
  Button,
} from "konsta/react";
import { FaHandHoldingUsd, FaBriefcase } from "react-icons/fa";
import { GiFarmer } from "react-icons/gi";
import { IoIosHome } from "react-icons/io";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useConnect } from "wagmi";

const Layout = ({ children,  chat = [] , setChat, userInput, setUserInput, handleChatSubmit }) => {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect();

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      setHideConnectBtn(true);
      connect({ connector: new InjectedConnector() });
    }
  }, [connect]);

  return (
    <Page>
      <div className="normalHeight">
        <div className="flex items-center pr-2">
          {!hideConnectBtn && (
            <div className="w-full conn mt-1 p-1">
              <ConnectButton
                showBalance={{
                  smallScreen: true,
                  largeScreen: false,
                }}
              />
            </div>
          )}
        </div>
        {children}
      </div>

      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          <Link href="/" className="navigation-link"><IoIosHome /><span>Home</span></Link>
          <Link href="/stake" className="navigation-link"><GiFarmer /><span>Stake</span></Link>
          <Link href="/company" className="navigation-link"><FaBriefcase /><span>Company</span></Link>
          <Link href="/loan" className="navigation-link"><FaHandHoldingUsd /><span>Loans</span></Link>
        </div>

        {/* Chatbot UI */}
        <div className="chatbot-ui fixed bottom-0 right-0 m-4 max-w-xs p-4 bg-white rounded-lg shadow-lg flex flex-col">
          <ul className="chat-messages-list overflow-auto mb-4">
            {chat && chat.map((message, index) => (
              <li key={index} className={`p-2 rounded-lg mb-2 ${message.type === 'bot' ? 'bg-purple-100' : 'bg-purple-500 text-white'}`}>
                {message.text}
              </li>
            ))}
          </ul>
          <div className="chat-input-container flex items-center">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              className="flex-grow border rounded-full py-2 px-4 mr-2 focus:outline-none"
              placeholder="Write a message..."
            />
            <button onClick={handleChatSubmit} className="bg-purple-500 text-white rounded-full p-2">
              Send
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Layout;