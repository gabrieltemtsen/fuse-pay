
import React from 'react'

import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Fab,
  Link,
  Sheet,  
  BlockTitle,
  Chip,
} from 'konsta/react';
import { MdAdd } from 'react-icons/md';
import Layout from '../Layout'

const index = () => {
  return (
    <Layout>

      <Navbar title="Company"/>

      <div className=''>
        <BlockTitle>Your Companies  </BlockTitle>
      <List strongIos outlineIos>
        <ListItem media={<img
              className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
              src="https://cdn.framework7.io/placeholder/people-160x160-3.jpg"
              width="80"
              alt="demo"
            />} link title="Ivan Petrov" />
        <ListItem media={<img
              className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
              src="https://cdn.framework7.io/placeholder/people-160x160-3.jpg"
              width="80"
              alt="demo"
            />} link title="John Doe"  />
      </List>

      <BlockTitle>Your Owned Companies</BlockTitle>
      <List strongIos outlineIos>
        <ListItem
          link
          chevronMaterial={false}
          title="Yellow Submarine"
          subtitle="Beatles"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
          media={
            <img
              className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
              src="https://cdn.framework7.io/placeholder/people-160x160-1.jpg"
              width="80"
              alt="demo"
            />
          }
        />
        <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
       
        <ListItem
          link
          chevronMaterial={false}
          title="Billie Jean"
          subtitle="Michael Jackson"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
          media={
            <img
              className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
              src="https://cdn.framework7.io/placeholder/people-160x160-3.jpg"
              width="80"
              alt="demo"
            />
          }
        />
                <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      </List>
      <Fab
        className="fixed text-sm left-1/2 bottom-18-safe transform -translate-x-1/2 z-20"
        icon={<MdAdd />}
        text="Create"
        textPosition="after"
      />
      </div>

      

    </Layout>
    
  )
}

export default index