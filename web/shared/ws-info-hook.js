import React, { useState, useContext } from 'react';
import { UserData } from './user-data';

export function useWsInfoState() {
  const userData = new UserData();
  const data = userData.get();
  const [state, setState] = useState({
    device: data && data.device || 'test-web-client',
    serverUri: data && data.serverUri || 'ws://localhost:8080'
  });
  
  function setAndSaveState(state) {
    setState({...state});
    userData.set(state);
    WsInfoContext.set
  }

  return [state, setAndSaveState];
}

export function useCurrentWsInfo() {
  const value = useContext(WsInfoContext);

  return value;
}

export const WsInfoContext = React.createContext({
  device: '',
  serverUri: ''
});