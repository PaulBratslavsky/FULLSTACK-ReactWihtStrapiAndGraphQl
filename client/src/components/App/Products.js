import React, { Component } from 'react';
import { strapi, apiUrl } from '../../Api/Strapi';
import { Link } from 'react-router-dom';
import Loading from './Loading';



class Products extends Component {

    state = {
        selectedBrandProducts: [],
        isLoading: true
    }
    async componentDidMount() {

        const brandId = this.props.match.params.brandId;

        const graphQlquery = { query: `

            query {
                brand(id: "${brandId}") {
                    _id
                    name
                    description
                    products {
                        _id
                        name
                        description
                        price
                        image {
                        url
                        }
                    }
                }
            }

        `};

        try {
            const response = await strapi.request('POST', '/graphql', { data: graphQlquery } );
            console.log(response.data.brand, "PRODUCTS DATA");

            this.setState(() => ({ 
                selectedBrandProducts: response.data.brand,
                isLoading: false 
            }))

        } catch (err) {
            console.error("GRAPHQL ERROR LOADING PRODUCTS: ", err )
            this.setState(() => ({ isLoading: false }))
        }
        
        

    }

    showProducts = (products) => (
        products.map( product => ( 
            <div key={product._id}>
                <h2>{product.name}</h2>
                <img src={`${apiUrl}${product.image.url}`} className="img-fluid" alt={`${product.name} image`}/>
                <p>{product.description} <span>{product.price}</span></p>
                <Link className="read-more" to={'#'}>More...</Link>
            </div>))
        )



    render() {
        console.log(this.state.selectedBrandProducts, "STATE PRODUCTS");
        const { name, description, products } = this.state.selectedBrandProducts;


        return (
            <div className="container">
                <div className="jumbotron jumbotron-fluid mt-3">
                <div className="container">
                    <h1 className="display-4">{name}</h1>
                    <p className="lead">{description}</p>
                </div>
                </div>
            
                { this.state.isLoading 
                ? <Loading />
                : this.showProducts(products) 
                }

            </div>
        )
    }
}

export default Products;