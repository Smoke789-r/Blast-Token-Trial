const CONTRACT_ADDRESS = '0x380Cc13f7Bbe692A4F95DEA59091b810e7C37B64';
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

window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            console.log("MetaMask connected");
        } catch (error) {
            console.error('User denied account access');
        }
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        console.log("Legacy dapp browser connected");
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

async function claimTokens() {
    const amount = document.getElementById('amount').value;
    if (!amount) {
        alert('Please enter an amount');
        return;
    }

    console.log("Amount to claim:", amount);

    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
        alert('No accounts found. Please connect MetaMask or Rabby.');
        return;
    }

    const account = accounts[0];
    console.log("Using account:", account);

    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    try {
        console.log("Sending transaction...");
        await contract.methods.claim(web3.utils.toWei(amount, 'ether')).send({ from: account });
        alert('Claim successful!');
    } catch (error) {
        console.error('Claim failed', error);
        alert('Claim failed. See console for details.');
    }
}
