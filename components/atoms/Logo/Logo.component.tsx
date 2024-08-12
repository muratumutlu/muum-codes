import { useEffect, useState } from "react";

import { Skeleton, Stack, useMantineColorScheme } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
	onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export default function Logo({ onClick }: LogoProps) {
	const [logoSrc, setLogoSrc] = useState("");

	const { colorScheme } = useMantineColorScheme();

	useEffect(() => {
		const newLogoSrc =
			colorScheme === "dark" ? "/muum-dark-mode.png" : "/muum-light-mode.png";
		setLogoSrc(newLogoSrc);
	}, [colorScheme]);

	if (!logoSrc) return <Skeleton height={44} width={107} />;

	return (
		<Link href="/" onClick={onClick} passHref>
			<Stack>
				<Image
					src={logoSrc}
					alt="Muum Codes"
					width={107}
					height={44}
					title="Muum Codes"
					priority
				/>
			</Stack>
		</Link>
	);
}
