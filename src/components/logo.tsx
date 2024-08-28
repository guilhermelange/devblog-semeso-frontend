import { IconButton, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SiCodemagic } from "react-icons/si";

export default function Logo() {
    const MotionIconButton = motion(IconButton);
    const stackColor = useColorModeValue("blackAlpha.100", "whiteAlpha.100")

    return (
        <Link href={'/'}>
            <MotionIconButton bg={stackColor} isRound variant='ghost' size='lg' colorScheme='white' aria-label='logo' icon={<SiCodemagic w='200' />} whileHover={{ rotate: 45 }} />
        </Link>
    )
}