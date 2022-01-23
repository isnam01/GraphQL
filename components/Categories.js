import React from 'react';
import {View, Text, StyleSheet, Button,TouchableOpacity} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import ProductCard from './ProductCard';

const GET_CATEGORYPRODUCTS = gql`
  query getCategoryProds($id: [ID]) {
    products(
      first: 3
      channel: "default-channel"
      filter: {productTypes: $id}
    ) {
      edges {
        node {
          id
          name
          thumbnail {
            url
          }
        }
      }
      totalCount
    }
  }
`;

const Categories = props => {
  const {id,name} = props;
  const {loading, data} = useQuery(GET_CATEGORYPRODUCTS, {
    variables: {
      id,
    },
  });
  const clickHandler=()=>{
    props.navigation.navigate('ProductsDetail',{
      categoryId:id,
      productsCategory:name
    })
  }
  return (
    <View style={styles.container} key={`${id}` + 'abc'}>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={styles.productCategory}>
          {data.products.edges.length > 0 ? (
            <View>
              <View style={styles.productsHeader}>
              <Text style={{fontWeight: '700',fontSize:17}}>{props.name}</Text>
              <TouchableOpacity style={styles.button} onPress={clickHandler}>
                <View>
                  <Text style={styles.buttonText}>See More</Text>
                </View>
              </TouchableOpacity>
              </View>
              <View style={styles.products}>
                {data.products.edges.map(node => {
                  return (
                    <View key={node.node.id} style={styles.product}>
                      <ProductCard product={node.node} navigation={props.navigation}/>
                    </View>
                  );
                })}
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  product: {
    width: '47%',
  },
  products: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  productsHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  button:{
    backgroundColor:'rgba(0,0,0,0.7)',
    borderRadius:3,
    margin:5
  },
  buttonText:{
    color:'white',
    fontSize:13,
    paddingVertical:2,
    paddingHorizontal:5
  },
  productCategory:{
    width:'100%'
  }
});

export default Categories;
