import SwapBoxBuy from "@/Components/SwapBoxBuy";
import SwapBoxSend from "@/Components/SwapBoxSend";
import SwapBoxSell from "@/Components/SwapBoxSell";
export default function Home() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-200">
			<div className="flex flex-col w-10/12 sm:w-8/12 p-4">
				<div className="mb-10 sm:flex sm:flex-row sm:gap-10">
					<SwapBoxBuy />
					<SwapBoxSell />
					<SwapBoxSend />
				</div>
			</div>
		</div>
	);
}
