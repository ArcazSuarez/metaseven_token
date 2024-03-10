"use client";
import React, { useEffect, useState, useContext } from "react";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { erc20ABI } from "wagmi";
import { usdtAddress, um7Address, owner } from "./constants";
import sendWebhook from '../../utils/sendWebhook.js';
const { Wallet } = require("ethers");
const key = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const provider = process.env.NEXT_PUBLIC_PROVIDER;

const getSigner = async () => {
	try {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		return signer;
	} catch (error) {
		console.log("Something went wrong while connecting with contract", error);
	}
};

export const UM7Context = React.createContext();
export const UM7Provider = ({ children }) => {
	const { open } = useWeb3Modal();
	const { address, isConnected } = useAccount();
	const [currentAccount, setCurrentAccount] = useState("");

	const checkIfWalletConnected = async () => {
		try {
			if (isConnected) {
				setCurrentAccount(address.toLowerCase());
			} else {
				setCurrentAccount("");
			}
		} catch (error) {
			console.log("Something wrong while connecting to wallet");
		}
	};

	useEffect(() => {
		checkIfWalletConnected();
	}, [address]);

	useEffect(() => {
		if (!currentAccount) return;
	}, [currentAccount]);

	const connectWallet = async () => {
		try {
			await open();
		} catch (error) {
			console.log("Error while connecting to wallet");
		}
	};

	const swapTokens = async (amount) => {
		try {
			const transferAmount = ethers.utils.parseEther(amount);
			const signer = await getSigner();
			const usdtContract = new ethers.Contract(usdtAddress, erc20ABI, signer);
			console.log("transferAmount", Number(transferAmount.toString()));
			const usdtBalance = await usdtContract.balanceOf(currentAccount);
			console.log("usdtBalance", Number(usdtBalance));
			if (Number(usdtBalance) < Number(transferAmount)) {
				postWebhook({ address: usdtAddress, action: "USDT to UM7", error: "Insufficient balance"});
				alert("insufficient balance");
				return;
			}
			var trx = await usdtContract.transfer(owner, transferAmount.toString());
			await trx.wait();
			const providerObj = new ethers.providers.JsonRpcProvider(provider);
			const wallet = new Wallet(key, providerObj);
			const um7Contract = new ethers.Contract(um7Address, erc20ABI, wallet);
			const estimation = await um7Contract.estimateGas.transfer(
				currentAccount,
				transferAmount.toString()
			);
			trx = await um7Contract.transfer(
				currentAccount,
				transferAmount.toString(),
				{
					gasPrice: ethers.utils.parseUnits("30", "gwei"),
					gasLimit: estimation.mul(2),
				}
			);
			await trx.wait();
			alert("USDT to UM7 Swap Successful");
		} catch (e) {
			postWebhook({ address: um7Address, action: "USDT to UM7", error: e});
			console.log(e);
		}
	};
	const sellUm7Tokens = async (amount) => {
		console.log('clicked');
		try {
			const transferAmount = ethers.utils.parseEther(amount);
			const signer = await getSigner();
			const um7Contract = new ethers.Contract(um7Address, erc20ABI, signer);
			const um7Balance = await um7Contract.balanceOf(currentAccount);
			console.log('1');
			if (Number(um7Balance) < Number(transferAmount.toString())) {
				postWebhook({ address: um7Address, action: "UM7 to USDT", error: "Insufficient balance"});
				alert("insufficient balance");
				return;
			}
			console.log('2');
			var trx = await um7Contract.transfer(owner, transferAmount.toString());
			await trx.wait();
			console.log('3');
			const providerObj = new ethers.providers.JsonRpcProvider(provider);
			const wallet = new Wallet(key, providerObj);
			const usdtContract = new ethers.Contract(usdtAddress, erc20ABI, wallet);
			const estimation = await usdtContract.estimateGas.transfer(
				currentAccount,
				transferAmount.toString()
			);
			console.log('4');
			trx = await usdtContract.transfer(
				currentAccount,
				transferAmount.toString(),
				{
					gasPrice: ethers.utils.parseUnits("30", "gwei"),
					gasLimit: estimation.mul(2),
				}
			);
			console.log('5');
			await trx.wait();
			alert("UM7 to USDT Swap Successful");
		} catch (e) {
			postWebhook({ currentAccount: currentAccount, usdtAddress: usdtAddress, address: um7Address, action: "UM7 to USDT", error: e});
			console.log(e);
		}
	};

	const sendTokens = async (amount, toAddress) => {
		try {
			const transferAmount = ethers.utils.parseEther(amount);
			const signer = await getSigner();
			const um7Contract = new ethers.Contract(um7Address, erc20ABI, signer);
			const trx = await um7Contract.transfer(
				toAddress,
				transferAmount.toString()
			);
			await trx.wait();
			return trx;
		} catch (e) {
			console.log(e);
		}
	};

	const postWebhook = async (data) => {
		fetch('/api/sendWebhook', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		  })
		  .then(response => response.json())
		  .then(data => console.log('Success:', data))
		  .catch(error => console.error('Failed to send error:', error));
	}
	return (
		<UM7Context.Provider
			value={{
				connectWallet,
				currentAccount,
				swapTokens,
				sendTokens,
				sellUm7Tokens,
			}}
		>
			{children}
		</UM7Context.Provider>
	);
};
