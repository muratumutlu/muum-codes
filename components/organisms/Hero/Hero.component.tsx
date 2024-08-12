import { Box, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./Hero.module.css";

function Hero() {
	const isMobile = useMediaQuery("(max-width: 755px)");

	return (
		<Box mb="xl">
			<Title className={classes.title} ta="center" mt={100} fw={900} size={80}>
				Muum{" "}
				<Text
					inherit
					variant="gradient"
					component="span"
					gradient={{ from: "pink", to: "blue" }}
				>
					Codes!
				</Text>
			</Title>
			<Text
				c="dimmed"
				ta="center"
				size="lg"
				maw={isMobile ? 300 : 800}
				mx="auto"
				mt="md"
			>
				Welcome to the Muum Codes&apos; Github Explorer. This project is being
				developed by Murat Umutlu to make your github research experience
				better! Enjoy it!
			</Text>
		</Box>
	);
}

export default Hero;
