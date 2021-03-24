import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Routing from './Routing';

export default function App(): ReactElement {

  return (
    <BrowserRouter>
      <Layout>
        <Routing />
      </Layout>
    </BrowserRouter>
  );
}
