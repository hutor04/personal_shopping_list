import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import withDataFetching from '../withDataFetching';
import SubHeader from '../components/Header/SubHeader';
import ListItem from '../components/ListItem/ListItem';

const ListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const List = ({ data, loading, error, match, history }) => {
  let { id } = useParams();
  let items;
  if (data.length > 0) {
    items = data.filter(item => item.listId === parseInt(id));
  }

  return !loading && !error ? (
    <>
      {history && (
        <SubHeader
          goBack={() => history.goBack()}
          openForm={() => history.push(`${match.url}/new`)}
        />
      )}
      <ListItemWrapper>
        {items && items.map(item => <ListItem key={item.id} data={item} />)}
      </ListItemWrapper>
    </>
  ) : (
    <Alert>{loading ? 'Loading...' : error}</Alert>
  );
};

export default withDataFetching(List);

