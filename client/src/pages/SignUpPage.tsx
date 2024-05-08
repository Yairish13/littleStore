// src/pages/SignUpPage.tsx
import React from 'react';
import SignUp from '../components/Auth/SignUp';
import rootStore from '../stores/root.store';

interface SignUpProps {
  rootStore: typeof rootStore;
}
const SignUpPage: React.FC<SignUpProps> = () => {
  return (
    <div>
      <SignUp rootStore={rootStore} />
    </div>
  );
};

export default SignUpPage;