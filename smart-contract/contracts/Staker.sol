// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Staker {
    struct StakeInfo {
        uint256 amount;
        uint256 depositTimestamp;
    }

    mapping(address => StakeInfo) public stakes;

    uint256 public constant rewardRatePerSecond = 0.1 ether;
    uint256 public constant withdrawalPeriod = 120 seconds;
    uint256 public constant claimPeriod = 240 seconds;

    event Staked(address indexed sender, uint256 amount);
    event Withdrawn(address indexed sender, uint256 amount);

    function stake() public payable {
        require(msg.value > 0, "Amount must be greater than 0");

        StakeInfo storage userStake = stakes[msg.sender];
        userStake.amount += msg.value;
        if (userStake.depositTimestamp == 0) {
            userStake.depositTimestamp = block.timestamp;
        }

        emit Staked(msg.sender, msg.value);
    }

 function withdraw() public {
    StakeInfo storage userStake = stakes[msg.sender];
    require(userStake.amount > 0, "No stake to withdraw");
    require(block.timestamp >= userStake.depositTimestamp + withdrawalPeriod, "Withdrawal period not reached yet");

    uint256 rewards = calculateRewards(msg.sender);
    uint256 totalAmountToWithdraw = userStake.amount + rewards;

    require(address(this).balance >= totalAmountToWithdraw, "Contract balance insufficient");

    delete stakes[msg.sender];

    payable(msg.sender).transfer(totalAmountToWithdraw);

    emit Withdrawn(msg.sender, totalAmountToWithdraw);
}

    function calculateRewards(address _user) internal view returns (uint256) {
        StakeInfo storage userStake = stakes[_user];
        uint256 stakingDuration = block.timestamp - userStake.depositTimestamp;
        return stakingDuration * rewardRatePerSecond;
    }

    function withdrawalTimeLeft() public view returns (uint256) {
        StakeInfo storage userStake = stakes[msg.sender];
        if (block.timestamp >= userStake.depositTimestamp + withdrawalPeriod) {
            return 0;
        } else {
            return (userStake.depositTimestamp + withdrawalPeriod) - block.timestamp;
        }
    }

    function claimPeriodLeft() public view returns (uint256) {
        StakeInfo storage userStake = stakes[msg.sender];
        if (block.timestamp >= userStake.depositTimestamp + claimPeriod) {
            return 0;
        } else {
            return (userStake.depositTimestamp + claimPeriod) - block.timestamp;
        }
    }

    receive() external payable {}
}
