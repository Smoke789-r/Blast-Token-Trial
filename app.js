const BOGE_TOKEN_ADDRESS = '0x72a06F32B46DCc9B8B64Bed1f299E3c92A83309b';
const CLAIM_CONTRACT_ADDRESS = '0x380Cc13f7Bbe692A4F95DEA59091b810e7C37B64';
let userAccount;

const BOGE_TOKEN_ABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

async function connectWallet() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) {
                userAccount = accounts[0];
                document.getElementById('walletAddress').innerText = `Connected: ${userAccount}`;
                document.getElementById('connectWalletButton').style.display = 'none';
                document.getElementById('disconnectWalletButton').style.display = 'block';
                console.log("Wallet connected:", userAccount);
            } else {
                console.error('No accounts found');
                alert('No accounts found. Please connect to Rabby Wallet.');
            }
        } catch (error) {
            console.error('User denied account access', error);
            alert('User denied account access');
        }
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask or Rabby Wallet!');
        alert('Non-Ethereum browser detected. You should consider trying MetaMask or Rabby Wallet!');
    }
}

function disconnectWallet() {
    userAccount = null;
    document.getElementById('walletAddress').innerText = '';
    document.getElementById('connectWalletButton').style.display = 'block';
    document.getElementById('disconnectWalletButton').style.display = 'none';
    console.log("Wallet disconnected");
}

async function approveBOGEToken() {
    console.log("Approve BOGE Token function called");
    if (!userAccount) {
        alert('No accounts found. Please connect Rabby Wallet.');
        console.log("No accounts found. Please connect Rabby Wallet.");
        return;
    }

    const amount = document.getElementById('amount').value;
    if (!amount) {
        alert('Please enter an amount');
        return;
    }

    console.log("User account:", userAccount);
    console.log("Amount to approve:", amount);

    const bogeTokenContract = new web3.eth.Contract(BOGE_TOKEN_ABI, BOGE_TOKEN_ADDRESS);

    try {
        const amountInWei = web3.utils.toWei(amount, 'ether');
        await bogeTokenContract.methods.approve(CLAIM_CONTRACT_ADDRESS, amountInWei).send({ from: userAccount });
        alert('BOGE token approval successful!');
        console.log("BOGE token approval successful!");
    } catch (error) {
        console.error('BOGE token approval failed', error);
        alert('BOGE token approval failed. See console for details.');
    }
}
