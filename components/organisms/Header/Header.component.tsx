/* eslint-disable import/order */
import { Logo, ThemeSwitcher } from "@/components";
import { ActionIcon, Button, Container, Group, Menu, rem } from "@mantine/core";

import {
	IconBrandGithub,
	IconBrandLinkedin,
	IconQuestionMark,
} from "@tabler/icons-react";
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
				<Logo />
				<Group visibleFrom="md">
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
				<Group align="center" hiddenFrom="md">
					<Menu shadow="md" width={200}>
						<Menu.Target>
							<Button radius="xl">
								<IconQuestionMark />
							</Button>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Item>
								<ThemeSwitcher />
							</Menu.Item>
							<Menu.Item
								onClick={handleLinkedinClick}
								leftSection={
									<IconBrandLinkedin
										style={{ width: rem(14), height: rem(14) }}
									/>
								}
							>
								Linkedin
							</Menu.Item>
							<Menu.Item
								onClick={handleGithubClick}
								leftSection={
									<IconBrandGithub
										style={{ width: rem(14), height: rem(14) }}
									/>
								}
							>
								Github Repo
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</Container>
		</header>
	);
}
