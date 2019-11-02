import { WebRemoteDisplay } from './web-remote-display';

const webRemoteDisplay = new WebRemoteDisplay(
  document.querySelector('#display'),
  {
    device: 'test-web-client',
    serverUri: 'ws://localhost:8080'
  }
);
webRemoteDisplay.init();