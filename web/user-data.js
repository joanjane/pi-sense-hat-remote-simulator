export class UserData {
  get() {
    let userData = sessionStorage['userData'] ?
      JSON.parse(sessionStorage.getItem('userData'))
      : {};

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('server_uri')) {
      userData['serverUri'] = urlParams.get('server_uri');
    }

    if (urlParams.has('device')) {
      userData['device'] = urlParams.get('device');
    }
    return userData;
  }

  set(value) {
    sessionStorage.setItem('userData', JSON.stringify(value));
  }
}