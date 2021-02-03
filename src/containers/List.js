import React, { useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
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

const List = ({ list, items, loading, error, getItemsRequest, getListRequest }) => {
  let { id } = useParams();
  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    if (!list) {
      getListRequest(id);
    }

    if (!items.length > 0) {
      getItemsRequest(id);
    };
    }, [items, list, id, getItemsRequest, getListRequest]);



  let subHeader;
  if (list) {
    subHeader = (
      <SubHeader
        goBack={() => history.goBack()}
        title={list.title}
        openForm={() => history.push(`${location.pathname}/new`)}
      />
    );
  }

  return !loading && !error ? (
    <>
      {subHeader}
      <ListItemWrapper>
        {items && items.map(item => <ListItem key={item.id} data={item} />)}
      </ListItemWrapper>
    </>
  ) : (
    <Alert>{loading ? 'Loading...' : error}</Alert>
  );
};

export default List;

