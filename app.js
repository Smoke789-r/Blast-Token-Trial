let userAccount;

async function connectWallet() {
    if (window.ethereum) {
        try {
            // Reset the provider to ensure the prompt appears
            window.ethereum.autoRefreshOnNetworkChange = false;

            // Always prompt user to select an account
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
