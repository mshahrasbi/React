
import {useReducer, useCallback} from 'react';

const initialState = {
  loading: false, 
  error: null,
  data: null,
  extra: null,
  identifier: null
};

const httpReducer = (curHttp, action) => {
    switch (action.type) {
      case 'SEND':
        return {
          loading: true,
          error: null,
          data: null,
          extra: null,
          indentifier: action.indentifier
        };
      case 'RESPONSE':
        return {
          ...curHttp,
          loading: false,
          data: action.responseData,
          extra: action.extra
        };
      case 'ERROR':
        return {
          loading: false,
          error: action.errorMessage
        };
      case 'CLEAR':
        return initialState;
      default:
        throw new Error('Should not get reached!');
    }
  };
  

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

    const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

    const sendRequest = useCallback((url, method, body, reqExtra, reqIndentifier) => {
        dispatchHttp({ type: 'SEND', indentifier: reqIndentifier});

        fetch(url, 
            {
                method: method,
                body: body,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                return response.json();
            })
            .then( responseData => {
                dispatchHttp({
                    type: 'RESPONSE',
                    responseData: responseData,
                    extra: reqExtra
                });
            })
            .catch(error => {
                dispatchHttp({
                    type: 'ERROR',
                    errorMessage: 'Something went wrong!'
                });
            });
    }, []);

    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest,
        reqExtra: httpState.extra,
        reqIndentifier: httpState.identifier,
        clear
    };
};

export default useHttp;