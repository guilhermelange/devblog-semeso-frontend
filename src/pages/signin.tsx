import { useForm } from 'react-hook-form'
import {
    Button,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    SimpleGrid,
    useColorModeValue,
    useToast,
    VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import SignUpSection from '@/components/signup.section';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { AuthContext } from '@/context/AuthContext';
import Logo from '@/components/logo';

const SignIn: NextPage = () => {
    const [show, setShow] = useState(false);
    const { signIn } = useContext(AuthContext);
    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()
    const toast = useToast()

    const primary = useColorModeValue("purple", "purple")
    const text = useColorModeValue("black", "white")
    const textPlaceholder = useColorModeValue("blackAlpha.400", "whiteAlpha.400")

    const onSubmit = async (data: any) => {
        const { email, password } = data;
        toast({
            title: 'Aguarde...',
            description: 'Estamos conectando você à Nave Mãe',
            status: 'info',
            duration: 2000,
            isClosable: true
        })

        try {
            await signIn({ email, password, google: false });
            toast({
                title: 'Conectado',
                description: 'Você está conectado. Aproveite!',
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        } catch (error) {
            toast({
                title: 'Oops...',
                description: 'A Nave Mãe está fora de órbita! Não conseguimos conexão :(',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
    };

    return (
        <Flex>
            <Container maxW="container.xl" p={0}>
                <Flex
                    h={{ base: 'auto', lg: '100vh' }}
                    py={[5, 10, 20]}
                    w={'full'}
                    direction={{ base: 'column-reverse', lg: 'row' }}
                    rowGap={[10, 10, 10, 0]}
                >
                    <VStack w={'full'}
                        h={'full'}
                        justifyContent={'center'}
                        alignItems={'center'}>
                        <VStack
                            pb={4}
                            spacing={6}
                            align="center">
                            <Heading size={'xl'} display={'flex'} gap={4}>Entre no<Logo></Logo>DevBlog</Heading>
                        </VStack>
                        <form style={{ width: '100%', 'display': 'flex', 'justifyContent': 'center' }} onSubmit={handleSubmit(onSubmit)}>
                            <SimpleGrid columns={1} columnGap={3} rowGap={4} w={'70%'}>
                                <FormControl isInvalid={!!errors.email}>
                                    <FormLabel htmlFor='email'>Email</FormLabel>
                                    <Input
                                        _placeholder={{ color: textPlaceholder }}
                                        id='email'
                                        placeholder='exemplo@dominio.com'
                                        {...register('email', {
                                            required: 'Obrigário informar um email',
                                            pattern: {
                                                value: /\S+@\S+\.\S+/,
                                                message: "Email inválido"
                                            }
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors.email && String(errors.email.message)}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.password}>
                                    <FormLabel htmlFor='password'>Senha</FormLabel>
                                    <InputGroup>
                                        <Input
                                            _placeholder={{ color: textPlaceholder }}
                                            id='password'
                                            placeholder='*******'
                                            {...register('password', {
                                                required: 'Obrigário informar uma senha',
                                            })}
                                            type={show ? 'text' : 'password'}
                                            color={text}
                                        />
                                        <InputRightElement onClick={() => setShow(!show)}>
                                            {show ? <ViewOffIcon></ViewOffIcon> : <ViewIcon></ViewIcon>}
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>
                                        {errors.password && String(errors.password.message)}
                                    </FormErrorMessage>
                                </FormControl>
                                <Button color={'white'} colorScheme={primary} isLoading={isSubmitting} type='submit'>
                                    Login
                                </Button>
                            </SimpleGrid>
                        </form>
                    </VStack>
                    <SignUpSection
                        buttonText='Continuar'
                        commentText={['Ainda não possui uma conta?', 'Cria uma gratuitamente agora mesmo']}
                        headingText={['Cadastre-se agora', '!']}
                        onClick={() => { router.push('signup') }} />
                </Flex>
            </Container>
        </Flex>
    );
};

export default SignIn;