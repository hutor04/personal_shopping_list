import React, { useReducer } from 'react';

export const ListContext = React.createContext();

const initialValue = {
  lists: [],
  list: {},
  loading: true,
  error: '',
};

const reducer = (value, action) => {
  switch (action.type) {
    case 'GET_LISTS_SUCCESS':
      return {
        ...value,
        lists: action.payload,
        loading: false,
      };
    case 'GET_LISTS_ERROR':
      return {
        ...value,
        lists: [],
        loading: false,
        error: action.payload,
      };
    case 'GET_LIST_SUCCESS':
      return {
        ...value,
        list: action.payload,
        loading: false,
      };
    case 'GET_LIST_ERROR':
      return {
        ...value,
        list: {},
        loading: false,
        error: action.payload,
      };
    default:
      return value;
  }
};

const fetchData = async (source) => {
  try {
    const data = await fetch(source);
    const dataJSON = await data.json();

    if (dataJSON) {
      return await ({ data: dataJSON, error: false });
    }
  } catch (error) {
    return ({ data: false, error: error.message });
  }
};

const ListContextProvider = ({ children }) => {
  const [value, dispatch] = useReducer(reducer, initialValue);

  const getListsRequest = async () => {
    const result = await fetchData('https://my-json-server.typicode.com/PacktPublishing/React-Projects/lists');

    if (result.data && result.data.length) {
      dispatch({ type: 'GET_LISTS_SUCCESS', payload: result.data });
    } else {
      dispatch({ type: 'GET_LISTS_ERROR', payload: result.error });
    }
  }

  const getListRequest = async (id) => {
    const result = await fetchData(`https://my-json-server.typicode.com/PacktPublishing/React-Projects/lists/${id}`);
    if (result.data && result.data.hasOwnProperty('id')) {
      dispatch({ type: 'GET_LIST_SUCCESS', payload: result.data });
    } else {
      dispatch({ type: 'GET_LIST_ERROR', payload: result.error });
    }
  };

  return (
    <ListContext.Provider value={{ ...value, getListsRequest, getListRequest }}>
      {children}
    </ListContext.Provider>
  );
};

export default ListContextProvider;
