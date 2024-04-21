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
import Notify from "@/components/notify";
import { FaCopy } from "react-icons/fa";

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
  const [delayComplete, setDelayComplete] = useState(false);
  const [inTxnDeposit, setInTxnDeposit] = useState(false);
  const [inTxnSalary, setInTxnSalary] = useState(false);
  const [inTxnEmployee, setInTxnEmployee] = useState(false);
  const [inTxnEmployeeAward, setInTxnEmployeeAward] = useState(false);
  const [awardGiven, setAwardGiven] = useState(false);
  const [awardee, setAwardee] = useState();
const [textCopied, setTextCopied] = useState(false);


  const [inTxnWithdraw, setInTxnWithdraw] = useState(false);
  const [numberOfEmployees, setNumberOfEmployees] = useState(0);
  const [notifyOpen, setNotifyOpen] = useState(false);

  const { id } = router.query;
  const companyAddress = id;
  let count = 0;

  const depositToCompany = async () => {
    if (!depositAmount) {
      return alert("please enter amount");
    }

    try {
      setInTxnDeposit(true);
      const ToApprove = ethers.utils.parseEther(depositAmount);
      console.log(Number(ToApprove));
      const { hash } = await writeContract({
        address: USDT_CONTRACT_ADDRESS,
        abi: USDT_ABI,
        functionName: "approve",
        args: [companyAddress, ToApprove],
      });
      const receipt = await waitForTransaction({ hash });

      const deposit = await writeContract({
        address: companyAddress,
        abi: FUSE_PAY_ABI,
        functionName: "depositUSDC",
        args: [ToApprove],
      });
      setInTxnDeposit(false);
      getGroupInfo();
      if (deposit) {
        console.log("Deposited");
        // Clear input fields
        setDepositAmount("");
        // Show notification
        setNotifyOpen(true);
      }
    } catch (error) {
      console.log(error);
      setInTxnDeposit(false);
    }
  };
  const paySalaries = async () => {
    try {
      setInTxnSalary(true);
      const { hash } = await writeContract({
        address: companyAddress,
        abi: FUSE_PAY_ABI,
        functionName: "addMonthlySalaries",
        args: [],
      });
      const receipt = await waitForTransaction({ hash });
      if (!receipt) {
        console.log("Failed to pay salaries");
        setInTxnSalary(false);
        return;
      }
      getGroupInfo();
      setInTxnSalary(false);
    } catch (error) {
      console.log(error);
      setInTxnSalary(false);
    }
  };
  const AwardEmployee = async (employeeAddr) => {
  
    try {
      setInTxnEmployeeAward(true);
      if (!employeeAddr) {
        alert("please enter amount");
        return console.log("please enter amount");
      }

      const { hash } = await writeContract({

        address: companyAddress,
        abi: FUSE_PAY_ABI,
        functionName: "selectEmployeeAward",
        args: [employeeAddr],
      });
      const receipt = await waitForTransaction({ hash });
      if (!receipt) {
        console.log("Failed to award employee");
        setInTxnEmployeeAward(false);
        return;
      }
      getGroupInfo();
      setInTxnEmployeeAward(false);
    } catch (error) {
      console.log(error);
      setInTxnEmployeeAward(false);
    }
  };

  const withdrawWages = async () => {
    try {
      if (!withdrawalAmount) {
        alert("please enter amount");
        return console.log("please enter amount");
      }
      setInTxnWithdraw(true);
      const depositAmountInWei =
        Number(withdrawalAmount) * Math.pow(10, 6);

      const ToApprove = ethers.utils.parseEther(withdrawalAmount);
      console.log(Number(ToApprove));

      const { hash } = await writeContract({
        address: companyAddress,
        abi: FUSE_PAY_ABI,
        functionName: "withdrawSalary",
        args: [ToApprove],
      });
      const receipt = await waitForTransaction({ hash });
      if (!receipt) {
        alert("Failed to withdraw salary");
        return;
      }
      setInTxnWithdraw(false);
      getGroupInfo();
    } catch (error) {
      console.log(error);
      setInTxnWithdraw(false);
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

      const numberOfEmployee = getEmployees.length;
      setNumberOfEmployees(numberOfEmployee);

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

      let memberInfo = [];
      let member = {};

      for (let i = 0; i < getEmployees.length; i++) {
        const employeeName = await readContract({
          address: companyAddress,
          abi: FUSE_PAY_ABI,
          functionName: "employeeNames",
          args: [getEmployees[i]],
        });
        member = {
          employeeAddress: getEmployees[i],
          name: employeeName,
        };
        memberInfo.push(member);
      }

      setMembers(memberInfo);

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
      console.log(error);
    }
  };

  // const getAwardee = async () => {
  //   try {
  //     const awardee = await readContract({
  //       address: companyAddress,
  //       abi: FUSE_PAY_ABI,
  //       functionName: "employeeAward",
  //       args: [],
  //     });

  //     if(awardee) {
        
  //       const Name = await readContract({
  //         address: companyAddress,
  //         abi: FUSE_PAY_ABI,
  //         functionName: "employeeNames",
  //         args: [awardee],
  //       });
  //       if(!Name) {
  //         setAwardGiven(false);
  //         return;
  //       }
  //       setAwardGiven(true);
  //       const winner = {
  //         name: Name,
  //         address: awardee,
  //       }
  //       setAwardee(winner);

  //     }else{
  //       setAwardGiven(false);
  //     }

      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const addEmployee = async () => {
    try {
      if (!employeeName  || !employeeName || !employeeAddress || !employeeWage) {
        return alert("Please fill all fields");
      }
      setInTxnEmployee(true);
      const wage = ethers.utils.parseEther(employeeWage);

      const addWorker = await writeContract({
        address: FUSE_PAY_MANAGER_ADDRESS,
        abi: FUSE_PAY_MANAGER_ABI,
        functionName: "addEmployee",
        args: [employeeAddress, companyAddress, wage, employeeName],
      });
      

      if (addWorker) {
        console.log("Succcesss");
        // Show notification
        alert("Employee added successfully");
        setNotifyOpen(true);
        getGroupInfo();
      }
      setInTxnEmployee(false);
    } catch (error) {
      console.error("Error adding worker:", error);
      alert(error)
      setInTxnEmployee(false);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayComplete(true);
    }, 5000); // 4.5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getGroupInfo();
    // getAwardee()
    return () => {
      // cleanup
    };
  }, [address, salary, walletBalance, companyAddress]);
  

  if (!delayComplete) {
    return (
      <Layout>
        <Block strong insetMaterial outlineIos className="text-center">
          <Preloader />
        </Block>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar title="Company" />

      <div className="m-5">
        <div className="company-logo">
          <img
            class="w-20 h-20 rounded-full"
            src={`https://gateway.lighthouse.storage/ipfs/${companyLogo}`}
            alt="Fuse"
          ></img>

          <span>
            {companyName} <br />
            {admin === address ? (
              <span className="text-sm"> Manage Company </span>
            ) : (
              <span className="text-sm"> Company </span>
            )}
          </span>
        </div>

        {/* <BlockTitle>Employee Of The Month 🎉</BlockTitle>
            <Block>
              {awardGiven ? (<>
                <h1>🎉🎉Honorable, {awardee.name} 🎉🎉 </h1>
              <br />
       

              
              <h1>
            {shortenAddress(awardee.address)}{' '}
            <FaCopy
              className={`cursor-pointer ${textCopied ? 'text-green-500' : ''}`}
              onClick={(e) => {
                const textField = document.createElement('textarea');
                textField.innerText = awardee.address;
                document.body.appendChild(textField);
                textField.select();
                document.execCommand('copy');
                setTextCopied(true);
                textField.remove();
                ;
              }}
            />
          </h1>
              </>) : <h1>Not selected</h1>}
             
            </Block> */}

            <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        {admin == address && (
          <>
            <Block className="flex flex-wrap max-w-sm">
              <div className="company-stats">
                <div className="stats">
                  <FaWallet />
                  <span> {companyBalance} cUSD </span>
                  <span>Treasury</span>
                </div>

                <div className="stats">
                  <FaPeopleGroup />
                  <span>{numberOfEmployees}</span>
                  <span>Employees</span>
                </div>

                <div className="stats">
                  <FaMoneyCheckDollar />
                  <span>2</span>
                  <span>Loans</span>
                </div>
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
                      Monthly Award
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members.map((member, index) => (
                    <TableRow key={++index}>
                      <TableCell>{++count}</TableCell>
                      <TableCell className="text-right">
                        {member.name}
                      </TableCell>
                      <TableCell className="text-right">{member.employeeAddress}</TableCell>
                      <TableCell className="text-right">
                        <Button onClick={(e)=> {e.preventDefault(), AwardEmployee(member.employeeAddress)}}>Award</Button>{" "}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          

            <BlockTitle>Finance</BlockTitle>

            <Block>
              {inTxnSalary ? (
                <Preloader className="center-item mt-3" />
              ) : (
                <Button onClick={paySalaries}>Pay Salaries</Button>
              )}

              <div className="mt-4">
                <h1>Deposit to Company Treasury</h1>
                <input
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="py-2 px-3 pr-11 block ml-2 mt-1  border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
                  type="text"
                />
                {inTxnDeposit ? (
                  <Preloader className="center-item mt-3" />
                ) : (
                  <Button
                    onClick={depositToCompany}
                    className="py-2 ml-2 mt-3  px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparentfocus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Deposit
                  </Button>
                )}
              </div>
            </Block>
            <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <BlockTitle>Add Employee</BlockTitle>
            <Block>
              <div class="max-w-sm mx-auto">
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

                {inTxnEmployee ? (
                  <Preloader className="center-item mt-3" />
                ) : (
                  <Button
                    onClick={addEmployee}
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add employee
                  </Button>
                )}
              </div>
            </Block>
          </>
        )}

        <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <BlockTitle>FusePay Wallet</BlockTitle>
        <Block strong inset>
          Your Balance: <strong> {walletBalance} cUSD</strong>{" "}
          <span className="font-bold ml-4 mr-4">| </span> Your monthly Salary:{" "}
          <strong> {salary} cUSD</strong>
          <div>
            <input
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              className="py-2 px-3 pr-11 block ml-2 mt-1  border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              type="text"
            />
            {inTxnWithdraw ? (
              <Preloader className="center-item mt-3" />
            ) : (
              <Button
                onClick={withdrawWages}
                className="py-2 ml-2 mt-3  px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparentfocus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              >
                Withdraw Salary
              </Button>
            )}
          </div>
        </Block>
      </div>
      <Notify
        open={true}
        title="Success"
        message="Transaction Successful!"
      />
    </Layout>
  );
};

export default ViewCompany;
