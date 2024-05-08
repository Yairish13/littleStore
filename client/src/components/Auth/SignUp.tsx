import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import rootStore from '../../stores/root.store';
import RadioButton from '../RadioButton/RadioButton';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';

interface SignUpProps {
  rootStore: typeof rootStore;
}

const SignUp: FC<SignUpProps> = ({ rootStore }) => {
  const navigate = useNavigate();
  const { authStore } = rootStore;
  const { isLoading } = authStore;

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    password: '',
    payment: '',
    role: 'user',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === 'payment' && { [name]: id }),
    });
  };

  const handleLoggedInUser = () => {
    const { user } = authStore;
    if (user) {
      navigate('/');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await authStore.register(formData);
    handleLoggedInUser();
  };

  useEffect(() => {
    handleLoggedInUser();
  }, []);

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <TextInput
          label="Full Name"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Address"
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div className="form-group">
          <label htmlFor="payment" className="form-label">
            Payment Method
          </label>
          <div className="radio-group">
            <RadioButton
              id="cash"
              title="Cash"
              name="payment"
              onChange={handleChange}
              checked={formData.payment === 'cash'}
            />
            <RadioButton
              id="credit"
              title="Credit"
              name="payment"
              onChange={handleChange}
              checked={formData.payment === 'credit'}
            />
          </div>
        </div>
        <Button
          id="signUpButton"
          type="submit"
          disabled={isLoading}
          loading={isLoading}
        >
          Sign Up
        </Button>
      </form>
      <p className="signup-link">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
