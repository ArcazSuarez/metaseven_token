import SwapBoxBuy from "@/Components/SwapBoxBuy";
import SwapBoxSend from "@/Components/SwapBoxSend";
import SwapBoxSell from "@/Components/SwapBoxSell";
export default function Home() {
	return (
		<div className="flex items-center gap-10 justify-center h-screen bg-gray-200">
			<div className="flex flex-col gap-10 sm:flex-row w-8/12 justify-between px-4">
				<SwapBoxBuy />
				<SwapBoxSell />
				<SwapBoxSend />
			</div>
		</div>
	);
}
