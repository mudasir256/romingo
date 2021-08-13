class AuthService {
  credentials = {
    user: null,
    token: null,
  }

  constructor() {
    this.deserializeCredentials();

    if (this.credentials.token !== null && this.getUser() !== null) {
      this.loadUserData();
    }
  }

  setCredentials = (user, token, remember = true) => {
    this.credentials.user = user;
    this.credentials.token = user.token || token;
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("credentials", JSON.stringify(this.credentials));
  }

  deserializeCredentials = () => {
    if (this.credentials.user === null) {
      let savedCredentials = localStorage.getItem("credentials") || sessionStorage.getItem("credentials");

      if (savedCredentials) {
        savedCredentials = JSON.parse(savedCredentials);
        this.setCredentials(savedCredentials.user, savedCredentials.token)
      }
    }
  }

  loadUserData = () => {
    const token = this.getToken();

    // function to check if token is valid
  }

  updateUser = (user) => {
    this.setCredentials(user, this.credentials.token);
  }

  getToken = () => {
    this.deserializeCredentials();
    return this.credentials.token;
  }

  getUser = () => {
    this.deserializeCredentials();
    return this.credentials.user;
  }

  isAuthenticated = () => {
    this.deserializeCredentials();
    return this.credentials.user !== null;
  }

  logout = (remember = true) => {
    const storage = remember ? localStorage : sessionStorage;
    this.credentials = {
      user: null,
      token: null
    }

    storage.removeItem("credentials")
  }
}

export const authService = new AuthService();