import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { VStack, Text, HStack, useTheme, ScrollView } from 'native-base'
import firestore from '@react-native-firebase/firestore'
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO'
import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  Clipboard
} from 'phosphor-react-native'

import { Header } from '../components/Header'
import { OrderProps } from '../components/Order'
import { dateFormat } from '../utils/firestoreDateFormat'
import { Loading } from '../components/Loading'
import { CardDetails } from '../components/CardDetails'
import { Input } from '../components/input'
import { Button } from '../components/Button'

type RouteParams = {
  orderId: string
}

type OrderDetails = OrderProps & {
  description: string
  solution: string
  closed: string
}

export function Details() {
  const [solution, setSolution] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails)

  const { colors } = useTheme()
  const route = useRoute()
  const { orderId } = route.params as RouteParams

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then(doc => {
        const {
          patrimony,
          description,
          status,
          created_at,
          closed_at,
          solution
        } = doc.data()

        const closed = closed_at ? dateFormat(closed_at) : null

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed
        })

        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="solicitação" />
      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === 'closed' ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          color={
            order.status === 'closed'
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        >
          {order.status === 'closed' ? 'finalizado' : 'em andamento'}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />

        <CardDetails
          title="descrição do problema"
          description={order.description}
          icon={Clipboard}
        />

        <CardDetails
          title="solução"
          icon={CircleWavyCheck}
          footer={order.closed && `encerrado em ${order.closed}`}
        >
          <Input 
           bg="gray.500"
           placeholder="Descrição da solução."
           onChangeText={setSolution}
           textAlignVertical="top"
           multiline
           h={24}
          />
        </CardDetails>
      </ScrollView>

      {
        order.status === 'open' && 
         <Button 
            title="Encerrar solicitação"
            m={5}
         />
      }

    </VStack>
  )
}
