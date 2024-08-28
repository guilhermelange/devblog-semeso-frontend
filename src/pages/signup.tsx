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
    Text,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { api } from '@/services/api';
import SignUpSection from '@/components/signup.section';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Dialog from '@/components/dialog';
import { useColorModeValue } from '@chakra-ui/react';
import { resources } from '@/services/api.constants';

const SignUp: NextPage = () => {
    const [show, setShow] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter();

    const primary = useColorModeValue("purple", "purple")
    const textPlaceholder = useColorModeValue("blackAlpha.400", "whiteAlpha.400")

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()
    const toast = useToast()

    const onSubmit = async (data: any) => {
        const { name, email, password } = data;
        try {
            const response = await api.post(`${resources.USERS}/users`, { name, email, password, description: ' ', image: '' });
            toast({
                title: 'Conta criada',
                description: 'Logue com sua nova conta',
                status: 'success',
                duration: 3000,
                isClosable: true
            })
            router.push('/signin');
        } catch (err) {
            onOpen();
        }
    };

    return (
        <>
            <Flex>
                <Container maxW="container.xl" p={0}>
                    <Flex
                        h={{ base: 'auto', lg: '100vh' }}
                        py={[5, 10, 20]}
                        w={'full'}
                        direction={{ base: 'column-reverse', lg: 'row' }}
                        rowGap={[10, 10, 10, 0]}
                    >
                        <SignUpSection
                            buttonText='Login'
                            commentText={['Se mantenha conectado', 'Logue com sua conta pessoal']}
                            headingText={['Bem vindo de volta', '!']}
                            onClick={() => { router.push('signin') }} />
                        <VStack w={'full'}
                            h={'full'}
                            justifyContent={'center'}
                            alignItems={'center'}>
                            <VStack
                                pb={4}
                                spacing={6}
                                align="center">
                                {/* <DefaultLogo w='175' primary={primary} secondary={text} /> */}
                                <Heading>Crie uma conta<Text display={'inline'}>!</Text></Heading>
                            </VStack>
                            <form style={{ width: '100%', 'display': 'flex', 'justifyContent': 'center' }} onSubmit={handleSubmit(onSubmit)}>
                                <SimpleGrid columns={1} columnGap={3} rowGap={4} w={'70%'}>
                                    <FormControl isInvalid={!!errors.name}>
                                        <FormLabel htmlFor='name'>Nome</FormLabel>
                                        <Input
                                            _placeholder={{ color: textPlaceholder }}
                                            id='name'
                                            placeholder='Seu nome'
                                            {...register('name', {
                                                required: 'Obrigário informar um nome',
                                                minLength: { value: 2, message: 'O tamanho mínimo é de 2 caracteres' },
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors.name && String(errors.name.message)}
                                        </FormErrorMessage>
                                    </FormControl>
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
                                        Cadastrar
                                    </Button>
                                </SimpleGrid>
                            </form>
                        </VStack>
                    </Flex>
                </Container>
            </Flex>
            <Dialog isOpen={isOpen}
                title='Erro'
                message='Erro ao resgistrar usuário'
                button='Confirmar'
                onClose={onClose}
                onOpen={onOpen}></Dialog>
        </>
    );
};

export default SignUp;