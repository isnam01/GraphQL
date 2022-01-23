import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {useQuery, gql} from '@apollo/client';

const GET_PRODUCT = gql`
  query getProduct($id:ID!) {
    product(id:$id, channel: "default-channel") {
      id
      name
      seoDescription
      updatedAt
      weight {
        unit
        value
      }
      defaultVariant {
        name
        pricing {
          onSale
          price {
            gross {
              amount
              currency
            }
          }
        }
      }
      rating
      productType {
        name
      }
      thumbnail {
        url
      }
      isAvailable(address:{country:US})
    }
  }
`;

const Product = props => {
  const productId = props.navigation.getParam('productId');
  const {loading, data, error, fetchMore} = useQuery(GET_PRODUCT, {
    variables: {
      id: productId,
    },
  });
  if (loading) {
    return <Text>loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{uri: data.product.thumbnail.url}}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.productName}>{data.product.name}</Text>
      </View>
      <View style={styles.description}>
        <Text>{data.product.seoDescription}</Text>
      </View>
      <View style={{alignItems:'flex-start',alignSelf:'flex-start',margin:10}}>
      <View style={styles.price}>
          <Text style={{fontWeight:"700"}}>Price : </Text>
        <Text>{data.product.defaultVariant.pricing.price.gross.amount} {data.product.defaultVariant.pricing.price.gross.currency}</Text>
      </View>
      <View style={styles.price}>
          <Text style={{fontWeight:"700"}}>Weight : </Text>
        <Text>{data.product.weight.value} {data.product.weight.unit}</Text>
      </View>
      <View style={styles.price}>
          <Text style={{fontWeight:"700"}}>Product Type : </Text>
        <Text>{data.product.productType.name}</Text>
      </View>
      <View style={styles.price}>
          <Text style={{fontWeight:"700"}}>Rating : </Text>
        <Text>{data.product.rating}</Text>
      </View>
      </View>
  
    </View>
  );
};

Product.navigationOptions = navData => {
  const productName = navData.navigation.getParam('productName');
  return {
    headerTitle: productName,
  };
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    margin: 5,
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    height: '100%',
  },
  image: {
    height: 200,
    width: 200,
  },
  productName: {
    width: '100%',
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
  },

  textContainer: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    textAlign: 'center',
    padding: 3,
  },
  description:{
      padding:7,
  },
  price:{
      flexDirection:'row'
  }
});

export default Product;
