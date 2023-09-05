"use client";
import React, { useState, useContext } from "react";
import { UM7Context } from "../../context/um7Context";
const SwapBoxBuy = () => {
	const [fromValue, setFromValue] = useState("");
	const { swapTokens } = useContext(UM7Context);

	return (
		<div className="bg-white rounded-lg p-4 shadow-md w-72">
			<div className="text-lg flex items-center font-bold mb-4 text-gray-600">
				Buy
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="text-gray-600">USDT</div>
						<input
							type="number"
							placeholder="0.0"
							className="w-full px-2 py-1 rounded text-gray-600 border border-green-300 focus:border-blue-500"
							value={fromValue}
							onChange={(e) => setFromValue(e.target.value)}
						/>
					</div>
					{/* <div className="text-gray-600">USDT</div> */}
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="text-gray-600">UM7</div>
						<input
							type="number"
							placeholder="0.0"
							className="w-full px-2 py-1 text-gray-600 rounded border border-green-300 focus:border-blue-500"
							value={fromValue}
							onChange={(e) => setFromValue(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<button
				className="w-full mt-4 py-2 bg-green-500 text-white rounded"
				onClick={() => swapTokens(fromValue)}
			>
				Swap
			</button>
		</div>
	);
};

export default SwapBoxBuy;
