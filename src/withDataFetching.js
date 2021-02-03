import React, { useState, useEffect } from 'react';

const withDataFetching = (WrappedComponent) => ({dataSource, ...rest}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async (source) => {
      try {
        const data = await fetch(dataSource);
        const dataJSON = await data.json();

        if (dataJSON) {
          setData(dataJSON);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    return fetchData(dataSource);
  }, [dataSource]);

  return (
    <WrappedComponent
      data={data}
      loading={loading}
      error={error}
      {...rest}
    />
  );
};

export default withDataFetching;

