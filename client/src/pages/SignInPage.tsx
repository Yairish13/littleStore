import React from 'react';
import SignIn from '../components/Auth/SignIn';
import RootStore from '../stores/root.store';

interface SignInProps {
  rootStore: typeof RootStore;
}

const SignInPage: React.FC<SignInProps> = ({ rootStore }) => {
  return (
    <div>
      <SignIn rootStore={rootStore} />
    </div>
  );
};

export default SignInPage;