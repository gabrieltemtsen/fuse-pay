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
import { MdAdd } from "react-icons/md";
import Layout from "../Layout";

const index = () => {
  return (
    <Layout>
      <Navbar title="Staking" />

      <div className="">
        <BlockTitle> Stake Up Funds  </BlockTitle>

       
        <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      </div>
    </Layout>
  );
};

export default index;
