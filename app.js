let userAccount;

async function connectWallet() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Always prompt user to select an account
            const accounts = await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
            if (accounts.length > 0) {
                userAccount = accounts[0].caveats[0].value[0]; // Extract the first account from the permissions result
                document.getElementById('walletAddress').innerText = `Connected: ${userAccount}`;
                document.getElementById('connectWalletButton').style.display = 'none';
                document.getElementById('disconnectWalletButton').style.display = 'block';
                console.log("Wallet connected:", userAccount);
            }
        } catch (error) {
            console.error('User denied account access', error);
        }
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
