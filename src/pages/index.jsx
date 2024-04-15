        import {
          Page,
          Navbar,
          Block,
          Button,
          List,
          ListItem,
          Link,
          Sheet,  
          BlockTitle,
          Chip,
        } from 'konsta/react';
        import { useEffect, useState } from 'react';
        import CeloICON from '/public/celo.png';
import Image from 'next/image';
import Layout from './Layout';

        const { ethers } = require("ethers");
        const { stableTokenABI } = require("@celo/abis");

const STABLE_TOKEN_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

const { Contract, utils, providers } = ethers;
const { formatEther } = utils;

     
        
        export default function Home() {
          const [balance, setBalance] = useState(0);
          const [message, setMessage] = useState("NUll");
          const [sheetOpened, setSheetOpened] = useState(false);

          // Ensure MiniPay provider is available
          if (typeof window !== 'undefined') {
            // Your window-dependent code here
            if (window.ethereum && window.ethereum.isMiniPay) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                console.log(signer._address);
                // alert("MiniPay provider is available");
            }else{
              // alert("MiniPay provider is not available");
            }
          }
          async function checkCUSDBalance(provider, address) {
            const StableTokenContract = new Contract(
              STABLE_TOKEN_ADDRESS,
              stableTokenABI,
              provider
            );
          
            let balanceInBigNumber = await StableTokenContract.balanceOf(address);
          
            let balanceInWei = balanceInBigNumber.toString();
          
            let balanceInEthers = formatEther(balanceInWei); // Ether is a unit = 10 ** 18 wei
          
            return balanceInEthers;
          }
          const provider = new providers.JsonRpcProvider("https://forno.celo.org"); // Mainnet

          const getMiniPayAddress = async() => {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const address = accounts[0];
            console.log(address);
            const signer = provider.getSigner();
            console.log(signer);

            // let balancer = await checkCUSDBalance(provider, signer._address); // In Ether unit

            // setBalance(balancer);

          }; // In Ether unit

          useEffect(() => {
            getMiniPayAddress();
          }
          , []);


          return (
           
              <>
              <Layout>
              <Navbar title="Fuse Pay" /><div className='h-full'>
              <section class="bg-white dark:bg-gradient-to-b from-blue-700/[4.79] via-gray-800 h-full">
                <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
                  <a href="#" class="inline-flex items-center justify-between px-1 py-1 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full mb-7 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
                    <Chip
                      media={<img
                        alt="celo"
                        className="ios:h-7 material:h-6 rounded-full"
                        src="/celo.png" />}
                      class="text-xs bg-black rounded-full text-white px-4 py-1.5 mr-3"></Chip> <span class="text-sm font-medium">Powered by Celo</span>
                    <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                  </a>
                  <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We Help you manage your Company`s Finance</h1>
                  <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Here at Fuse Pay we focus on markets where AI technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                  <div class="flex mb-8 align-center justify-center space-x-4 lg:mb-16 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <Link onClick={() => setSheetOpened(true)} className="inline-flex bg-blue-800  max-w-sm justify-center items-center gap-x-3 text-center shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800">
                      Register company
                      <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </Link>
                    <Link className=" max-w-sm inline-flex justify-center items-center gap-x-1 text-center bg-gradient-to-tl from-blue-900 to-black-900 shadow-lg shadow-transparent hover:shadow-black-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800 mx-5" href="/dashboard">
                      View company
                      <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </Link>

                  </div>

                </div>
              </section>
            </div><Sheet
              className="pb-safe"
              opened={sheetOpened}
              onBackdropClick={() => setSheetOpened(false)}
            >
                <div class="relative p-4 w-full max-w-md max-h-full mb-15">
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Create a company workspace
                      </h3>
                      <button onClick={(e) => { setSheetOpened(false); } } type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                      </button>
                    </div>
                    <div class="p-4 md:p-5">
                      <form class="space-y-4" action="#">
                        <div>
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                          <input type="text" name="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Fuse Pay" required />
                        </div>

                        <div>
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                          <input type="text" name="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="About Fuse Pay" required />
                        </div>
                        <div>
                          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="default_size">Company Logo</label>
                          <input class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="default_size" type="file" />
                        </div>

                        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>

                      </form>
                    </div>
                  </div>
                </div>

              </Sheet>

              </Layout>
              
           
              </>
          );
        }
        
        