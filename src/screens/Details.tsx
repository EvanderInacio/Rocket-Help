import { useRoute } from '@react-navigation/native'
import { VStack, Text } from 'native-base';
import { Header } from '../components/Header';

type RouteParams = {
  orderId: string
}

export function Details() {
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="solicitação"/>
      <Text color="white">
        {orderId}
      </Text>

    </VStack>
  );
}