import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login');
    });
  };

  return (
    <div>
      <div className="navbar bg-orange-500">
        <div className="flex-1">
          <Link to={user ? '/tupataneHome' : '/'}>
            <a className="btn btn-ghost text-xl">Tupatane</a>
          </Link>
        </div>
        {user && (
          <div className="flex-none gap-2">
            <div className="form-control">
             
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {user.photoURL ? (
                    <img alt="Avatar" src={user.photoURL} />
                  ) : (
                    <img alt="Avatar" src={rickImage} />
                  )}
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <Link to="/tupatane-profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li><Link to="/settings">Settings</Link></li>
                <li><Link to="/myfriends">Friends</Link></li>
                <li><Link to="/mygroups">Groups</Link></li>
                <li><a onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
