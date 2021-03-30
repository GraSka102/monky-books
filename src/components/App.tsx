import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from '../Store';
import Layout from './Layout';
import Routing from './Routing';

export default function App(): ReactElement {

  return (
    <BrowserRouter>
      <StoreProvider>
        <Layout>
          <Routing />
        </Layout>
      </StoreProvider>
    </BrowserRouter>
  );
}
