import { DEFAULT_THEME, createTheme, mergeMantineTheme } from "@mantine/core";

const themeOverride = createTheme({
	cursorType: "pointer",
	primaryColor: "teal",
	defaultRadius: "md",
	defaultGradient: {
		from: "blue.5",
		to: "teal.5",
		deg: 90,
	},
});
export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
