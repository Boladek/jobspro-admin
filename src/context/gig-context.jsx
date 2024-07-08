import PropTypes from "prop-types";
import { createContext, useContext, useMemo, useState } from "react";
import profileAxios from "../helpers/profileAxios";
import { useQuery } from "@tanstack/react-query";
import { UseAuth } from "./auth-context";

// Create AuthContext
const GigContext = createContext();

// Create a custom hook to use the GigContext
export const UseGig = () => {
	return useContext(GigContext);
};

// Create GigProvider component
export const GigProvider = ({ children }) => {
	const { user } = UseAuth();
	const [searchText, setSearchText] = useState("");
	const [category, setCategory] = useState("");
	const [min, setMin] = useState(0);
	const [max, setMax] = useState(100000000);
	const [time, setTime] = useState("all");
	const [experience, setExperience] = useState("exp");

	const {
		data: gigs = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["fetch-gigs" + user.userType, user.userType],
		queryFn: () => {
			if (user.userType === "pro") {
				return profileAxios.get("/pro-gigs/best-matches?page=1&limit=100");
			} else {
				return profileAxios.get("/gigs/all?page=1&limit=100");
			}
		},
		select: (data) =>
			user.userType === "pro" ? data.data.data : data.data.items,
		staleTime: Infinity,
		enabled: !!user.userType,
		// refetchOnWindowFocus: true, //
	});
	

	const allCategories = useMemo(() => {
		if (gigs.length > 0 && user.userType === "pro") {
			return [...new Set(gigs.map((gig) => gig?.subCategory.name))];
		}
		return [];
	}, [gigs, user.userType]);

	const handleRefetch = () => {
		refetch();
		setMax(100000000);
		setSearchText("");
		setCategory("");
		setMin(0);
		setTime("all");
        setExperience("exp")
	};

	const value = {
		searchText,
		handleSearch: (e) => setSearchText(e.target.value),
		bestMatches: gigs,
		postedGigs: gigs,
		gettingGigs: isLoading,
		refetch: handleRefetch,
		max,
		handleMax: (e) => setMax(e.target.value),
		min,
		handleMin: (e) => setMin(e.target.value),
		category,
		handleCategory: (e) => setCategory(e.target.value),
		allCategories,
		time,
		handleTime: (e) => setTime(e.target.value),
		experience,
		handleExperience: (e) => setExperience(e.target.value),
	};

	return <GigContext.Provider value={value}>{children}</GigContext.Provider>;
};

GigProvider.propTypes = {
	children: PropTypes.node,
};
