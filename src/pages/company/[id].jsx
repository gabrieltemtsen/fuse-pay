
import React from 'react'

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
} from 'konsta/react';
import Layout from '../Layout'
import { FaWallet} from "react-icons/fa";
import { FaMoneyCheckDollar,FaPeopleGroup } from "react-icons/fa6";
const ViewCompany = () => {
  return (
    <Layout>
        <Navbar title="companyTitle" />

        <div className='m-5'>


            <div className='company-logo'>
            <img class="w-20 h-20 rounded-full" src="https://shorturl.at/jsTXZ" alt="Large avatar"></img> 

            <span>COMPANY NAME STATED HERE:  <br />

            <span> Manage Company funds </span>
            
            </span>

            </div>


      <Block>

      <div className='company-stats'>

        <div className='stats'>
        <FaWallet />
        <span>$1000</span>
        <span>Treasury</span>
        </div>

        <div className='stats'>
        <FaPeopleGroup />
        <span>90</span>
        <span>Employees</span>
        </div>

        <div className='stats'>
        <FaMoneyCheckDollar />
        <span>20</span>
        <span>Payments</span>
        </div>

      </div>
        
      </Block>
      <BlockTitle>FusePay Wallet</BlockTitle>
      <Block strong inset>
      Your Balance: <strong>10cUSD</strong>  <span className="font-bold ml-4 mr-4">| </span> Your monthly Salary: <strong>500cUSD</strong>
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
      <div className='mt-4'>
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
    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee Name</label>
    <input type="text" id="text" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Moh Farhun" required />
  </div>
  <div class="mb-5">
    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee Address</label>
    <input type="text" id="text" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="0xgabe" required />
  </div>
  <div class="mb-5">
    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary ($)</label>
    <input type="text" id="text" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="2000cUSD" required />
  </div>

  
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add employee</button>
</form>
     </Block>



        </div>

    
    </Layout>
  )
}

export default ViewCompany