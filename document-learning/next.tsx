/// Create Next App ///

npx create-next-app@latest appName


/// Routing ///

/*
  /about
    /page.tsx          # http://localhost:3000/about
  /info
    /page.tsx          # http://localhost:3000/info
      [id]             # [id] params folder
        /page.tsx      # http://localhost:3000/info/123456
  /_folder             # Private Folder (no public access)
  /(auth)              # Groups Folder
    /login
      /page.tsx        # http://localhost:3000/login
    /[...sign-in]      # params
      /page.tsx        # http://localhost:3000/sign-in
    /register
      /page.tsx        # http://localhost:3000/register
*/


/// Metadata ///

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roitai",
  description: "Camping in Thailand.",
  keywords: "Camping, Thailand, Roitai",
};


/// Home Page ///

/*
  - page.tsx in the root of app folder
  - represents root of our application
    '/' local domain or production domain
  - app/page.tsx
*/

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
    </div>
  );
};
export default HomePage;


/// Create Pages in Next.js ///

/*
  - in the app folder create a folder with the page.js file
  - about/page.js
  - contact/page.js
  - app/about/page.tsx
*/

const AboutPage = () => {
  return (
    <div>
      <h1>AboutPage</h1>
    </div>
  );
};
export default AboutPage;


/// Link Component ///

import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <Link href='/about'>about page</Link>
      { data.map((tour) => {
        return <Link href={`/tours/${tour.id}`}>tour page</Link>
      })}
    </div>
  );
};


// Nested Routes //

/* app/info/contact/page.tsx */

function ContactPage() {
  return <h1>ContactPage</h1>;
}
export default ContactPage;


/// Layouts and Templates ///

/* layout.tsx */

import './globals.css';

export default function RootLayout({children}:{children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body>
        {children}
      </body>
    </html>
  );
}


/// Client Components ///

'use client';

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
export default Counter;


/// Fetch Data in Server Components ///

const url = 'https://www.course-api.com/react-tours-project';

type Tour = {
  id: string;
  name: string;
  info: string;
  image: string;
};

async function ToursPage() {
  const response = await fetch(url);
  const data: Tour[] = await response.json();
  return (
    <section>
      <h1>Tours</h1>
      { data.map((tour) => {
        return <h2 key={tour.id}>{tour.name}</h2>;
      })}
    </section>
  );
}
export default ToursPage;


/// Loading Component ///

/* tours/loading.tsx */

'use client';

const loading = () => {
  return <span>loading tours...</span>;
};
export default loading;


/// Error Component ///

/* tours/error.js */

'use client';

const error = () => {
  return <div>there was an error...</div>;
};
export default error;


/// Dynamic Routes ///

/* app/tours/[id]/page.tsx */

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>ID : {params.id}</h1>
    </div>
  );
};
export default page;


/// Next Image Component ///

import mapsImg from '@/images/maps.jpg';
import Image from 'next/image';

const url = 'https://www.course-api.com/images/tours/tour-1.jpeg';

const page = async ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>ID : {params.id}</h1>
      <section>
        <div>
          <Image src={mapsImg} alt='maps' width={192} height={192} />
        </div>
      </section>
    </div>
  );
};
export default page;


/// Remote Images ///

import Image from 'next/image';

const url = 'https://www.course-api.com/images/tours/tour-1.jpeg';

const page = async ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>ID : {params.id}</h1>
      <section>
        <div>
          <Image src={url} alt='tour' width={192} height={192} priority />
        </div>
      </section>
    </div>
  );
};
export default page;

/* --------------------------------- */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.course-api.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};
export default nextConfig;


/// Server Actions ///

/*
  Rules :
  - must be async
  - add 'use server' in function body (only in React Server Component)
  - can use in React Client Component but only as import
*/


// Form - Setup

const createUser = async () => {
  'use server';
  console.log('creating user....');
};

function Form() {
  return (
    <form action={createUser} className={formStyle}>
      <h2>create user</h2>
      <input
        type='text'
        name='firstName'
        required
        className={inputStyle}
        defaultValue='peter'
      />
      <input
        type='text'
        name='lastName'
        required
        className={inputStyle}
        defaultValue='smith'
      />
      <button type='submit' className={btnStyle}>
        submit
      </button>
    </form>
  );
}
export default Form;


