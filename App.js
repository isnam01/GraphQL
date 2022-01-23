import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import CategoryProducts from './components/CategoryProducts';
import ProductNavigator from './navigators/productNavigator';

const typePolicies = {
  Query: {
    fields: {
      products: {
        edges: {
          keyArgs: ["type"],
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
};
const client = new ApolloClient({
  uri: 'https://demo.saleor.io/graphql/',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <ProductNavigator />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'black',
    width: '100%',
    height: 50,
  },
});
