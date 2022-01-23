import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import ProductCard from './ProductCard';

const GET_CATEGORYPRODUCTSS = gql`
  query getCategoryProds($id: [ID], $after: String) {
    products(
      channel: "default-channel"
      filter: {productTypes: $id}
      after: $after
      first: 5
      sortBy:{direction:DESC, field:DATE}
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
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

const Products = props => {
  const categoryId = props.navigation.getParam('categoryId');
  const {loading, data, error, fetchMore} = useQuery(GET_CATEGORYPRODUCTSS, {
    variables: {
      id: categoryId,
    },
  });
  const LoadButton = () => {
    if (loading || !data?.products.pageInfo?.hasNextPage) {
      return null;
    }
    return (
      <TouchableOpacity
      style={styles.buttonContainer}
        onPress={() => {
          console.log("calling");
          fetchMore({
            variables: {
              id: categoryId,
              after: data?.products?.pageInfo.endCursor,
            },
            updateQuery:(prev,{fetchMoreResult})=>{
              if(!fetchMoreResult)
              {return prev;}
              return {
                products:{
                  ...prev.products,
                  edges:[
                    ...prev.products.edges,
                    ...fetchMoreResult.products.edges
                  ],
                  pageInfo:{
                    ...fetchMoreResult.products.pageInfo
                  }
                }
              }
            }
          });
        }}>
        <View
      style={styles.button}>
          <Text style={styles.buttonText}>Load More</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <View style={{alignItems:'center'}}>
          <FlatList
            contentContainerStyle={{alignItems:'center'}}
            data={data?.products?.edges}
            renderItem={({item}) => (
              <View style={styles.product}>
                <ProductCard product={item.node} navigation={props.navigation} />
              </View>
            )}
            numColumns={2}
            keyExtractor={item => item.node.id}
          />
          <LoadButton/>
        </View>
      )}
    </View>
  );
};

Products.navigationOptions = navData => {
  const category = navData.navigation.getParam('productsCategory');
  return {
    headerTitle: category,
  };
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:'100%'
  },
  product: {
    width: '50%',
    height:'100%'
  },

  button:{
    width:80,
    paddingVertical:4,
    backgroundColor:'rgba(0,0,0,0.7)',
    alignItems:'center',
    borderRadius:3
  },
  buttonText:{
    color:'white'
  },
  buttonContainer:{
    display:'flex',
    justifyContent:'center'
  }
});

export default Products;
