import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import {
	MdKeyboardArrowDown,
	MdKeyboardArrowRight,
	MdDelete,
} from "react-icons/md";

function BuyElectricity() {
	const [meterNumber, setMeterNumber] = useState("");
	const [provider, setProvider] = useState("");
	const [selectedPackage, setSelectedPackage] = useState("");
	const [selectedMeter, setSelectedMeter] = useState("");
	const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
	const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [recents, setRecents] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		const savedRecents = JSON.parse(localStorage.getItem("recents"));
		if (savedRecents) {
			setRecents(savedRecents);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("recents", JSON.stringify(recents));
	}, [recents]);

	const handlePackageChange = (event) => {
		setSelectedPackage(event.target.value);
		setIsPackageModalOpen(false);
	};

	const handleMeterNumberChange = (event) => {
		setMeterNumber(event.target.value);
		setSelectedMeter("");
	};

	const handleMeterClick = (meter) => {
		setSelectedMeter(meter);
		setMeterNumber(meter);
	};

	const handleProviderClick = (provider) => {
		setProvider(provider);
		setIsProviderModalOpen(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (provider && selectedPackage && meterNumber) {
			setIsConfirmationModalOpen(true);
		} else {
			alert("Please fill in all fields before continuing.");
		}
	};

	const handleAddToRecents = () => {
		if (!recents.some((meter) => meter.number === meterNumber)) {
			const newRecents = [
				...recents,
				{ id: recents.length + 1, number: meterNumber },
			];
			setRecents(newRecents);
			localStorage.setItem("recents", JSON.stringify(newRecents));
		}
		setIsConfirmationModalOpen(false);

		navigate("/select-provider", {
			state: {
				meterNumber,
				provider,
				selectedPackage,
			},
		});
	};

	const handleDeleteRecent = (id) => {
		const updatedRecents = recents.filter((meter) => meter.id !== id);
		setRecents(updatedRecents);
	};

	const handleCancelAdd = () => {
		setIsConfirmationModalOpen(false);
	};

	const providers = [
		"Provider A",
		"Provider B",
		"Provider C",
		"Provider D",
		"Provider E",
		"Provider F",
		"Provider G",
		"Provider H",
		"Provider I",
		"Provider J",
		"Provider K",
		"Provider L",
	];

	const filteredProviders = providers.filter((prov) =>
		prov.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const openPackageModal = () => setIsPackageModalOpen(true);
	const closePackageModal = () => setIsPackageModalOpen(false);
	const openProviderModal = () => setIsProviderModalOpen(true);
	const closeProviderModal = () => setIsProviderModalOpen(false);

	const handleSearchChange = (e) => setSearchTerm(e.target.value);

	return (
		<div className="relative bg-gray-100 min-h-screen">
			<header>
				<h1 className="text-2xl font-bold mb-4 text-center pt-8">
					Buy Electricity
				</h1>
			</header>
			<hr className="text-gray-800 mb-6 border border-gray-200" />

			<form
				onSubmit={handleSubmit}
				className="bg-white rounded-lg px-4 py-6 mb-4"
			>
				<div className="mb-4">
					<h2 className="font-bold text-lg mb-4 font-sans">
						Enter your correct details
					</h2>
					<button
						type="button"
						className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline font-bold text-xl text-left"
						onClick={openProviderModal}
					>
						{provider || "Select Provider"}
						<MdKeyboardArrowDown className="ml-auto -mt-5 text-gray-400" />
					</button>
				</div>

				<div className="mb-4">
					<button
						type="button"
						className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline font-bold text-xl text-left"
						onClick={openPackageModal}
					>
						{selectedPackage || "Select Package"}
						<MdKeyboardArrowDown className="ml-auto -mt-5 text-gray-400" />
					</button>
				</div>

				<div className="mb-4">
					<input
						type="number"
						id="meter-number"
						className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xl font-bold"
						value={meterNumber}
						onChange={handleMeterNumberChange}
						placeholder="Enter meter number"
						maxLength={"11"}
					/>
				</div>

				<div className="flex items-center justify-center">
					<button
						type="submit"
						className={`bg-amber-800 hover:bg-amber-900 text-white font-bold py-4 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full text-xl `}
					>
						Continue
					</button>
				</div>
			</form>

			<div className="bg-white shadow-md rounded-t-3xl p-4 ml-5 mr-5 h-96">
				<h2 className="text-lg font-bold mb-4">Recents</h2>
				<ul className="list-none">
					{recents.length === 0 ? (
						<li className="text-gray-300 flex justify-center items-center m-auto mt-28 text-2xl font-bold">
							Add To Recents
						</li>
					) : (
						recents.map((meter) => (
							<li
								key={meter.id}
								className={`flex items-center py-2 px-4 rounded-md hover:bg-gray-100 cursor-pointer mb-1 ${
									selectedMeter === meter.number ? "bg-gray-200" : ""
								}`}
								onClick={() => handleMeterClick(meter.number)}
							>
								<div className="flex items-center mr-4">
									<input
										type="radio"
										className="w-9 h-9 bg-yellow-500 mr-2"
										checked={selectedMeter === meter.number}
										readOnly
									/>
									<span className="font-bold text-xl">{meter.number}</span>
								</div>
								<MdKeyboardArrowRight className="ml-auto text-gray-400" />
								<MdDelete
									className="ml-4 text-red-500 cursor-pointer"
									onClick={(e) => {
										e.stopPropagation();
										handleDeleteRecent(meter.id);
									}}
								/>
							</li>
						))
					)}
				</ul>
			</div>

			{/* Confirmation Modal */}
			{isConfirmationModalOpen && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
					<div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg relative">
						<h2 className="text-2xl font-semibold mb-4 text-gray-700">
							Add to Beneficiary?
						</h2>
						<p className="mb-6 text-gray-600">
							Do you want to add meter number {meterNumber} to your beneficiary
							list?
						</p>
						<div className="flex justify-end space-x-4">
							<button
								onClick={handleAddToRecents}
								className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded"
							>
								Yes
							</button>
							<button
								onClick={handleCancelAdd}
								className="bg-white hover:bg-white text-amber-800 border border-amber-800 font-bold py-2 px-4 rounded"
							>
								No
							</button>
						</div>
					</div>
				</div>
			)}

		{/*-----------------FULL SCREEN MODAL ---------------------/*/}

    {isProviderModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg relative h-full">
            <button
              onClick={closeProviderModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
             <IoIosClose className='text-4xl inline-block -mb-10 font-seminold text-gray-500'/>
            </button>
            <h2 className="text-2xl font-semibold mb-4 flex justify-center text-gray-700 ">Select Provider</h2>
            <hr className='border border-gray-200 mb-6 -mx-10'/>   

             <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full mb-4 border rounded-lg px-8 py-2 text-lg font-semibold"

            />
<IoIosSearch  className=" left-3 top-2.5 text-gray-500 -mt-12 ml-2 text-xl "/>

        

            <ul className="overflow-y-auto mt-10">
              {filteredProviders.map((prov, index) => (
                <li
                  key={index}
                  className={`flex items-center py-2 px-4 rounded-md hover:bg-gray-100 cursor-pointer mb-4 font-sans font-bold text-xl text-gray-600 ${
                    provider === prov ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => handleProviderClick(prov)}
                >
                  
                  <input
                    type="radio"
                    name="provider"
                    value={prov}
                    checked={provider === prov}
                    readOnly
                    className="mr-2 h-8 w-8"
                  />
                  <span className="font-bold text-xl">{prov}</span>
                  <MdKeyboardArrowRight className='ml-auto -mt-5 text-gray-300'/>
                </li>
               
              ))}
                 
            </ul>;
          </div>
        </div>
      )}




		
{/*-----------------BOTTOM MODAL -----------------------------------/*/}

{isPackageModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-end z-50">
          <div className="bg-white w-full p-8 rounded-t-3xl shadow-lg relative">
            <button
              onClick={closePackageModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
             <IoIosClose className='text-4xl inline-block -mb-10 font-seminold text-gray-500'/>
            </button>
            <h2 className="text-3xl font-bold mb-4 text-gray-600">Select Package</h2>
            <ul>
              <li className="mb-4">
                <label className="flex items-center cursor-pointer mb-2 font-sans font-bold text-xl text-gray-500">
                  <input
                    type="radio"
                    name="package"
                    value="Package A"
                    checked={selectedPackage === 'Package A'}
                    onChange={handlePackageChange}
                    className="mr-2 h-8 w-8"
                  />
                  Package A
                </label>
                <MdKeyboardArrowRight className='ml-auto -mt-5 text-gray-400'/>
              </li>
              <li className="mb-4">
                <label className="flex items-center cursor-pointer mb-2 font-sans font-bold text-xl text-gray-500">
                  <input
                    type="radio"
                    name="package"
                    value="Package B"
                    checked={selectedPackage === 'Package B'}
                    onChange={handlePackageChange}
                    className="mr-2 h-8 w-8"
                  />
                  Package B
                </label>
                <MdKeyboardArrowRight className='ml-auto -mt-5 text-gray-400'/>
              </li>
              <li className="mb-4">
                <label className="flex items-center cursor-pointer mb-2 font-sans font-bold text-xl text-gray-500">
                  <input
                    type="radio"
                    name="package"
                    value="Package C"
                    checked={selectedPackage === 'Package C'}
                    onChange={handlePackageChange}
                    className="mr-2 h-8 w-8"
                  />
                  Package C
                </label>
                <MdKeyboardArrowRight className='ml-auto -mt-5 text-gray-400'/>
              </li>
            </ul>
          </div>
        </div>
      )}
		</div>
	);
}

export default BuyElectricity;
