/// Fetch Data ///

const fetchTours = async () => {
  try {
    const response = await fetch(url);
    const tours = await response.json();
    setTours(tours);
  }
  catch (error) {
    console.error(error);
  }
}

useEffect(()=>{
  fetchTours();
},[]);


/// Axios ///

// GET

import axios from 'axios';

const url1 = 'https://www.course-api.com/react-store-products';

const FirstRequest = () => {

  const fetchData = async () => {
    try {
      const response = await axios(url1);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error(error.response);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return <h2 className='text-center'>first request</h2>;
};

/* --------------------------------- */

// GET With Header

import { useState } from 'react';
import axios from 'axios';

const url2 = 'https://icanhazdadjoke.com/';
// Accept : 'application/json'

const Headers = () => {
  const [joke, setJoke] = useState('random dad joke');

  const fetchDadJoke = async () => {
    try {
      const response = await axios(url2, {
        headers: {
          Accept: 'application/json'
        },
      });
      setJoke(response.data.joke);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <section className='section text-center'>
      <button className='btn' onClick={fetchDadJoke}>
        random joke
      </button>
      <p className='dad-joke'>{joke}</p>
    </section>
  );
};

/* --------------------------------- */

// Post

import axios from 'axios';

const url3 = 'https://www.course-api.com/axios-tutorial-post';

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(url3, { name, email })
    console.log(response.data);
  } catch (error) {
    console.log(error.response);
  }
};

/* --------------------------------- */

// Global

import axios from "axios";

const authFetch = axios.create({
  baseURL: 'https://www.course-api.com',
  headers: {
    Accept: 'application/json',
  }
})

/* --------------------------------- */

import { useEffect } from 'react';
import axios from 'axios';
import authFetch from '../axios/custom';

const randomUserUrl = 'https://randomuser.me/api';

const CustomInstance = () => {
  const fetchData = async () => {
    try {
      const response1 = await authFetch('/react-store-products');
      const response2 = await axios(randomUserUrl);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <h2 className='text-center'>custom instance</h2>;
};


/// HTTP Methods ///

// HTTP GET example
try {
  const response = await axios.get('/api/data');
  console.log(response.data);
} catch (error) {
  console.error(error);
}

axios
  .get('/api/data')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

/* --------------------------------- */

// HTTP POST example
try {
  const response = await axios.post('/api/data', { name: 'John', age: 30 });
  console.log(response.data);
} catch (error) {
  console.error(error);
}

/* --------------------------------- */

// HTTP PATCH example
try {
  const response = await axios.patch('/api/data/1', { age: 31 });
  console.log(response.data);
} catch (error) {
  console.error(error);
}

/* --------------------------------- */

// HTTP DELETE example
try {
  const response = await axios.delete('/api/data/1');
  console.log(response.data);
} catch (error) {
  console.error(error);
}