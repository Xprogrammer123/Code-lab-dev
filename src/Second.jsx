import React, { useState, useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { FaLock } from "react-icons/fa";

function SelectProvider() {
	const [amount, setAmount] = useState("");
	const [isPackageModalOpen, setPackageModalOpen] = useState(false);
	const [selectedPackage, setSelectedPackage] = useState("");
	const [pin, setPin] = useState(["", "", "", ""]);
	const [isPinFilled, setIsPinFilled] = useState(false);

	const pinRefs = useRef([]);

	useEffect(() => {
		const filled = pin.every((digit) => digit !== "");
		if (filled) {
			setIsPinFilled(true);
			// Set a timeout to hide the PIN and show congratulations
			setTimeout(() => {
				setPackageModalOpen(false); // Close modal after showing the message
				alert("Congratulations!"); // Replace this with your congratulations logic
			}, 1500);
		}
	}, [pin]);

	const formatNumber = (value) => {
		// Remove any non-numeric characters except decimal point
		const cleanedValue = value.replace(/[^0-9.]/g, "");

		// Split the number into integer and decimal parts
		const [integerPart, decimalPart] = cleanedValue.split(".");

		// Format the integer part with commas
		const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		// Combine formatted integer part with decimal part if it exists
		return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
	};

	const handleAmountChange = (event) => {
		const value = event.target.value;
		// Format the value and update the state
		const formattedValue = formatNumber(value);
		setAmount(formattedValue);
	};

	const handleContinue = () => {
		if (amount) {
			setPackageModalOpen(true);
		} else {
			alert("Please enter an amount.");
		}
	};

	const closePackageModal = () => {
		setPackageModalOpen(false);
	};

	const handlePinChange = (e, index) => {
		const newPin = [...pin];
		newPin[index] = e.target.value.slice(0, 1); // Only allow one digit per input
		setPin(newPin);

		// Move focus to next input if the current one is filled
		if (e.target.value) {
			if (index < pin.length - 1) {
				pinRefs.current[index + 1].focus();
			}
		}
	};

	const renderPinInputs = () => (
		<div className="flex justify-center space-x-5 mb-20">
			{pin.map((digit, index) => (
				<input
					key={index}
					ref={(el) => (pinRefs.current[index] = el)}
					type="text"
					maxLength="1"
					value={isPinFilled ? "*" : digit}
					onChange={(e) => handlePinChange(e, index)}
					className="w-12 h-12 text-center border border-gray-300 rounded-md text-xl font-bold focus:outline-none"
				/>
			))}
		</div>
	);

	return (
		<>
			<div className="bg-white p-8 rounded-lg">
				<h1 className="text-xl font-semibold mb-4 flex justify-center items-center">
					Enter Amount
				</h1>
				<hr className="border border-gray-200 mb-6 -mx-10" />
				<p className="text-gray-600 mb-6 flex justify-center items-center font-sans font-bold text-sm">
					Amount available: N 234,000.00
				</p>

				<div className="bg-amber-500 p-5 rounded-2xl mb-8">
					<label htmlFor="amount" className="block text-gray-900 text-sm font-bold mb-2">
						Enter amount:
					</label>
					<div className="flex items-center">
						<span className="font-bold text-xl text-gray-900">N</span>
						<input
							type="text" // Use text type for formatting
							id="amount"
							className="w-full px-1 text-gray-900 font-bold text-xl font-sans bg-transparent outline-none focus:outline-none placeholder:text-gray-900"
							value={amount}
							onChange={handleAmountChange}
							placeholder="0.00"
						/>
					</div>
				</div>

				<div className="bg-gray-50 px-5 py-5 rounded-xl mb-6 -mt-4 shadow-sm">
					<div className="grid grid-cols-2">
						<p className="text-gray-700 text-md font-bold mb-2">You're buying for:</p>
						<p className="text-gray-700 text-md font-bold mb-2 text-right">Provider</p>
					</div>
					<div className="grid grid-cols-2">
						<p className="text-gray-600 text-md font-bold">908765467643</p>
						<p className="text-gray-600 text-md text-right font-bold">IBEDC - PREPAID</p>
					</div>
				</div>

				<div className="grid grid-cols-4 gap-4">
					<button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-2 rounded-3xl text-sm" onClick={() => setAmount("500")}>
						N 500
					</button>
					<button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-2 rounded-3xl text-sm" onClick={() => setAmount("1,000")}>
						N 1,000
					</button>
					<button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-2 rounded-3xl text-sm" onClick={() => setAmount("2,000")}>
						N 2,000
					</button>
					<button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-2 rounded-3xl text-sm" onClick={() => setAmount("3,000")}>
						N 3,000
					</button>
					<button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-2 rounded-3xl text-sm" onClick={() => setAmount("5,000")}>
						N 5,000
					</button>
					<button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-2 rounded-3xl text-sm" onClick={() => setAmount("10,000")}>
						N 10,000
					</button>
					<button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-2 rounded-3xl text-sm" onClick={() => setAmount("15,000")}>
						N 15,000
					</button>
					<button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-2 rounded-3xl text-sm" onClick={() => setAmount("20,000")}>
						N 20,000
					</button>
				</div>
			</div>

			<div className="p-8">
				<button className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 px-2 rounded-lg text-sm mt-80 w-full" onClick={handleContinue}>
					Continue
				</button>
			</div>

			{isPackageModalOpen && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-40 flex items-end z-50">
					<div className="bg-white w-full p-8 rounded-t-3xl shadow-lg relative">
						<button onClick={closePackageModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
							<IoIosClose className="text-4xl inline-block font-semibold text-gray-500" />
						</button>

						<h2 className="text-xl font-bold mb-4 text-gray-800 font-sans">Confirm Transaction</h2>

						<div className="border border-gray-400 rounded-full w-16 h-16 mb-4 flex items-center justify-center relative">
							<img src="https://www.ikejaelectric.com/wp-content/uploads/2020/05/Ikeja-Electric-Logo-new-1.png" alt="package" className="w-full h-full object-cover rounded-full" />
							<div className="absolute flex flex-col">
								<span className="text-gray-800 text-md font-sans font-semibold text-center ml-40">
									Buying for:
								</span>
								<span className="font-bold text-md font-sans ml-44">9086753486</span>
							</div>
						</div>

						<h3 className="font-bold text-md mb-8 text-gray-500 ml-2">Transaction Details</h3>

						<div className="bg-gray-50 px-5 py-5 rounded-xl mb-8 -mt-4 shadow-sm">
							<div className="grid grid-cols-2">
								<p className="text-gray-700 text-md font-bold mb-2">Amount</p>
								<p className="text-gray-700 text-md font-bold mb-2 text-right">{amount ? `N ${amount}` : "N 0.00"}</p>
							</div>
							<div className="grid grid-cols-2">
								<p className="text-gray-600 text-md font-bold">Fee</p>
								<p className="text-gray-600 text-md text-right font-bold">N 0.00</p>
							</div>
						</div>

						<div className="flex justify-center items-center mb-4">
							<FaLock className="text-amber-800 inline" />
							<span className="inline ml-2 text-sm font-bold font-sans text-gray-600">Transaction PIN</span>
						</div>

						{/* Render PIN input fields */}
						{renderPinInputs()}
					</div>
				</div>
			)}
		</>
	);
}

export default SelectProvider;
