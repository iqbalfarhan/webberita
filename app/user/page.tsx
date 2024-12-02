// 'use client';
// import React, { useEffect, useState } from 'react';

// const UserPage = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch('/api/users')
//       .then((response) => response.json())
//       .then((data) => setUsers(data));
//   }, []);

//   return (
//     <>
//       <h1 className='font-bold text-2xl'>management users</h1>
//       <pre>{JSON.stringify(users, null, 2)}</pre>
//     </>
//   );
// };

// export default UserPage;

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import React from 'react';

const prisma = new PrismaClient();

const UserPage = async () => {
  const users = await prisma.user.findMany();

  return (
    <>
      <h1 className='font-bold text-2xl'>management users</h1>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>name</td>
            <td>email</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={async () => {
                    'use server';
                    await prisma.user.delete({
                      where: {
                        id: user.id,
                      },
                    });
                    revalidatePath('/user');
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form
        action={async (formData: FormData) => {
          'use server';
          const email = formData.get('email');
          const name = formData.get('name');

          await prisma.user.create({
            data: {
              name: name as string,
              email: email as string,
            },
          });

          revalidatePath('/user');
        }}
      >
        <input type='email' name='email' placeholder='email' />
        <input type='name' name='name' placeholder='name' />
        <button>tambah</button>
      </form>
    </>
  );
};

export default UserPage;
