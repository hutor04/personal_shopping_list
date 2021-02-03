import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header/Header';
import ListContextProvider, { ListContext } from '../Context/ListContextProvider';
import ItemsContextProvider, { ItemsContext } from '../Context/ItemsContextProvider';
import Lists from './Lists';
import List from './List';
import Form from './Form';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

const App = () => (
  <>
    <GlobalStyle />
    <AppWrapper>
      <Header />
      <ItemsContextProvider
        dataSource={'http://my-json-server.typicode.com/pranayfpackt/-React-Projects/items'}>
        <ListContextProvider
          dataSource={'http://my-json-server.typicode.com/PacktPublishing/React-Projects/lists'}>
          <ListContext.Consumer>
            {({ list, lists, loading: listsLoading, error: listsError, getListsRequest, getListRequest }) => (
              <ItemsContext.Consumer>
                {({ items, loading: itemsLoading, error: listsError, getItemsRequest }) => (
                  <Switch>
                    {lists &&
                    <Route exact path='/'>
                      <Lists
                        lists={lists}
                        loading={listsLoading}
                        error={listsError}
                        getListsRequest={getListsRequest}
                      />
                    </Route>}
                    <Route path='/list/:id/new' component={Form} />
                    {lists && items &&
                    <Route path='/list/:id'>
                      <List
                        list={list}
                        lists={lists}
                        items={items}
                        loading={itemsLoading}
                        error={listsError}
                        getItemsRequest={getItemsRequest}
                        getListRequest={getListRequest}
                      />
                    </Route>}
                  </Switch>
                )}
              </ItemsContext.Consumer>
            )}
          </ListContext.Consumer>
        </ListContextProvider>
      </ItemsContextProvider>
    </AppWrapper>
  </>
);

export default App;
