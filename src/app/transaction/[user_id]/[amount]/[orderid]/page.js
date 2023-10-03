"use client";
import SwapBoxBuy from "@/Components/SwapBoxBuy";
import SwapBoxSend from "@/Components/SwapBoxSend";
export default function Transaction({ params }) {
	const { user_id, amount, orderid } = params;
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center h-screen bg-gray-200">
			<SwapBoxBuy user_id={user_id} amount={amount} orderid={orderid} />
			<SwapBoxSend user_id={user_id} amount={amount} orderid={orderid} />
		</div>
	);
}
