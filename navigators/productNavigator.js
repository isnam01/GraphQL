import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CategoryProducts from '../components/CategoryProducts';
import Product from '../components/Product';
import Products from '../components/Products';

const ProductNavigator=createStackNavigator(
    {
        Home:CategoryProducts,
        ProductsDetail:Products,
        ProductDetail:Product
    }
)

export default createAppContainer(ProductNavigator);