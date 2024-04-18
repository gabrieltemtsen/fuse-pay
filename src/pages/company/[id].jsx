/* eslint-disable @next/next/no-img-element */
import React from "react";

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
import { readContract, writeContract } from "@wagmi/core";
import { useEffect, useState } from "react";
import {
  FUSE_PAY_ABI,
  FUSE_PAY_MANAGER_ABI,
  FUSE_PAY_MANAGER_ADDRESS,
  USDT_CONTRACT_ADDRESS,
  USDT_ABI,
} from "../../utils/contracts";
import axios from "axios";
import { useRouter } from "next/router";

const ViewCompany = () => {
  const { address } = useAccount();

  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [members, setMembers] = useState([]);
  const [admin, setAdmin] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [employeeWage, setEmployeeWage] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [salary, setSalary] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [companyBalance, setCompanyBalanace] = useState();

  const { id } = router.query;
  const companyAddress = id;
  let count = 0;

  const depositToCompany = async () => {
    if (!depositAmount) {
      return toast.error("please enter amount");
    }

    try {
      const ToApprove = ethers.utils.parseEther(depositAmount);
      console.log(Number(ToApprove));
      const { hash } = await writeContract({
        address: USDT_CONTRACT,
        abi: USDT_ABI,
        functionName: "approve",
        args: [companyAddress, ToApprove],
      });
      const receipt = await waitForTransaction({ hash });

      const deposit = await writeContract({
        address: companyAddress,
        abi: DEFI_WAGE_ABI,
        functionName: "depositUSDC",
        args: [ToApprove],
      });
      getGroupInfo();
      if (deposit) {
        toast.success("Deposited");
        // Clear input fields
        setDepositAmount("");
      }
    } catch (error) {
      console.log(error);
    }
    const paySalaries = async () => {
      try {
        const { hash } = await writeContract({
          address: companyAddress,
          abi: DEFI_WAGE_ABI,
          functionName: "addMonthlySalaries",
          args: [],
        });
        const receipt = await waitForTransaction({ hash });
        if (!receipt) {
          toast.error("Failed to pay salaries");
          return;
        }
        getGroupInfo();
      } catch (error) {
        console.log(error);
      }
    };
  };
  const withdrawWages = async () => {
    try {
      const depositAmountInWei = Number(withdrawalAmount) * Math.pow(10, 6);

      const ToApprove = ethers.utils.parseEther(withdrawalAmount);
      console.log(Number(ToApprove));

      const { hash } = await writeContract({
        address: companyAddress,
        abi: DEFI_WAGE_ABI,
        functionName: "withdrawSalary",
        args: [ToApprove],
      });
      const receipt = await waitForTransaction({ hash });
      if (!receipt) {
        toast.error("Failed to withdraw salary");
        return;
      }
      getGroupInfo();
    } catch (error) {
      console.log(error);
    }
  };
  const getGroupInfo = async () => {
    try {
      


      const companyCID = await readContract({
        address: companyAddress,
        abi: FUSE_PAY_ABI,
        functionName: "companyCID",
        args: [],
      });

      const bal = await readContract({
        address: USDT_CONTRACT_ADDRESS,
        abi: USDT_ABI,
        functionName: "balanceOf",
        args: [companyAddress],
      });
      setCompanyBalanace(ethers.utils.formatEther(bal));

      const companyAdmin = await readContract({
        address: companyAddress,
        abi: FUSE_PAY_ABI,
        functionName: "admin",
        args: [],
      });

      setAdmin(companyAdmin);

      const getEmployees = await readContract({
        address: companyAddress,
        abi: FUSE_PAY_ABI,
        functionName: "getEmployees",
        args: [],
      });

      const getEmployeeWalletBalance = await readContract({
        address: companyAddress,
        abi: FUSE_PAY_ABI,
        functionName: "getEmployeeWalletBalance",
        args: [address],
      });
      setWalletBalance(ethers.utils.formatEther(getEmployeeWalletBalance));
      const getEmployeeSalary = await readContract({
        address: companyAddress,
        abi: FUSE_PAY_ABI,
        functionName: "getEmployeeSalary",
        args: [address],
      });
      setSalary(ethers.utils.formatEther(getEmployeeSalary));

      setMembers(getEmployees);

      let config = {
        method: "get",
        url: `https://gateway.lighthouse.storage/ipfs/${companyCID}`,
        headers: {},
      };
      const axiosResponse = await axios(config);

      const companyData = axiosResponse.data;
      setCompanyName(companyData.companyName);
      setCompanyLogo(companyData.companyLogo);
    } catch (error) {
      console.log(error)
    }
  };

  const addEmployee = async () => {
    try {
      const wage = ethers.utils.parseEther(employeeWage);

      const addWorker = await writeContract({
        address: FUSE_PAY_MANAGER_ADDRESS,
        abi: FUSE_PAY_MANAGER_ABI,
        functionName: "addEmployee",
        args: [employeeAddress, companyAddress, wage],
      });
      getGroupInfo();

      if (addWorker) {
        toast.success("Successfull");
      }

      // Clear input fields
      // setNames([]);
      // setWeights([]);
    } catch (error) {
      console.error("Error adding dimensions:", error);
    }
  };
  getGroupInfo();
  useEffect(() => {
    getGroupInfo();

    // You can also return a cleanup function if needed
    return () => {
      // This code will run when the component unmounts
      // You can clean up any resources or subscriptions here
    };
  }, [address, salary, walletBalance, companyAddress]); // The empty dependency array means this effect runs once, like componentDidMount

  return (
    <Layout>
      <Navbar title="companyTitle" />

      <div className="m-5">
        <div className="company-logo">
          <img
            class="w-20 h-20 rounded-full"
            src={`https://gateway.lighthouse.storage/ipfs/${companyLogo}`}
            alt="Large avatar"
          ></img>

          <span>
            {companyName} <br />
            {admin === address ? <span className="text-sm"> Manage Company </span> : <span className="text-sm"> Company </span> }
          </span>
        </div>

        <Block className="flex flex-wrap max-w-sm">
          <div className="company-stats">
            <div className="stats">
              <FaWallet />
              <span>$1000</span>
              <span>Treasury</span>
            </div>

            <div className="stats">
              <FaPeopleGroup />
              <span>90</span>
              <span>Employees</span>
            </div>

            <div className="stats">
              <FaMoneyCheckDollar />
              <span>20</span>
              <span>Payments</span>
            </div>
          </div>
        </Block>
        <BlockTitle>FusePay Wallet</BlockTitle>
        <Block strong inset>
          Your Balance: <strong>10cUSD</strong>{" "}
          <span className="font-bold ml-4 mr-4">| </span> Your monthly Salary:{" "}
          <strong>500cUSD</strong>
          <div>
            <input
              className="py-2 px-3 pr-11 block ml-2 mt-1  border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              type="text"
            />
            <button
              type="button"
              className="py-2 ml-2 mt-3  px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparentfocus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            >
              Withdraw Salary
            </button>
          </div>
        </Block>

        <BlockTitle>Employees</BlockTitle>
        <Card className="block overflow-x-auto mt-8" contentWrap={false}>
          <Table>
            <TableHead>
              <TableRow header>
                <TableCell header>SN </TableCell>
                <TableCell header className="text-right">
                  Employee Name
                </TableCell>
                <TableCell header className="text-right">
                  Address/Phone
                </TableCell>
                <TableCell header className="text-right">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell className="text-right">159</TableCell>
                <TableCell className="text-right">6.0</TableCell>
                <TableCell className="text-right">24</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell className="text-right">237</TableCell>
                <TableCell className="text-right">9.0</TableCell>
                <TableCell className="text-right">37</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
        <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <BlockTitle>Finance</BlockTitle>

        <Block>
          <Button>Pay Salaries</Button>
          <div className="mt-4">
            <h1>Deposit to Company Treasury</h1>
            <input
              className="py-2 px-3 pr-11 block ml-2 mt-1  border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              type="text"
            />
            <button
              type="button"
              className="py-2 ml-2 mt-3  px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparentfocus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            >
              Deposit
            </button>
          </div>
        </Block>
        <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <BlockTitle>Add Employee</BlockTitle>
        <Block>
          <form class="max-w-sm mx-auto">
            <div class="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Employee Name
              </label>
              <input
                onChange={(e) => setEmployeeName(e.target.value)}
                type="text"
                id="text"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Moh Farhun"
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Employee Address
              </label>
              <input
                onChange={(e) => setEmployeeAddress(e.target.value)}
                type="text"
                id="text"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="0xgabe"
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Salary ($)
              </label>
              <input
                onChange={(e) => setEmployeeWage(e.target.value)}
                type="text"
                id="text"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="2000cUSD"
                required
              />
            </div>

            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add employee
            </button>
          </form>
        </Block>
      </div>
    </Layout>
  );
};

export default ViewCompany;
