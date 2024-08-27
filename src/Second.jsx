import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosClose, IoIosArrowBack } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import Keypad from "./keypad.jsx";

function SelectProvider() {
	const { state } = useLocation();
	const navigate = useNavigate();
	const [amount, setAmount] = useState("");
	const [isPackageModalOpen, setPackageModalOpen] = useState(false);
	const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
	const [pin, setPin] = useState(["", "", "", ""]);
	const [isPinFilled, setIsPinFilled] = useState(false);
	const [activePinIndex, setActivePinIndex] = useState(0);
	const pinRefs = useRef([]);
	const [showKeypad, setShowKeypad] = useState(false);
	const [keypadForPin, setKeypadForPin] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const amountInputRef = useRef(null);
	const keypadRef = useRef(null);

	useEffect(() => {
		const filled = pin.every((digit) => digit !== "");
		if (filled) {
			setIsPinFilled(true);
			setTimeout(() => {
				setPackageModalOpen(false);
				setSuccessModalOpen(true);
				setShowKeypad(false)
			}, 1500); // Delay to show the success modal after closing the package modal
		}
	}, [pin]);

	const formatNumber = (value) => {
		const cleanedValue = value.replace(/[^0-9.]/g, "");
		const [integerPart, decimalPart] = cleanedValue.split(".");
		const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return decimalPart
			? `${formattedInteger}.${decimalPart}`
			: formattedInteger;
	};

	const handleAmountChange = (event) => {
		const value = event.target.value;
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

	const closeSuccessModal = () => {
		setSuccessModalOpen(false);
		
	};

	const handleKeypadPress = (key) => {
		if (key === "close") {
			setShowKeypad(false);
			setKeypadForPin(false);
		} else if (key === "delete") {
			if (keypadForPin) {
				if (activePinIndex > 0) {
					const newPin = [...pin];
					newPin[activePinIndex - 1] = "";
					setPin(newPin);
					setActivePinIndex(activePinIndex - 1);
				}
			} else {
				const newValue = amount.slice(0, -1);
				setAmount(formatNumber(newValue));
			}
		} else {
			if (keypadForPin) {
				if (activePinIndex < 4) {
					const newPin = [...pin];
					newPin[activePinIndex] = key;
					setPin(newPin);
					setActivePinIndex(activePinIndex + 1);
				}
			} else {
				const inputValue = amountInputRef.current.value.replace(/[^0-9.]/g, "");
				const newValue = inputValue + key;
				const formattedValue = formatNumber(newValue);
				setAmount(formattedValue);
			}
		}
	};

	const renderPinInputs = () => (
		<div className={`flex justify-center space-x-5 mb-20 ${keypadForPin ? "" : ""}`}>
			{pin.map((digit, index) => (
				<input
					key={index}
					ref={(el) => (pinRefs.current[index] = el)}
					type="text"
					maxLength="1"
					value={isPinFilled ? "*" : digit}
					readOnly
					className="w-12 h-12 text-center border border-gray-300 rounded-md text-xl font-bold focus:outline-none"
					onFocus={() => {
						setKeypadForPin(true);
						setShowKeypad(true);
						setIsExpanded(true)
					}}
				/>
			))}
		</div>
	);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				keypadRef.current &&
				!keypadRef.current.contains(event.target) &&
				!amountInputRef.current.contains(event.target) &&
				!pinRefs.current.some((ref) => ref && ref.contains(event.target))
			) {
				setShowKeypad(false);
				setKeypadForPin(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<>
			<div className="bg-white p-8 rounded-lg relative">
				<button
					onClick={() => navigate("/buy-electricity")}
					className="absolute top-4 left-4 text-gray-500 hover:text-gray-800"
				>
					<IoIosArrowBack className="text-4xl inline-block font-semibold text-gray-500" />
				</button>

				<h1 className="text-xl font-semibold mb-4 flex justify-center items-center">
					Select Provider
				</h1>
				<hr className="border border-gray-200 mb-6 -mx-10" />
				<p className="text-gray-600 mb-6 flex justify-center items-center font-sans font-bold text-sm">
					Amount available: N 234,000.00
				</p>

				<div className="bg-amber-700 p-5 rounded-2xl mb-8">
					<label
						htmlFor="amount"
						className="block text-gray-900 text-sm font-bold mb-2"
					>
						Enter amount:
					</label>
					<div className="flex items-center">
						<span className="font-bold text-xl text-gray-900">N</span>
						<input
							type="text"
							id="amount"
							ref={amountInputRef}
							className="w-full px-1 text-gray-900 font-bold text-xl font-sans bg-transparent outline-none focus:outline-none placeholder:text-gray-900"
							value={amount}
							onFocus={() => {
								setShowKeypad(true);
								setKeypadForPin(false);
								setIsExpanded(false)
							}}
							onChange={handleAmountChange}
							placeholder="0.00"
						/>
					</div>
				</div>

				<div className="bg-gray-50 px-5 py-5 rounded-xl mb-6 -mt-4 shadow-sm">
					<div className="grid grid-cols-2">
						<p className="text-gray-700 text-md font-bold mb-2">
							You're buying for:
						</p>
						<p className="text-gray-700 text-md font-bold mb-2 text-right">
							Provider
						</p>
					</div>
					<div className="grid grid-cols-2">
						<p className="text-gray-600 text-md font-bold">
							{state.meterNumber || "N/A"}
						</p>
						<p className="text-gray-600 text-md text-right font-bold">
							{state.provider || "N/A"}-{state.selectedPackage || "N/A"}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-4 gap-4 mb-8">
					<button
						className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-2 rounded-3xl text-sm"
						onClick={() => setAmount("500")}
					>
						N 500
					</button>
					<button
						className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-2 rounded-3xl text-sm"
						onClick={() => setAmount("1,000")}
					>
						N 1,000
					</button>
					<button
						className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-2 rounded-3xl text-sm"
						onClick={() => setAmount("2,000")}
					>
						N 2,000
					</button>
					<button
						className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-2 rounded-3xl text-sm"
						onClick={() => setAmount("3,000")}
					>
						N 3,000
					</button>
					<button
						className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-2 rounded-3xl text-sm"
						onClick={() => setAmount("5,000")}
					>
						N 5,000
					</button>
					<button
						className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-2 rounded-3xl text-sm"
						onClick={() => setAmount("10,000")}
					>
						N 10,000
					</button>
					<button
						className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-2 rounded-3xl text-sm"
						onClick={() => setAmount("15,000")}
					>
						N 15,000
					</button>
					<button
						className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-2 rounded-3xl text-sm"
						onClick={() => setAmount("20,000")}
					>
						N 20,000
					</button>
				</div>
			</div>

			<div className="p-8">
				<button
					className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-8 rounded-lg text-sm w-full mt-60"
					onClick={handleContinue}
				>
					Continue
				</button>
			</div>

			{isPackageModalOpen && (
				<div className={`input fixed inset-0 bg-gray-600 bg-opacity-40 flex items-end z-50 ${isExpanded ? "h-screen -mt-64" : ""}`}>
					<div className="bg-white w-full p-8 rounded-t-3xl relative">
						<button
							onClick={closePackageModal}
							className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
						>
							<IoIosClose className="text-4xl inline-block font-semibold text-gray-500" />
						</button>

						<h2 className="text-xl font-bold mb-4 text-gray-800 font-sans">
							Confirm Transaction
						</h2>

						<div className="border border-gray-400 rounded-full w-16 h-16 mb-4 flex items-center justify-center relative">
							<img
								src="https://www.ikejaelectric.com/wp-content/uploads/2020/05/Ikeja-Electric-Logo-new-1.png"
								alt="package"
								className="w-full h-full object-cover rounded-full"
							/>
							<div className="absolute flex flex-col">
								<span className="text-gray-800 text-md font-sans font-semibold text-center ml-40">
									Buying for:
								</span>
								<span className="font-bold text-md font-sans ml-44">
									{state.meterNumber || "N/A"}
								</span>
							</div>
						</div>

						<h3 className=" font-bold text-md mb-6 text-gray-500 ml-2">
							Transaction Details
						</h3>

						<div className="bg-gray-50 px-5 py-3 rounded-xl mb-6 -mt-4 shadow-sm">
							<div className="grid grid-cols-2">
								<p className="text-gray-700 text-md font-bold mb-2">Amount</p>
								<p className="text-gray-700 text-md font-bold mb-2 text-right">
									{amount}
								</p>
							</div>
							<div className="grid grid-cols-2">
								<p className="text-gray-600 text-md font-bold">Fee</p>
								<p className="text-gray-600 text-md text-right font-bold">
									N 0.00
								</p>
							</div>
						</div>

						<div className="flex justify-center items-center">
							<FaLock className="text-amber-800 inline" />
							<span className="inline ml-2 text-md font-bold font-sans text-gray-600">
								Transaction PIN
							</span>
						</div>

						<p className="mt-5 -mb-6">{renderPinInputs()}</p>
					</div>
				</div>
			)}
            
			{isSuccessModalOpen && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-40 flex items-end z-50 ">
					<div className="bg-white w-full p-8 rounded-t-3xl shadow-lg relative h-3/6">
						<button
							onClick={closeSuccessModal}
							className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
						>
							<IoIosClose className="text-4xl inline-block font-semibold text-gray-500" />
						</button>

						<h1 className="text-2xl font-bold mb-4 text-gray-800 font-sans text-center mt-32">
							Electricity Purchase Successful !
						</h1>
						<h4 className="flex text-center justify-center text-md font-bold">
							Your {""}
							{state.provider || "N/A"} {""}
							{state.selectedPackage || "N/A"} payment of{" "}
							{amount ? `N ${amount}` : "N 0.00"} {""}for{" "}
							{state.meterNumber || "N/A"} was successful
						</h4>
						<br />
						<h4 className="flex text-center justify-center text-md font-bold">
							Your Token {""} is 24357783848376483 {""}
							{state.token} for 18 units
						</h4>
						<button className="border border-slate-600 px-7 py-3 text-center font-bold text-xl bg-transparent rounded-lg mt-20">
							View Receipt
						</button>
						<button className="border border-slate-600 px-16 py-3 text-center font-bold text-xl bg-amber-800 text-white rounded-lg ml-4">
							okay
						</button>
					</div>
				</div>
			)}

			{showKeypad && (
				<div
					ref={keypadRef}
					className={`fixed bottom-0 left-0 w-full bg-white p-4 grid grid-cols-3 gap-4 z-50 `}
				>
					<Keypad onKeyPress={handleKeypadPress} />
				</div>
			)}
		</>
	);
}

export default SelectProvider;
