import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';
import { Button } from 'react-bootstrap';

const AuthButton = () => {
    const [user] = useAuthState();
    return user ? <Button onClick={signOut}>{'Sign out'}</Button> : <Button onClick={signInWithGoogle}>{'Sign in'}</Button>;
  };
export default AuthButton