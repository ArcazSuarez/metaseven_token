"use client";
import SwapBoxBuy from "@/Components/SwapBoxBuy";
import SwapBoxSend from "@/Components/SwapBoxSend";
import SwapBoxSell from "@/Components/SwapBoxSell";
export default function Transaction({ params }) {
	const { user_id, amount, orderid } = params;
	return (
		<div className="flex items-center justify-center min-h-screen bg-[#16181d]">
			<div className="mx-auto p-4">
				<div className="flex flex-col sm:flex-row sm:justify-center gap-10">
					{/* <div>
						<SwapBoxBuy />
					</div>
					<div>
						<SwapBoxSell />
					</div> */}
					<div>
						<SwapBoxSend user_id={user_id} amount={amount} orderid={orderid} />
					</div>
				</div>
			</div>
		</div>
	);
}
