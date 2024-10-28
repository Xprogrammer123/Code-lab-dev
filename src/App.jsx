import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [videoSrc, setVideoSrc] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

	const videos = [
		{
			imgSrc:
				"https://i.etsystatic.com/41031696/r/il/d9cf45/5321081475/il_570xN.5321081475_apn6.jpg",
			videoSrc:
				"https://cdn.pixabay.com/video/2021/07/30/83274-581386222_tiny.mp4",
			title: "Anime Video",
			description: "This video is my first react project with tailwind",
		},
		{
			imgSrc:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxehIa6Rm0vOZWeBlTLcZbPkKie0_ElDGFfOrbIGUl3V3X8Ny1q_J0M2P60rPUxaDw0Os&usqp=CAU",
			videoSrc:
				"https://cdn.pixabay.com/video/2021/10/01/90408-626004752_tiny.mp4",
			title: "Train Girl Video",
			description: "This video is my first react project with tailwind",
		},
		{
			imgSrc:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaiYbCql_8DBZjxLQgo53v2Fnhta2tOyVEpg&s",
			videoSrc:
				"https://cdn.pixabay.com/video/2017/12/05/13232-246463976_tiny.mp4",
			title: "Star React Video",
			description: "This video is my first react project with tailwind",
		},
		{
			imgSrc:
				"https://images.freecreatives.com/wp-content/uploads/2015/10/moon-gd-desktop-wallpaper.jpg",
			videoSrc:
				"https://cdn.pixabay.com/video/2023/07/13/171429-845465112_tiny.mp4",
			title: "Fire Flakes Video",
			description: "This video is my first react project with tailwind",
		},
		{
			imgSrc:
				"https://i.etsystatic.com/41031696/r/il/d9cf45/5321081475/il_570xN.5321081475_apn6.jpg",
			videoSrc:
				"https://cdn.pixabay.com/video/2021/07/30/83274-581386222_tiny.mp4",
			title: "Red Anime Video",
			description: "This video is my first react project with tailwind",
		},
		{
			imgSrc:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxehIa6Rm0vOZWeBlTLcZbPkKie0_ElDGFfOrbIGUl3V3X8Ny1q_J0M2P60rPUxaDw0Os&usqp=CAU",
			videoSrc:
				"https://cdn.pixabay.com/video/2021/10/01/90408-626004752_tiny.mp4",
			title: "Moving Train Girl Video",
			description: "This video is my first react project with tailwind",
		},
		{
			imgSrc:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaiYbCql_8DBZjxLQgo53v2Fnhta2tOyVEpg&s",
			videoSrc:
				"https://cdn.pixabay.com/video/2017/12/05/13232-246463976_tiny.mp4",
			title: "Star React Video",
			description: "This video is my first react project with tailwind",
		},
		{
			imgSrc:
				"https://images.freecreatives.com/wp-content/uploads/2015/10/moon-gd-desktop-wallpaper.jpg",
			videoSrc:
				"https://cdn.pixabay.com/video/2023/07/13/171429-845465112_tiny.mp4",
			title: "Fire Snow Video",
			description: "This video is my first react project with tailwind",
		},
	];

	//Initialize like counts for each video
	const [likes, setLikes] = useState(new Array(videos.length).fill(0));

	const openModal = (src) => {
		setVideoSrc(src);
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
		setVideoSrc("");
	};

	const handleLike = (index) => {
		const newLikes = [...likes];
		newLikes[index] += 1;
		setLikes(newLikes);
	};

	const handleSearch = (event) => {
		setSearchQuery(event.target.value.toLowerCase());
	};

	// Filter videos based on search query
	const filteredVideos = searchQuery
		? videos.filter((video) => video.title.toLowerCase().includes(searchQuery))
		: videos;

	return (
		<>
			<section className="border border-gray-200 px-3 h-[calc(100vh-50px)] w-3/6 md:border border-none rounded-xl overflow-y-auto mx-auto scrollbar-w-2 -mb-5">
				<header className="sticky top-0 w-full bg-transparent backdrop-blur-md backdrop-filter p-3">
					<input
						type="text"
						className="rounded-3xl w-full h-10 bg-slate-100 mb-4 p-3"
						placeholder="Search"
						value={searchQuery}
						onChange={handleSearch}
					/>
					<h2 className="text-3xl font-semibold text-slate-400 mb-4">
						My Downloads
					</h2>
				</header>

				{/* Video Cards */}
				{filteredVideos.map((video, index) => (
					<div
						key={index}
						className="flex flex-col sm:flex-row items-start sm:items-center border border-gradient-to-l from-red-100 to-blue-200 w-full h-auto sm:h-36 rounded-lg p-3 bg-gradient-to-l from-red-50 to-blue-200 mb-6"
					>
						<div
							className="border border-slate-400 rounded-lg w-full sm:w-1/4 h-40 sm:h-full cursor-pointer mb-4 sm:mb-0"
							onClick={() => openModal(video.videoSrc)}
						>
							<img
								src={video.imgSrc}
								className="rounded-lg w-full h-full object-cover"
								alt={video.title}
							/>
						</div>
						<div className="sm:ml-8 flex-1">
							<h1 className="text-xl font-semibold text-gray-500">
								{video.title}
							</h1>
							<p className="text-slate-400 font-semibold">
								{video.description}
							</p>
							<div className="flex items-center justify-start sm:justify-end mt-2">
								<button
									className="flex items-center space-x-1 text-red-400 hover:text-red-500"
									onClick={() => handleLike(index)}
								>
									<CiHeart className="text-2xl fill-red-400" />
									<span className="font-semibold text-lg">{likes[index]}</span>
								</button>
							</div>
						</div>
					</div>
				))}

				{/* Modal for Video */}
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					className="fixed inset-0 flex items-center justify-center p-4"
					overlayClassName="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
				>
					<div className="relative bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl">
						<button
							onClick={closeModal}
							className="absolute top-2 right-2 bg-red-500 text-white h-6 w-6 rounded-full"
						>
							X
						</button>
						<video controls autoPlay className="w-full h-auto">
							<source src={videoSrc} type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					</div>
				</Modal>
			</section>
		</>
	);
}

export default App;
