export class UserData {
  get() {
    const data = sessionStorage.getItem('userData');
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  }

  set(value) {
    sessionStorage.setItem('userData', JSON.stringify(value));
  }
}