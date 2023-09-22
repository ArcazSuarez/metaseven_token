"use client";
import React, { useState, useContext, useEffect } from "react";
import { UM7Context } from "@/context/um7Context";
import axios from "axios";
const SwapBoxSend = ({ user_id }) => {
	const [address, setAddress] = useState("");
	const [value, setValue] = useState("");
	const [trxHash, setTrxHash] = useState("");
	const { sendTokens } = useContext(UM7Context);
	const url = "https://webhook.site/fd52eaa3-78a2-41e2-93dc-96904e62a179";
	const send = async () => {
		try {
			const trxHash = await sendTokens(value, address);
			let config = {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			};
			const postData = {
				user_id: user_id,
				transaction_hash: trxHash.hash,
				api_token_id: "",
				amount: value,
			};
			axios
				.post(url, postData, config)
				.then((res) => {})
				.catch((err) => {
					console.log(err);
				});
			setTrxHash(trxHash.hash);
		} catch (error) {
			console.log("Something went wrong while sending tokens", error);
		}
	};

	return (
		<div className="bg-white rounded-lg p-4 shadow-md w-72">
			<div className="text-lg flex items-center  font-bold mb-4 truncate text-gray-600">
				Send
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="text-gray-600">Address:</div>
						<input
							placeholder="0x"
							className="w-full px-2 py-1 text-gray-600 rounded border border-gray-300 focus:border-blue-500"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="text-gray-600">UM7:</div>
						<input
							type="number"
							placeholder="0.0"
							className="w-full px-2 py-1 text-gray-600 rounded border border-gray-300 focus:border-blue-500"
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<button
				className="w-full mt-4 py-2 bg-green-500 text-white rounded"
				onClick={() => send()}
			>
				Send
			</button>

			{trxHash != "" && (
				<div className="w-full mt-4 py-2  bg-green-500 text-black truncate rounded text-xs">
					trx hash: {trxHash}
				</div>
			)}
		</div>
	);
};

export default SwapBoxSend;
