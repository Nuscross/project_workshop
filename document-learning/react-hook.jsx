
/// useEffect ///

import { useEffect } from "react";

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const users = await response.json();
      setUsers(users);
    } 
    catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, []);


/// useRef ///

import { useState, useEffect, useRef } from "react";

const UseRefBasics = () => {
  const [value, setValue] = useState(0);
  const refContainer = useRef(null);
  const isMounted = useRef(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = refContainer.current.value;
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
  }, [value]);

  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            id='name'
            ref={refContainer}
            className='form-input'
          />
        </div>
        <button type='submit' className='btn btn-block'>
          submit
        </button>
      </form>
      <h1>value : {value}</h1>
      <button onClick={() => setValue(value + 1)} className='btn'>
        increase
      </button>
    </div>
  );
};


/// Custom Hook ///

// Example 1

import { useState } from 'react';

const useToggle = (defaultValue) => {
  const [show, setShow] = useState(defaultValue);

  const toggle = () => {
    setShow(!show);
  };

  return { show, toggle };
};

/* --------------------------------- */

import useToggle from './useToggle';

const ToggleExample = () => {
  const { show, toggle } = useToggle(true);
  return (
    <div>
      <h4>toggle custom hook</h4>
      <button className='btn' onClick={toggle}>
        toggle
      </button>
      {show && <h4>some stuff</h4>}
    </div>
  );
};

/* --------------------------------- */

// Example 2

import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(url);
        if (!resp.ok) {
          setIsError(true);
          setIsLoading(false);
          return;
        }
        const response = await resp.json();
        setData(response);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { isLoading, isError, data };
};

/* --------------------------------- */

import useFetch from './useFetch';

const url = 'https://api.github.com/users/QuincyLarson';

const FetchData = () => {
  const { isLoading, isError, data: user } = useFetch(url);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>There was an error...</h2>;
  }

  const { avatar_url, name, company, bio } = user;
  
  return (
    <div>
      <img
        style={{ width: '150px', borderRadius: '25px' }}
        src={avatar_url}
        alt={name}
      />
      <h2>{name}</h2>
      <h4>works at {company}</h4>
      <p>{bio}</p>
    </div>
  );
};


/// useContext ///

// Example 1

import { createContext } from 'react';
import { useContext } from 'react';
import { useState } from 'react';

export const NavbarContext = createContext();

export const useAppContext = () => useContext(NavbarContext);

const NavbarHeader = () => {
  const [user, setUser] = useState({ name: 'bob' });
  const logout = () => {
    setUser(null);
  };
  return (
    <NavbarContext.Provider value={{ user, logout }}>
      <nav className='navbar'>
        <h5>CONTEXT API</h5>
      </nav>
    </NavbarContext.Provider>
  );
};

/* --------------------------------- */

import { useAppContext } from './Navbar';

const UserContainer = () => {
  const { user, logout } = useAppContext();
  return (
    <div className='user-container'>
      {user ? (
        <>
          <p>Hello There, {user.name.toUpperCase()}</p>
          <button type='button' className='btn' onClick={logout}>
            logout
          </button>
        </>
      ) : (
        <p>Please Login</p>
      )}
    </div>
  );
};

/* --------------------------------- */

// Example 2

import { AppProvider } from './Context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);

/* --------------------------------- */

import { useState, createContext, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pageId, setPageId] = useState(null);
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <AppContext.Provider
      value={{ isSidebarOpen, openSidebar, closeSidebar, pageId, setPageId }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

/* --------------------------------- */

import { useGlobalContext } from './Context';

const Navbar = () => {
  const { openSidebar, setPageId } = useGlobalContext();
  const handleSubmenu = (e) => {
    if (!e.target.classList.contains('nav-link')) {
      setPageId(null);
    }
  };
  return (
    <nav onMouseOver={handleSubmenu}>
      <div className='nav-center'>
        <h3 className='logo'>strapi</h3>
        <button className='toggle-btn' onClick={openSidebar}>
          <FaBars />
        </button>
        <NavLinks />
      </div>
    </nav>
  );
};


/// useReducer ///

export const CLEAR_LIST = 'CLEAR_LIST';
export const RESET_LIST = 'RESET_LIST';
export const REMOVE_ITEM = 'REMOVE_ITEM';

/* --------------------------------- */

import { CLEAR_LIST, RESET_LIST, REMOVE_ITEM } from './actions';
import { data } from '../../../data';

const reducer = (state, action) => {
  if (action.type === CLEAR_LIST) {
    return { ...state, people: [] };
  }
  if (action.type === RESET_LIST) {
    return { ...state, people: data };
  }
  if (action.type === REMOVE_ITEM) {
    let newPeople = state.people.filter(
      (person) => person.id !== action.payload.id
    );
    return { ...state, people: newPeople };
  }
  throw new Error(`No matching "${action.type}" - action type`);
};

/* --------------------------------- */

import { useState, useReducer } from 'react';
import { data } from '../../../data';
import { CLEAR_LIST, RESET_LIST, REMOVE_ITEM } from './actions';
import reducer from './reducer';

const defaultState = {
  people: data,
  isLoading: false,
};

const ReducerBasics = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } });
  };
  const clearList = () => {
    dispatch({ type: CLEAR_LIST });
  };
  const resetList = () => {
    dispatch({ type: RESET_LIST });
  };

  return (
    <div>
      {state.people.map((person) => {
        const { id, name } = person;
        return (
          <div key={id} className='item'>
            <h4>{name}</h4>
            <button onClick={() => removeItem(id)}>remove</button>
          </div>
        );
      })}
      {state.people.length < 1 ? (
        <button className='btn' style={{ marginTop: '2rem' }} onClick={resetList}>
          reset
        </button>
      ) : (
        <button className='btn' style={{ marginTop: '2rem' }} onClick={clearList}>
          clear
        </button>
      )}
    </div>
  );
};