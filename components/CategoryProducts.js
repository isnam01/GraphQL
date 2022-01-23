import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import Categories from './Categories';

const GET_CATEGORYID = gql`
  query getCategoryId {
    productTypes(first: 10) {
      edges {
        node {
          id
          name
        }
      }
      totalCount
    }
  }
`;

const CategoryProducts = (props) => {
  const {loading, data} = useQuery(GET_CATEGORYID);
  const [categoryIds, setCategoryIds] = useState([]);
  let result;
  useEffect(() => {
    if (categoryIds.length <= 0 && data?.productTypes?.edges?.length) {
      result = data.productTypes.edges.map(a => {
        return {id: a.node.id, name: a.node.name};
      });
      setCategoryIds([...result]);
    }
  }, [data]);
  return (
    <ScrollView
      style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        categoryIds.length > 0 &&
        categoryIds.map(obj => {
          return (
            <View key={obj.id} style={styles.list}>
              <Categories id={obj.id} name={obj.name} navigation={props.navigation} />
            </View>
          );
        })
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
  },
  list:{
   margin:10
  }
});

export default CategoryProducts;
