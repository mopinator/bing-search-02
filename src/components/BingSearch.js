/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from "react";
import Axios from "axios";

const BingSearch = () => {
	const [searchResults, setSearchResults] = useState(null);
	const [notFound, setNotFound] = useState(false);

	const [inputQuery, setInputQuery] = useState("");
	const [address, setAddress] = useState("");
	const [webPageName, setWebPageName] = useState("");
	const [snippet, setSnippet] = useState("");

	// takes search box input, removes punctuation and assigns to inputQuery variable,
	//   ready to be searched
	const handleChange = (e) => {
		const userInput = e.target.value;
		const inputSpecCharsRemoved = userInput.replace(/[^a-z0-9]/gi, "").trim();
		setInputQuery(inputSpecCharsRemoved);
	};

	// run when user searches, checks for response to have data, if it does will add data
	//   to searchResults state, otherwise turns notFound state to be true
	const handleSearch = async (e) => {
		e.preventDefault();
		console.log(inputQuery);
		try {
			const response = await Axios.post("http://localhost:8000/search", {
				query: inputQuery,
			});
			const data = response.data;
			if ("webPages" in data) {
				setSearchResults(data.webPages.value);

				setAddress(data.webPages.value[0].displayUrl);
				setSnippet(data.webPages.value[0].snippet);
				setWebPageName(data.webPages.value[0].name);
			} else {
				setNotFound(true);
			}
			console.log(webPageName);
			console.log(searchResults);
			console.log(notFound);
			console.log(address);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<form action="" onSubmit={handleSearch} className={notFound ? "not-found" : "search-form"}>
				<input type="text" onChange={handleChange} id="search-bar-input" placeholder="Search Our FAQs" />
				<button id="submit-btn">Search</button>
			</form>
			<div>
				<h1>Search</h1>

				<a href={address}>
					<h3>{webPageName}</h3>{" "}
				</a>
				<p>{address}</p>
				<p>{snippet}</p>
			</div>
		</div>
	);
};
export default BingSearch;
