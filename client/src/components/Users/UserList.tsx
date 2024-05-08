import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import RootStore from '../../stores/root.store';
import './UserList.css';

interface UserListProps {
  rootStore: typeof RootStore;
}

const UserList: FC<UserListProps> = observer(({ rootStore }) => {
  const { users } = rootStore.userStore;

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">Users</h2>
      {rootStore.userStore.isLoading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <ul className="user-list">
          {
            users.map((user) => (
                <li key={user.id} className="user-item">
                  <div className="user-name-container">
                    <Link to={`/users/${user.id}/cart`} className="user-link">
                      {user.name}
                    </Link>
                  </div>
                  <div className="user-edit-container">
                    <Link to={`/users/${user.id}`} className="user-edit-link">
                      edit
                    </Link>
                  </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
});

export default UserList;