// Actions File

/*
  - create utils/actions.ts
  - make "Form" Client Component ('use client')
*/

'use server';

export const createUser = async () => {
  console.log('creating user....');
};

/* --------------------------------- */

'use client';

import { createUser } from '@/utils/actions';


// FormData

export const createUser = async (formData: FormData) => {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const rawData = Object.fromEntries(formData);
  console.log(rawData);
  console.log({ firstName, lastName });
};


// Save User

'use server';

import { readFile, writeFile } from 'fs/promises';

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export const createUser = async (formData: FormData) => {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const newUser: User = { firstName, lastName, id: Date.now().toString() };
  await saveUser(newUser);
};

export const fetchUsers = async (): Promise<User[]> => {
  const result = await readFile('users.json', { encoding: 'utf8' });
  const users = result ? JSON.parse(result) : [];
  return users;
};

const saveUser = async (user: User) => {
  const users = await fetchUsers();
  users.push(user);
  await writeFile('users.json', JSON.stringify(users));
};


// Users List

import { fetchUsers } from '@/utils/actions';

async function UsersList() {
  const users = await fetchUsers();
  return (
    <div>
      {users.length ? (
        <div>
          { users.map((user) => (
            <h4 key={user.id}>
              {user.firstName} {user.lastName}
            </h4>
          ))}
        </div>
      ) : (
        <p>No users found...</p>
      )}
    </div>
  );
}
export default UsersList;


// RevalidatePath

import { revalidatePath } from 'next/cache';

export const createUser = async (formData: FormData) => {
  revalidatePath('/actions');
};


// redirect

/*
  - if the data is displayed in a different page
  - don't "redirect" place inside "try" block
*/

import { redirect } from 'next/navigation';

export const createUser = async (formData: FormData) => {
  redirect('/');
};

try {
  await saveUser(newUser);
  // will trigger error
  redirect('/');
} catch (error) {
  console.error(error);
}


// useActionState , useFormStatus

import { useActionState } from "react";

export const createCamps = async (prevState: any, formData: FormData) => {
  // const title = formData.get('title')
  // const location = formData.get('location')
  const rawData = Object.fromEntries(formData);
  return "create camp success!!!";
};

/* --------------------------------- */

import { createCamps } from "@/utils/actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting...." : "Submit"}
    </button>
  );
};

const Form = () => {
  const [message, formAction] = useActionState(createCamps, null);
  return (
    <>
      {message && <h1>{message}</h1>}
      <form action={formAction}>
        Form
        <input
          placeholder="Camping Name"
          name="title"
          className="border"
          defaultValue="Korat Route 3060"
        />
        <input
          placeholder="location"
          name="location"
          className="border"
          defaultValue="Korat"
        />
        <SubmitButton />
      </form>
    </>
  );
};
export default Form;


/// Route Handlers ///

/* app/api/users/route.ts */

import { NextRequest, NextResponse } from 'next/server';
import { fetchUsers, saveUser } from '@/utils/actions';

export const GET = async () => {
  const users = await fetchUsers();
  return Response.json({ users });
};

export const POST = async (request: Request) => {
  const user = await request.json();
  const newUser = { ...user, id: Date.now().toString() };
  await saveUser(newUser);
  return Response.json({ msg: 'user created' });
};

/* --------------------------------- */

import { fetchUsers, saveUser } from '@/utils/actions';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  console.log(id);

  const users = await fetchUsers();
  return Response.json({ users });
};

/* --------------------------------- */

import { fetchUsers, saveUser } from '@/utils/actions';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  console.log(request.url);
  console.log(request.nextUrl.searchParams.get('id'));

  const users = await fetchUsers();
  return NextResponse.redirect(new URL('/', request.url));
};


/// Middleware ///

import { NextResponse } from "next/server";

export function middleware(request) {
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  // matcher : '/counter',
  matcher: ["/about/:path*", "/counter/:path*"],
}