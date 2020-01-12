import React, { Component } from 'react';
import { strapi, apiUrl } from '../../Api/Strapi';
import { Link } from 'react-router-dom';
import Loading from './Loading';

function Search({handleChange, searchTerm}) {

  return(
    <div className="mb-3">
        <input 
          onChange={ (e) => handleChange(e) } type="text" 
          value={searchTerm}
          className="form-control" 
          placeholder="Search" />
    </div>
  );
}

const graphQlquery = { query: `

  query {
    brands {
      _id
      name
      description
      image {
        url
      }
    }
  }

`};



class App extends Component {

  state = {
    brands: [],
    searchTerm: '',
    isLoading: true,
  }

  async componentDidMount() {

    try {
      
      const response = await strapi.request('POST', '/graphql', {
        data: graphQlquery
      });
  
      this.setState(() => ({ 
        brands: [ ...response.data.brands ], 
        isLoading: false
      }))

    } catch (err) {

      this.setState(() => ({ isLoading: false }))
      console.error('GRAPHQL GET BRAND ERROR: ', err);

    }
    
  }

  handleChange = (e) => {

    const searchTerm = e.target.value;
    this.setState({ searchTerm: searchTerm });

  }

  filterBrands = ({searchTerm, brands}) => {

    if ( searchTerm !== '' ) {

      return brands.filter( brandItem => {

          const sToLower = searchTerm.toLowerCase();
          const nameToLower = brandItem.name.toLowerCase();
          const descriptionToLower = brandItem.description.toLowerCase();

          if ( nameToLower.includes(sToLower) || descriptionToLower.includes(sToLower) ) {

            return brandItem;
            
          } 

      });
      
    } else {
      return brands;
    }

    
  }


  showBrands = (brands) => (
    brands.map( brand => ( 
      <div key={brand._id}>
        <h2>{brand.name}</h2>
        <div className="image-container">
          <img src={`${apiUrl}${brand.image.url}`} alt={`${brand.name} image`}/>
        </div>
        <p>{brand.description}</p>
        <Link className="read-more" to={`/${brand._id}`}>More...</Link>
      </div>))
  )


  render() {

    console.log(this.state.brands);

    return (
      <React.Fragment>
      <div className="jumbotron jumbotron-fluid mt-5">
          <div className="container">
            <h1 className="display-4">Brands</h1>
            <p className="lead">Check out our Brands Collection.</p>
          </div>
        </div>
      <div className="container">
      
        <Search handleChange={this.handleChange} searchTerm={this.state.searchTerm} />
      
        { this.state.isLoading 
          ? <Loading />
          : this.showBrands(this.filterBrands(this.state)) 
        }

      </div>
      </React.Fragment>
    )
  }
}

export default App;

