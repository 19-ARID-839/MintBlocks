import React from 'react';
import './Wallet.css';
import OtherPagesHero from '../MyComponents/OtherPagesHero.js';
import MetamaskImg from '../Images/metamask-icon.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { ethers } from 'ethers';


const Wallet = () => {

    useEffect(() => {
        
      
            if (walletAddress !== "") {
                window.location.href = "/user-dashboard/profile"
               
                // localStorage.setItem("wAddressLocal", walletAddress)
                localStorage.setItem("wAddressLocal", JSON.stringify(walletAddress))
                console.log(localStorage.getItem('wAddressLocal'));

                // navigate.push({
                //   pathname: '/profile',
                //   state: { walletAddress: walletAddress }
                // });
              }
        

    });
    const [walletAddress, setWalletAddress] = useState("");
    // const disconnectWallet = async event => {
    //     // setWalletAddress("")
    //     console.log("disconnected")

    // }
    const requestWallet = async event => {
        console.log('Link clicked');
        // 👇️ refers to the link element
        console.log(event.currentTarget);

        // ❌ Check if Meta Mask Extension exists 
        if (window.ethereum) {
            console.log(window.ethereum)
            console.log('Meta Mask Extension detected');
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts"
                });
                setWalletAddress(accounts[0]);
                
                console.log(accounts[0])
                // walletAddress = accounts[0];
                // if (walletAddress === accounts[0]){
                //     window.location.href = "/profile"
                // }
                // alert(accounts[0]);


            } catch (error) {
                console.log("error econnecting...")
            }




        }

        else {
            alert("metamask not connected")
        }

    };

    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            await requestWallet();

            const provider = new ethers.providers.Web3Provider(window.ethereum);
        }
    }

    return (

        <div className="wallet-page">
            
            <div className="about-section">
                <OtherPagesHero title="Connect Your Wallet" para1="Here you can connect your crypto wallet to create or login your account" />

            </div>
            <div className="container mt-5">
                <div className="wallets-list">
                    <Link onClick={requestWallet} >
                        <div className="wallets-list-no1">
                            <img className="wallets-list-p wallets-list-p1" src={MetamaskImg} alt="metamask icon" />
                            <div className="wallets-list-p wallets-list-p2">
                                <h3>Connect Your MetaMask Wallet</h3>
                                <p>A safe crypto wallet for digital tokens & NFTs.</p>
                                
                                
                            </div>

                        </div>
                    </Link>
                    {/* <Link onClick={disconnectWallet} >
                        <div className="wallets-list-no1">
                            <img className="wallets-list-p wallets-list-p1" src={MetamaskImg} alt="metamask icon" />
                            <div className="wallets-list-p wallets-list-p2">
                                <h3>Disconnect Your MetaMask Wallet</h3>
                                <p>A safe crypto wallet for digital tokens & NFTs.</p>
                            </div>

                        </div>
                    </Link> */}
                </div>

            </div>
        </div>
    )
}

export default Wallet
