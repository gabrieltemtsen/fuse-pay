
import React from 'react'

import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Link,
  Sheet,  
  BlockTitle,
  Chip,
} from 'konsta/react';
import Layout from '../Layout'

const ViewCompany = () => {
  return (
    <Layout>
        <Navbar title="companyTitle" />

        <div className='flex company-logo'>
              <Block className='flex flex-col align-center justify-center max-w-sm' strong inset>

        <img class="h-auto max-w-sm" src="https://shorturl.at/jsTXZ" alt="image description" />

            <span className='flex align-center justify-center mt-2'>COMPANY 101</span>
        </Block>  
        </div>

    
    </Layout>
  )
}

export default ViewCompany