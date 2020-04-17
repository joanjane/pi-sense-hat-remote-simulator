import React, { createContext, useState } from 'react';
import { UserData } from './user-data';

export const SettingsContext = createContext({});

export const SettingsProvider = props => {
  const {
    children
  } = props;
  
  const userData = new UserData();
  const data = userData.get();
  const [serverSettings, setState] = useState({
    device: data && data.device || 'test-web-client',
    serverUri: data && data.serverUri || 'ws://localhost:8080'
  });
  
  function setServerSettings(state) {
    setState({...state});
    userData.set(state);
  }

  const context = {
    serverSettings,
    setServerSettings
  };

  return <SettingsContext.Provider value={context}>{children}</SettingsContext.Provider>;
};

export const { Consumer: SettingsConsumer } = SettingsContext;