/* eslint-disable import/order */
import {
	CustomCard,
	Filter,
	Hero,
	HomePageTemplate,
	MetaTags,
	RepoTable,
	SearchInput,
} from "@/components";
import { githubLanguages, predefinedSearchTerms } from "@/data/filterOptions";
import {
	selectFilter,
	setLanguage,
	setSearchTerm,
} from "@/store/filter/filterSlice";
import { Button, Group, Title } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

export default function HomePage() {
	const dispatch = useDispatch();
	const { language, searchTerm } = useSelector(selectFilter);

	const handleFilterChange = (value: string) => {
		dispatch(setLanguage(value));
	};

	const handleSearchChange = (value: string) => {
		dispatch(setSearchTerm(value));
	};

	return (
		<HomePageTemplate>
			<MetaTags type="homepage" />
			<Hero />
			<CustomCard>
				{searchTerm && (
					<Title>{`Open Source ${searchTerm} projects ${language && `developed with ${language}`}`}</Title>
				)}
			</CustomCard>

			<CustomCard>
				<SearchInput value={searchTerm} onChange={handleSearchChange} />
			</CustomCard>

			<CustomCard cardTitle="Or you can select a topic:">
				<Group gap={10}>
					{predefinedSearchTerms.map((term) => (
						<Button
							variant="light"
							key={term.label}
							onClick={() => handleSearchChange(term.label)}
						>
							{term.label}
						</Button>
					))}
				</Group>
			</CustomCard>
			<CustomCard>
				<Filter
					options={githubLanguages}
					onChange={handleFilterChange}
					value={language}
				/>
			</CustomCard>
			<RepoTable />
		</HomePageTemplate>
	);
}
