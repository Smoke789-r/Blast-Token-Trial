const BOGE_TOKEN_ADDRESS = '0x72a06F32B46DCc9B8B64Bed1f299E3c92A83309b';
const CONTRACT_ADDRESS = '0x380Cc13f7Bbe692A4F95DEA59091b810e7C37B64';
let userAccount;

const ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "toggleClaim",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "isClaimEnabled",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "claim",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Claimed",
        "type": "event"
    }
];

async function connectWallet() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            document.getElementById('walletAddress').innerText = `Connected: ${userAccount}`;
            document.getElementById('connectWalletButton').style.display = 'none';
            document.getElementById('disconnectWalletButton').style.display = 'block';
            console.log("Wallet connected:", userAccount);
        } catch (error) {
            console.error('User denied account access');
        }
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        console.log("Legacy dapp browser connected");
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask or Rabby Wallet!');
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
    const amount = document.getElementById('amount').value;
    if (!amount) {
        alert('Please enter an amount');
        return;
    }

    const accounts = await web3.eth.requestAccounts();
    if (accounts.length === 0) {
        alert('No accounts found. Please connect Rabby Wallet.');
        return;
    }

    const account = accounts[0];
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

    const bogeTokenContract = new web3.eth.Contract(BOGE_TOKEN_ABI, BOGE_TOKEN_ADDRESS);

    try {
        // Directly use the input amount without conversion
        await bogeTokenContract.methods.approve(CONTRACT_ADDRESS, amount).send({ from: account });
        alert('BOGE token approval successful!');
    } catch (error) {
        console.error('BOGE token approval failed', error);
        alert('BOGE token approval failed. See console for details.');
    }
}
