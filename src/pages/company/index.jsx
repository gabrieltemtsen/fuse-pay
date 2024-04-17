/* eslint-disable @next/next/no-img-element */

import React from "react";
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Fab,
  Link,
  Sheet,
  BlockTitle,
  Chip,
} from "konsta/react";

import { MdAdd } from "react-icons/md";
import Layout from "../Layout";
import { useAccount } from "wagmi";
import { shortenAddress } from "../../utils/shortenAddress";
import { readContract } from "@wagmi/core";
import { useEffect, useState } from "react";
import {
  FUSE_PAY_ABI,
  FUSE_PAY_MANAGER_ABI,
  FUSE_PAY_MANAGER_ADDRESS,
} from "../../utils/contracts";
import axios from "axios";
import { useRouter } from "next/router";

export default function Index() {
  const { address } = useAccount(); 
  const router = useRouter();

  const [userCompanies, setUserCompanies] = useState([]);

  const [adminCompanies, setAdminCompanies] = useState([]);

  const [allAdmins, setAdmins] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleClick = (id) => {
    router.push(`/company/${id}`);
  };

  const getAdmins = () => {
    console.log("HkELLp", isAdmin);
    for (let i = 0; i < allAdmins.length; i++) {
      if (address == allAdmins[i]) {
        console.log(true);
        setIsAdmin(true);
      }
      setIsAdmin(false);
    }
  };
  console.log(adminCompanies);

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
          abi: DEFI_WAGE_ABI,
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
      setAdmins(allAdmin);
      setAdminCompanies(adminCompanyInfo);
      console.log(userCompanies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdmins();
    getUserCompanies();
  }, []);

  return (
    <Layout>
      <Navbar title="Company" />

      <div className="">
        <BlockTitle>Your Companies </BlockTitle>
        <List strongIos outlineIos>
          {userCompanies.length > 0 ? (
            userCompanies.map((company, index) => (
              <ListItem
                onClick={() => handleClick(company.companyAddress)}
                key={company.companyAddress}
                media={
                  <img
                    className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
                    src="https://cdn.framework7.io/placeholder/people-160x160-3.jpg"
                    width="80"
                    alt="demo"
                  />
                }
                link
                title={company.companyData.companyName}
              />
            ))
          ) : (
            <ListItem title="No Companies yet" />
          )}
        </List>

        <BlockTitle>Your Owned Companies</BlockTitle>
        <List strongIos outlineIos>
          {adminCompanies.length > 0 ? (
            adminCompanies.map((company, index) => (
              <ListItem
                onClick={() => handleClick(company.companyAddress)}
                chevronMaterial={false}
                subtitle={company.companyData.companyDescription}
                key={company.companyAddress}
                media={
                  <img
                    className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
                    src={`https://gateway.lighthouse.storage/ipfs/${company.companyData.companyLogo}`}
                    width="80"
                    alt="img"
                  />
                }
                link
                title={company.companyData.companyName}
              />
            ))
          ) : (
            <ListItem title="No Companies yet" />
          )}
          <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </List>
        {/* <Fab
        className="fixed text-sm left-1/2 bottom-18-safe transform -translate-x-1/2 z-20"
        icon={<MdAdd />}
        text="Create"
        textPosition="after"
      /> */}
      </div>
    </Layout>
  );
}
