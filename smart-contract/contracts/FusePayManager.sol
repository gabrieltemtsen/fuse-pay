//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.24;
 import "./FusePay.sol";

contract FusePayManager {
    uint256 public companyIdCounter;
    FusePay[] public companies;
    mapping(address => uint256) public companyIDs;
    mapping(address => address[]) private employeeToCompanies;
    mapping(address => address[]) private adminToCompanies;


    function createCompany (string memory companyCID) public  returns (bool) {
        uint256 companyID = companyIdCounter;
        companyIdCounter++;
        FusePay company = new FusePay(companyCID, msg.sender,companyID);
        companies.push(company);
        companyIDs[address(company)] = companyID;
        adminToCompanies[msg.sender].push(address(company));
        return true;
    }
   
    function addEmployee(address _employeeAddress, address _companyAddress, uint256 _salary, string memory _name)public returns (bool){
    uint256 companyId = companyIDs[_companyAddress];

    address companyAdmin = companies[companyId].getAdmin();
    
    require (msg.sender == companyAdmin , 'No Access') ;
    companies[companyId].addEmployee(_employeeAddress);
    companies[companyId].setEmployeeName(_employeeAddress, _name);
     companies[companyId].setEmployeeSalary(_employeeAddress, _salary);
    employeeToCompanies[_employeeAddress].push(_companyAddress);

    return true; 
  }
  function getCompanies() external view returns(address[] memory _companies) {
    _companies = new address[](companyIdCounter);
    for (uint256 i = 0; i < companyIdCounter; i++) {
      _companies[i] = address(companies[i]);
    }
    return _companies;

  }
function getEmployeeCompanies(address _employeeAddress) external view returns (address[] memory) {

    return employeeToCompanies[_employeeAddress];
}
function getAdminCompanies(address _admin) external view returns (address[] memory) {

    return adminToCompanies[_admin];
}

// function requestLoan(address _companyAddress, uint256 _amount, string memory reason) public {
//         uint256 companyId = companyIDs[_companyAddress];
//         companies[companyId].requestLoan(_amount, reason);
//     }

//     function approveLoan(address _companyAddress, address _employeeAddress) public returns (bool) {
//         uint256 companyId = companyIDs[_companyAddress];
//         require(msg.sender == companies[companyId].getAdmin(), 'No Access');
//         companies[companyId].approveLoan(_employeeAddress);
//         return true;
//     }

//     function rejectLoan(address _companyAddress, address _employeeAddress) public returns (bool) {
//         uint256 companyId = companyIDs[_companyAddress];
//         require(msg.sender == companies[companyId].getAdmin(), 'No Access');
//         companies[companyId].rejectLoan(_employeeAddress);
//         return true;
//     }

    // function getLoanRequests(address _companyAddress) public view returns (address[] memory, uint256[] memory, FusePay.LoanStatus[] memory) {
    //     uint256 companyId = companyIDs[_companyAddress];
    //     return companies[companyId].getLoanRequests();
    // }

}