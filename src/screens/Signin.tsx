import { useState } from 'react';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Input } from '../components/input';


export function Signin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');


  const {colors } = useTheme();

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta {name}
      </Heading>

      <Input 
        mb={4}
        placeholder="E-mail"
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
        onChangeText={setName}
      />

      <Input
        mb={8} 
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry 
        onChangeText={setPassword}
      />

      <Button title="Entrar" w="full"/>

    </VStack>
  )
}
