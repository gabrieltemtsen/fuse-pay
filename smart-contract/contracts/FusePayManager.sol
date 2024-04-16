//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
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
   
    function addEmployee(address _employeeAddress, address _companyAddress, uint256 _salary)public returns (bool){
    uint256 companyId = companyIDs[_companyAddress];

    address companyAdmin = companies[companyId].getAdmin();
    
    require (msg.sender == companyAdmin , 'No Access') ;
    companies[companyId].addEmployee(_employeeAddress);
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

}