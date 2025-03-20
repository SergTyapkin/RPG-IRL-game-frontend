interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';

  isSignedIn: boolean;
}
