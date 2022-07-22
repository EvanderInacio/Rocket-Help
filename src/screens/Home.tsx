import { useState } from 'react'
import { Alert } from 'react-native'
import auth  from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { GenderNonbinary, SignOut } from 'phosphor-react-native'
import { DesktopTower } from 'phosphor-react-native'
import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
  Heading,
  FlatList,
  Center
} from 'native-base'

import Logo from '../assets/logo_secondary.svg'

import { Filter } from '../components/Filter'
import { Button } from '../components/Button'
import { Order, OrderProps } from '../components/Order'

export function Home() {
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>(
    'open'
  )
  const [orders, setOrders] = useState<OrderProps[]>([ 
   {
    id: '123',
    patrimony: '123456',
    when: '20/07/2022 às 21:44',
    status: 'open'
   }
  ])

  const navigation = useNavigation()
  const { colors } = useTheme()

  function handleNewOrder(){
    navigation.navigate('new');
  }

  function handleOpenDetails( orderId: string){
    navigation.navigate('details', { orderId })
  }

  function handleLogout() {
    auth().signOut().catch(error => {
      console.log(error);
      return Alert.alert('Sair' , 'Não foi possível sair.')
    })
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton 
          icon={<SignOut size={26} color={colors.gray[300]} />} 
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignContent="center"
        >
          <Heading color="gray.100">
            Solicitações
          </Heading>

          <Text color="gray.200">
            {orders.length}
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="Em andamento"
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />

          <Filter
            type="closed"
            title="Finalizados"
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Order data={item} 
          onPress={() => handleOpenDetails(item.id)} 
        />} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <DesktopTower color={ colors.gray[300] } size={70}/>
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Você ainda não possui {'\n'}
                solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
              </Text> 
            </Center>
          )}
        />

        <Button title="Nova solicitação"  onPress={handleNewOrder}/>
      </VStack>
    </VStack>
  )
}

