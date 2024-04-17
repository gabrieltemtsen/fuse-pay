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
      <Navbar title="Loans" />

      <div className="">
        <BlockTitle> Request Loan </BlockTitle>

        <Block>
          <form class="max-w-sm mx-auto">
            <div class="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Loan Amount(cUsd)
              </label>
              <input
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
                type="text"
                id="text"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="emergency"
                required
              />
            </div>

            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Apply for Loan
            </button>
          </form>
        </Block>

        <BlockTitle>Loan Requests</BlockTitle>
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
                  Loan Amount
                </TableCell>
                <TableCell header className="text-right">
                  Loan Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell className="text-right">159</TableCell>
                <TableCell className="text-right">6.0</TableCell>
                <TableCell className="text-right">6.0</TableCell>

                <TableCell className="text-right">24</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell className="text-right">237</TableCell>
                <TableCell className="text-right">9.0</TableCell>
                <TableCell className="text-right">6.0</TableCell>

                <TableCell className="text-right">37</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
        <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      </div>
    </Layout>
  );
};

export default index;
