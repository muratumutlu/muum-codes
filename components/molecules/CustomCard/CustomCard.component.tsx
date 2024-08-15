import React from "react";

import { Card, Title } from "@mantine/core";

import classes from "./CustomCard.module.css";

interface CustomCardProps {
	children: React.ReactNode;
	cardTitle?: string;
}
export default function CustomCard({ children, cardTitle }: CustomCardProps) {
	return (
		<>
			{cardTitle && (
				<Title
					className={classes.title}
					size="h4"
					mb={15}
					mt={30}
					pb={0}
					fw={700}
				>
					{cardTitle}
				</Title>
			)}
			<Card radius="md" className={classes.card} shadow="md" mb="md">
				{children}
			</Card>
		</>
	);
}
