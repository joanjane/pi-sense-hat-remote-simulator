import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserData } from './user-data';
import { WsClient } from '../../lib/client/ws-client';
import { browserWebSocketFactory } from '../../lib/client/browser-web-socket-provider';

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
    setState({ ...state });
    userData.set(state);
  }

  const [client, setClient] = useState();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setConnected(false);
    const subscriberId = `SettingsProvider${Date.now()}`;
    const wsClient = new WsClient(browserWebSocketFactory, serverSettings.serverUri);

    setClient((prevClient) => {
      if (prevClient) {
        prevClient.close();
      }
      return wsClient;
    });
  
    try {
      wsClient.connect();
    } catch (error) {
      console.error(error);
      setConnected(false);
      return;
    }
  
    wsClient
      .onOpen(() => {
        setConnected(true);
      }, subscriberId)
      .onError((e) => {
        console.log('Error on WebSocket', e);
        setConnected(false);
      }, subscriberId)
      .onClose((e) => {
        console.log('WebSocket was closed', e);
        setConnected(false);
      }, subscriberId);

  }, [serverSettings]);


  const context = {
    serverSettings,
    setServerSettings,
    connected,
    client
  };

  return <SettingsContext.Provider value={context}>{children}</SettingsContext.Provider>;
};

export const { Consumer: SettingsConsumer } = SettingsContext;

export function useWsClient() {
  const { connected, client, serverSettings } = useContext(SettingsContext);
  return { connected, client, device: serverSettings.device };
}