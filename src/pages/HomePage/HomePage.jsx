import React from 'react';

import './HomePage.css';
import Product from '../../components/Product/Product';
import Bestsellers from '../../components/Bestsellers/Bestsellers';
import Promotions from '../../components/Promotions/Promotions';

function HomePage() {
  return (
    <div>
      
                  
      <Product/>
 
      <Promotions/>

      <Bestsellers/>


    </div>

    
  );
}

export default HomePage;