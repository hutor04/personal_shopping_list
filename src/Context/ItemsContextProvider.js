import React, { useReducer }  from 'react';

export const ItemsContext = React.createContext();

const initialValue = {
  items: [],
  loading: true,
  error: '',
};

const reducer = (value, action) => {
  switch (action.type) {
    case 'GET_ITEMS_SUCCESS':
      return {
        ...value,
        items: action.payload,
        loading: false,
      };
    case 'GET_ITEMS_ERROR':
      return {
        ...value,
        items: [],
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

const postData = async (dataSource, content) => {
  try {
    const data = await fetch(dataSource, {
      method: 'POST',
      body: JSON.stringify(content),
    });
    const dataJSON = await data.json();
    if (dataJSON) {
      return await ({ data: dataJSON, error: false });
    }
  } catch(error) {
    return ({ data: false, error: error.message });
  }
};
    


const ListContextProvider = ({ children, data }) => {
  const [value, dispatch] = useReducer(reducer, initialValue);

  const getItemsRequest = async (id) => {
    const result = await fetchData(`
    http://my-json-server.typicode.com/PacktPublishing/React-Projects/items/${id}/items
    `);

    if (result.data && result.data.length) {
      dispatch({ type: 'GET_ITEMS_SUCCESS', payload: result.data });
    } else {
      dispatch({ type: 'GET_ITEMS_ERROR', payload: result.error });
    }
  }

  return (
    <ItemsContext.Provider value={{ ...value, getItemsRequest }}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ListContextProvider;
