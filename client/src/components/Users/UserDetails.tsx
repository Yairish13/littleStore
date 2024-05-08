import { FC, FormEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import RootStore from '../../stores/root.store';
import './UserDetails.css';

interface UserDetailsProps {
  rootStore: typeof RootStore;
}

const UserDetails: FC<UserDetailsProps> = observer(({ rootStore }) => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState<'cash' | 'credit'>('cash');

  useEffect(() => {
    if (id) {
      rootStore.userStore.fetchUserProductsById(id);
    }
  }, [id, rootStore.userStore]);

  useEffect(() => {
    const currentUser = rootStore.userStore.currentUser;

    if (currentUser) {
      setName(currentUser.name);
      setAddress(currentUser.address);
      setPayment(currentUser.payment);
    }
  }, [rootStore.userStore.currentUser]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (id) {
      rootStore.userStore.updateUser(id, {
        name,
        address,
        payment,
      });
    }
  };

  return (
    <div className="user-details-container">
      <h2 className="user-details-title">User Details</h2>
      {rootStore.userStore.isLoading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="user-details-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="paymentMethod" className="form-label">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              value={payment}
              onChange={(e) => setPayment(e.target.value as 'cash' | 'credit')}
              className="form-select"
            >
              <option value="credit">Credit</option>
              <option value="cash">Cash</option>
            </select>
          </div>
          <button type="submit" className="form-button">
            Save
          </button>
        </form>
      )}
    </div>
  );
});

export default UserDetails;