import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Input, Stack, Spacer, Avatar, Text, Icon, InputGroup, InputRightElement, Menu, MenuButton, MenuList, MenuItem, useColorModeValue, color, Divider, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { FiLogOut } from 'react-icons/fi'
import { CgProfile } from "react-icons/cg"
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Logo from "./logo";
import { BsBookmark } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import CustomButton from "./custom.button";

interface NavTopRequestDTO {
    inputSearch?: string | string[] | undefined;
}

export function NavTop({ inputSearch }: NavTopRequestDTO) {
    const MotionStack = motion(Stack);
    const [query, setQuery] = useState('' as string | string[] | undefined);
    const textPlaceholder = useColorModeValue("blackAlpha.400", "whiteAlpha.400")
    const { authenticated, logout, user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        setQuery(inputSearch)
    }, [inputSearch])

    function handleSearch() {
        if (query) {
            router.push(`/search?q=${query}`)
        }
    }

    return (
        <Flex
            width='full'
            height='20'
            align='center'
        >
            <Stack
                ml={'3px'}
                spacing='5'
                direction='row'
                align='center'
                justifyContent={'space-between'}
                w={'100%'}
            >
                <Stack spacing='5'
                    direction='row'
                    align='center'>
                    <Logo></Logo>
                    <InputGroup width={{ base: "100%", md: "auto" }}>
                        <Input borderRadius={{ base: "none", md: "md" }} value={query} placeholder='O que você quer ver hoje?' size='md' onChange={(e) => (setQuery(e.target.value))}
                            _placeholder={{ color: textPlaceholder }}
                            w={{ md: '96', base: 'inherit' }}>
                        </Input>
                        <InputRightElement cursor={'pointer'} onClick={handleSearch}>
                            <FiSearch></FiSearch>
                        </InputRightElement>
                    </InputGroup>
                </Stack>
                {authenticated() &&
                    <Stack
                        spacing='6'
                        direction='row'
                        align='center'
                    >
                        <Menu>
                            <MenuButton>
                                <MotionStack
                                    mr={0}
                                    whileHover={{ scale: 1.05 }}
                                    cursor='pointer'
                                    align='center'
                                    direction='row'
                                    borderRadius='full'
                                    pt='2'
                                    pb='2'
                                    parring

                                >
                                    <Avatar name={user?.name} size='sm' />
                                    <Text display={{ base: 'none', md: 'inherit' }}>{user?.name}</Text>
                                    <ChevronDownIcon display={{ base: 'none', md: 'inherit' }} />
                                </MotionStack>
                            </MenuButton>
                            <MenuList p='4'>
                                <Link href={'/profile'}>
                                    <MenuItem
                                        mb={1}
                                        alignItems='center'
                                        borderRadius='10'
                                    >
                                        <Icon mr='4' as={CgProfile} />
                                        Perfil
                                    </MenuItem>
                                </Link>
                                <Link href={'/favorites'}>
                                    <MenuItem
                                        mb={1}
                                        alignItems='center'
                                        borderRadius='10'
                                    >
                                        <Icon mr='4' as={BsBookmark} />
                                        Favoritos
                                    </MenuItem>
                                </Link>
                                <Divider></Divider>
                                <MenuItem
                                    alignItems='center'
                                    borderRadius='10'
                                    mt={1}
                                    onClick={logout}
                                >
                                    <Icon mr='4' as={FiLogOut} />
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Stack>}
                {!authenticated() &&
                    <Link href={'/signin'}>
                        <CustomButton variant="outline" callback={null}>Entre</CustomButton>
                    </Link>
                }
            </Stack>

        </Flex>
    )
}