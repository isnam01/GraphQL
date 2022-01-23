import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

const ProductCard = props => {
  const {product} = props;
  return (
    <TouchableOpacity
      key={product.id}
      style={styles.container}
      onPress={() => {
        props.navigation.navigate('ProductDetail', {
          productId: product.id,
          productName: product.name,
        });
      }}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: product.thumbnail.url}} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.productName}>{product.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    margin: 5,
    flexWrap: 'wrap',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    backgroundColor: 'white',
    shadowOpacity: 0.26,
    elevation: 8,
    alignContent: 'center',
    height: 125,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    height: 100,
    width: 100,
  },
  productName: {
    width: '100%',
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
  },
  imageContainer: {
    height: '80%',
  },
  textContainer: {
    height: '20%',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    textAlign: 'center',
    padding: 3,
  },
});

export default ProductCard;
