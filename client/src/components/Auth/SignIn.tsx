import { FC, FormEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import './SignIn.css';
import RootStore from '../../stores/root.store';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';

interface SignInProps {
  rootStore: typeof RootStore;
}

const SignIn: FC<SignInProps> = observer(({ rootStore }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { authStore } = rootStore;
  const { user, isLoading } = authStore;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await rootStore.authStore.login(username, password);
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className="signin-container">
      <h2 className="signin-title">Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <TextInput
          label="Username"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextInput
          label="Password"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          id="signInButton"
          type="submit"
          disabled={isLoading}
          loading={isLoading}
        >
          Sign In
        </Button>
      </form>
      {rootStore.authStore.errorMessage && (
        <p className="error-message">{rootStore.authStore.errorMessage}</p>
      )}
    </div>
  );
});

export default SignIn;
