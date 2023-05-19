import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './navBar.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NavBar({ onSearch }) {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8000/user/MyProfile', { token });
        const { status, data } = response.data;
        if (status === 'ok') {
          setUserData(data);
        } else if (status === 'error') {
          console.error(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleProfileClick = () => {
   
    const userId = userData && userData._id;

      if (userId) {
        navigate('/MyProfile');
      } else {
        navigate('/Signup');
      }
    
  };

  const handleCartClick = () => {
   
    const userId = userData && userData._id;
    if (userId) {
      navigate('/Cart');
    } else {
      navigate('/Signup');
    }
  
};

const handleSearch = () => {
  onSearch(searchQuery);
};

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className='navBarBox'>
      <div className="navBarleft">
        <div className="logo">
          <img src="./images/Encore.png" alt="" className="logoImg" />
        </div>
      </div>
      <div className="navBarCenter">
        <div className="searchBarBox">
          <SearchIcon className='SearchIcon' onClick={handleSearch}/>
          <input placeholder='Click here to Search' className="searchInput" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>
      <div className="navBarRight">
        <div className="navBarlinks">
          <div className="navBarlink"><Link to='/' className="navBarlink">HomePage</Link></div>
          <div className="navBarlink"><div  onClick={handleProfileClick} className="navBarlink">Profile</div></div>
          <div className="navBarlink"><div onClick={handleCartClick} className="navBarlink">MyCart</div></div>
          <div className="navBarlink"><Link to='/Signin' className="navBarlink">SignIn/SignUp</Link></div>
        </div>
      </div>
    </div>
  );
}
