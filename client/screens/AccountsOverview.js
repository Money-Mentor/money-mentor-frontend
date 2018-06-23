import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import { fetchAcctTransData } from '../store'

class AccountsOverview extends React.Component {

  componentDidMount() {
    // this.props.fetchCart();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Account Overview</Text>
      </View>
    );
  }
}


// class Cart extends Component {
//   constructor() {
//     super()
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   componentDidMount() {
//     this.props.fetchCart();
//     this.props.fetchProducts();
//   }

//   handleSubmit (evt, cartWithQtyArr) {
//     evt.preventDefault()
//     let order = cartWithQtyArr.map( product => {
//       return {
//         quantity: product.quantity,
//         price: product.price,
//         productId: product.id
//       }
//     })
//     this.props.submitOrder(order)
//   }

//   render() {
//     const { cart, allProducts } = this.props;
//     let cartKeys = Object.keys(cart)
//     let cartWithQtyArr = allProducts.filter(product => {
//       let productId = product.id
//       if (cartKeys.indexOf(productId.toString()) !== -1) {
//         product.quantity = cart[productId]
//         return product
//       }
//     })


//     let subTotal;
//     if (cartWithQtyArr.length) {
//       subTotal = cartWithQtyArr.reduce((sum, product) => {
//         return sum += Number(product.price * product.quantity)
//       }, 0)
//     }

//     let cartProductCount;
//     if (cartWithQtyArr.length) {
//       cartProductCount = cartWithQtyArr.reduce((count, product) => {
//         return count += Number(product.quantity)
//       }, 0)
//     }

//     if (Object.keys(cart).length !== 0) {
//       return (
//         <div>
//           <h2 style={{marginBottom: '0.5em', marginTop: '0.5em'}}>Shopping Cart</h2>
//           {

//           cartWithQtyArr.map(product => {
//             return (
//             <ProductCard
//               key={product.id}
//               product={product}
//               cartProductCount={cart.length}
//             />
//             )
//           })
//         }
//         <hr />
//         {
//         <div>
//           <h3>Order Subtotal ({`${cartProductCount}`} items): ${`${subTotal}`}</h3>
//         </div>
//         }
//         <div>
//           <button type="button" onClick={(evt) => this.handleSubmit(evt, cartWithQtyArr)}>Submit Your Order</button>
//           <button type="button" onClick={() => this.props.emptyCart()}>Empty your cart</button>
//         </div>
//         </div>
//       )
//     } else {
//       return (
//         <p>Your shopping cart is empty!</p>
//       )
//     }
//   }
// }

const mapState = state => {
  return {
    // cart: state.cart,
    // allProducts: state.allProducts
  }
}


export default connect(mapState)(AccountsOverview);



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
