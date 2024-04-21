/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Page,
  Navbar,
  Block,
  Button,
  Card,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Preloader,
  Table,
  List,
  ListItem,
  Link,
  Sheet,
  BlockTitle,
  Chip,
} from "konsta/react";
import { ethers } from "ethers";
import Layout from "../Layout";
import { FaWallet } from "react-icons/fa";
import { FaMoneyCheckDollar, FaPeopleGroup } from "react-icons/fa6";
import { useAccount } from "wagmi";
import { shortenAddress } from "../../utils/shortenAddress";
import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
import {
  FUSE_PAY_ABI,
  FUSE_PAY_MANAGER_ABI,
  FUSE_PAY_MANAGER_ADDRESS,
  USDT_CONTRACT_ADDRESS,
  USDT_ABI,
} from "../../utils/contracts";

const Index = () => {
  const { address } = useAccount();
  const [inTxn, setInTxn] = useState(false);
  const [loanAmount, setLoanAmount] = useState('');
  const [companyAddress, setCompanyAddress] = useState(''); 
  const [reason, setReason] = useState(''); 
  const [userCompanies, setUserCompanies] = useState([]);
  const [allAdmins, setAllAdmins] = useState([]);
  const [adminCompanies, setAdminCompanies] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [loanRequests, setLoanRequests] = useState([]);

 

  const requestLoan = async () => {
    try {
      if (!loanAmount || !companyAddress || !reason) {
        alert("Please enter all fields");
        console.log("Please enter all fields");
        return;
      }
  
      setInTxn(true);
  
      // Convert loanAmount to Wei
      const amountInWei = ethers.utils.parseEther(loanAmount.toString());
      const amount = amountInWei.toString();
  
      const { hash } = await writeContract({
        address: companyAddress,
        abi: FUSE_PAY_ABI,
        functionName: "requestLoan",
        args: [amount, reason],
      });
      
      const receipt = await waitForTransaction({ hash });
      if (!receipt) {
        console.log("Failed to request loan");
        setInTxn(false);
        return;
      }
      console.log("Loan requested successfully");
    } catch (error) {
      console.log(error);
      setInTxn(false);
    }
  };

  const getAllLoanRequests = async (companyAdd) => {
    try {
      alert(companyAdd);
      const allLoanRequests = await readContract({
        address: companyAdd,
        abi: FUSE_PAY_ABI,
        functionName: "getAllLoanRequests",
        args: [],
      });
      console.log(allLoanRequests);
    } catch (error) {
      console.log(error);
    }
  };





  const getUserCompanies = async () => {
    try {
      const employeeCompanies = await readContract({
        address: FUSE_PAY_MANAGER_ADDRESS,
        abi: FUSE_PAY_MANAGER_ABI,
        functionName: "getEmployeeCompanies",
        args: [address],
      });
      const adminCompanies = await readContract({
        address: FUSE_PAY_MANAGER_ADDRESS,
        abi: FUSE_PAY_MANAGER_ABI,
        functionName: "getAdminCompanies",
        args: [address],
      });


      // const getAllCompanies = await readContract({
      //   address: FUSE_PAY_MANAGER_ADDRESS,
      //   abi: FUSE_PAY_MANAGER_ABI,
      //   functionName: "getCompanies",
      //   args: [],
      // });

      let companyInfo = [];
      let adminCompanyInfo = [];
      let allAdmin = [];

      for (let i = 0; i < employeeCompanies.length; i++) {
        const companyCID = await readContract({
          address: employeeCompanies[i],
          abi: FUSE_PAY_ABI,
          functionName: "companyCID",
          args: [],
        });

        const admin = await readContract({
          address: employeeCompanies[i],
          abi: FUSE_PAY_ABI,
          functionName: "admin",
          args: [],
        });
        allAdmin.push(admin);

        if (companyCID) {
          let config = {
            method: "get",
            url: `https://gateway.lighthouse.storage/ipfs/${companyCID}`,
            headers: {},
          };

          const axiosResponse = await axios(config);

          const companyDataObj = axiosResponse.data;
          console.log("XXXX", companyDataObj);

          const companyAdress = employeeCompanies[i];

          const companyObject = {
            companyAddress: companyAdress,
            companyData: companyDataObj,
          };

          companyInfo.push(companyObject);
        }
      }
      for (let i = 0; i < adminCompanies.length; i++) {
        const companyCID = await readContract({
          address: adminCompanies[i],
          abi: FUSE_PAY_ABI,
          functionName: "companyCID",
          args: [],
        });

        if (companyCID) {
          let config = {
            method: "get",
            url: `https://gateway.lighthouse.storage/ipfs/${companyCID}`,
            headers: {},
          };
          const axiosResponse = await axios(config);

          const companyDataObj = axiosResponse.data;
          const companyAdress = adminCompanies[i];

          const companyObject = {
            companyAddress: companyAdress,
            companyData: companyDataObj,
          };

          adminCompanyInfo.push(companyObject);
        }
      }
      setUserCompanies(companyInfo);
      setAllAdmins(allAdmin)
      setAdminCompanies(adminCompanyInfo);
      console.log(allAdmin)

    } catch (error) {
      console.log(error);
    }
  };
  const getAdmins = () => {
    console.log("hey", isAdmin);
    for (let i = 0; i < allAdmins.length; i++) {
      if (address == allAdmins[i]) {
        console.log(true);
        setIsAdmin(true);
      }
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    getUserCompanies();
    getAdmins()
    
  }, [address]);
  return (
    <Layout>
      <Navbar title="Loans" />

      <div className="m-5">
        <BlockTitle> Request Loan </BlockTitle>

        <Block>
          <div class="max-w-sm mx-auto">


          <div class="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
               Your Company
              </label>
              <select
                onChange={(e) => setCompanyAddress(e.target.value)}
                type="text"
                id="text"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="100"
                required
              >
                <option value="" disabled >Select Company</option>
                { userCompanies.length > 0 ? userCompanies.map((company, index) => (

                  <option key={++index} value={company.companyAddress}>{company.companyData.companyName}</option>
                
                )): <option value="">No Company</option>}
              


                </select>
            </div>


            <div class="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Loan Amount(cUsd)
              </label>
              <input
                onChange={(e) => setLoanAmount(e.target.value)}
                type="text"
                id="text"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="100"
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Reason
              </label>
              <input
              onChange={(e) => setReason(e.target.value)}
                type="text"
                id="text"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="emergency"
                required
              />
            </div>

           {inTxn ? <Preloader className="center-item mt-3" /> :  <button
              onClick={requestLoan}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Apply for Loan
            </button>}
          </div>
        </Block>

        {adminCompanies.length > 0 && (
  <>
    <BlockTitle>Loan Requests</BlockTitle>
    <Block>
      <div class="mb-5">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Company to get Requests
        </label>
        <select
          onChange={(e) => getAllLoanRequests(e.target.value)}
          type="text"
          id="text"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="100"
          required
        >
          <option value="">Select Company</option>
          {adminCompanies.map((company, index) => (
            <option key={index} value={company.companyAddress}>
              {company.companyData.companyName}
            </option>
          ))}
        </select>
      </div>
    </Block>

    <Card className="block overflow-x-auto mt-8" contentWrap={false}>
      <Table>
        <TableHead>
          <TableRow header>
            <TableCell header>SN</TableCell>
            <TableCell header className="text-right">
              Employee Name
            </TableCell>
            <TableCell header className="text-right">
              Address/Phone
            </TableCell>
            <TableCell header className="text-right">
              Loan Amount
            </TableCell>
            <TableCell header className="text-right">
              Loan Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Render loan requests here */}
        </TableBody>
      </Table>
    </Card>
  </>
)}


        
        <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      </div>
    </Layout>
  );
};

export default Index;
