// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "./IERC20.sol";

contract FusePay {
    string public companyCID;
    uint public companyID;
    address public admin;
    address public employeeAward;
    address[] public employees;
    mapping(address => uint256) public employeeSalaries;
    mapping(address => string) public employeeNames;
    mapping(address => uint256) public employeeWalletBalances;

     enum LoanStatus {
         Pending,
          Approved, 
          Rejected
           }

   struct Loan {
    uint256 loanAmount;
    string reason;
    LoanStatus status;
}

mapping(address => Loan[]) public loans;

    constructor(string memory _companyCID, address _admin, uint _companyID) {
        companyCID = _companyCID;
        admin = _admin;
        companyID = _companyID;
    }

    modifier onlyOneEmployee(address _employeeAddress) {
        for (uint i = 0; i < employees.length; i++) {
            require(employees[i] != _employeeAddress, 'Employee already Exists');
        }
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, 'Not an Admin');
        _;
    }

    function depositUSDC(uint256 amount) public onlyAdmin payable {
        IERC20 usdc = IERC20(0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1);
        
        require(usdc.transferFrom(admin, payable(address(this)), amount), 'Deposit failed');
    }

    function addEmployee(address _employeeAddress) public onlyOneEmployee(_employeeAddress) returns (bool) {
        employees.push(_employeeAddress);
        employeeWalletBalances[_employeeAddress] = 0; // Initialize wallet balance to zero
        return true;
    }
    
    function setEmployeeName(address _employeeAddress, string memory _name) public returns (bool) {
        employeeNames[_employeeAddress] = _name;
        return true;
    }

    function setEmployeeSalary(address _employeeAddress, uint256 _salary) public  returns (bool) {
        employeeSalaries[_employeeAddress] = _salary;
        return true;
    }

    function getEmployeeSalary(address _employeeAddress) public view returns (uint256) {
        return employeeSalaries[_employeeAddress];
    }

    function getEmployeeWalletBalance(address _employeeAddress) public view returns (uint256) {
        return employeeWalletBalances[_employeeAddress];
    }

    function getEmployees() public view returns (address[] memory) {
        return employees;
    }
    function getEmployeeName(address _employeeAddress) public view returns (string memory) {
        return employeeNames[_employeeAddress];
    }

    function getAdmin() public view returns (address) {
        return admin;
    }

    function selectEmployeeAward(address _employeeAddress) public  onlyAdmin {
      employeeAward = _employeeAddress;        
    }

    function addMonthlySalaries() public onlyAdmin {
        for (uint256 i = 0; i < employees.length; i++) {
            address employee = employees[i];
            uint256 salary = employeeSalaries[employee];
            employeeWalletBalances[employee] += salary;
        }

        //deduct Salaries from loan
    }

      function withdrawSalary(uint256 _amount) public {
        address employee = msg.sender;
        uint256 balance = employeeWalletBalances[employee];
        require(balance > 0, 'No salary to withdraw');
        require(balance >= _amount, 'Amount exceeds balance');

        IERC20 usdc = IERC20(0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1);
        require(usdc.transfer(employee, _amount), 'Transfer failed');
        uint256 newBal = employeeWalletBalances[employee] - _amount; 
        employeeWalletBalances[employee] = newBal;
        
    }
   function requestLoan(uint256 _amount, string memory _reason) public {
    require(loans[msg.sender].length == 0 || loans[msg.sender][loans[msg.sender].length - 1].status != LoanStatus.Pending, "You already have an active loan");    loans[msg.sender].push(Loan(_amount, _reason, LoanStatus.Pending));
}
    function approveLoan(address _employeeAddress) public onlyAdmin {
        require(loans[_employeeAddress].length > 0, "No pending loans for this employee");
    require(loans[_employeeAddress][loans[_employeeAddress].length - 1].status == LoanStatus.Pending, "No pending loans for this employee");
    
    loans[_employeeAddress][loans[_employeeAddress].length - 1].status = LoanStatus.Approved;

        uint256 loanAmount = loans[_employeeAddress][loans[_employeeAddress].length - 1].loanAmount;
    address requester = _employeeAddress;
        address stablecoinAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1; //CUSD
        IERC20 stablecoin = IERC20(stablecoinAddress);
        require(stablecoin.transfer(requester, loanAmount), 'Transfer of funds failed');
    }
   function rejectLoan(address _employeeAddress) public onlyAdmin {
    require(loans[_employeeAddress].length > 0, "No pending loans for this employee");
    require(loans[_employeeAddress][loans[_employeeAddress].length - 1].status == LoanStatus.Pending, "No pending loans for this employee");

    loans[_employeeAddress][loans[_employeeAddress].length - 1].status = LoanStatus.Rejected;
}

function getAllLoanRequests() public view onlyAdmin returns (address[] memory, uint256[] memory, string[] memory, LoanStatus[] memory) {
    uint256 totalLoans = 0;

    // Count total loans
    for (uint256 i = 0; i < employees.length; i++) {
        totalLoans += loans[employees[i]].length;
    }

    address[] memory requesterAddresses = new address[](totalLoans);
    uint256[] memory loanAmounts = new uint256[](totalLoans);
    string[] memory reasons = new string[](totalLoans);
    LoanStatus[] memory statuses = new LoanStatus[](totalLoans);

    uint256 index = 0;
    for (uint256 i = 0; i < employees.length; i++) {
        address employee = employees[i];
        Loan[] storage employeeLoans = loans[employee];
        
        for (uint256 j = 0; j < employeeLoans.length; j++) {
            requesterAddresses[index] = employee;
            loanAmounts[index] = employeeLoans[j].loanAmount;
            reasons[index] = employeeLoans[j].reason;
            statuses[index] = employeeLoans[j].status;
            index++;
        }
    }

    return (requesterAddresses, loanAmounts, reasons, statuses);
}
    receive() external payable {
        // Handle the received Ether 
    }
}