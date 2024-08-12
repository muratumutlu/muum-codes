/* eslint-disable import/order */
import { Logo, ThemeSwitcher } from "@/components";
import { ActionIcon, Container, Group } from "@mantine/core";

import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import classes from "./Header.module.css";

import router from "next/router";

export default function Header() {
	const handleLinkedinClick = () => {
		router.push("https://linkedin.com/in/murat-umutlu");
	};

	const handleGithubClick = () => {
		router.push("https://github.com/muratumutlu/muum-codes");
	};

	return (
		<header className={classes.header}>
			<Container size="xl" className={classes.inner}>
				<Logo brand="🔍 Muum Codes" />
				<Group>
					<ThemeSwitcher />
					<ActionIcon
						aria-label="Who am I?"
						radius="xl"
						size="lg"
						variant="transparent"
						color="gray"
						onClick={handleLinkedinClick}
					>
						<IconBrandLinkedin />
					</ActionIcon>
					<ActionIcon
						aria-label="Github Repository"
						radius="xl"
						size="lg"
						variant="transparent"
						color="gray"
						onClick={handleGithubClick}
					>
						<IconBrandGithub />
					</ActionIcon>
				</Group>
			</Container>
		</header>
	);
}
