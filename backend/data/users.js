import bcrypt from 'bcryptjs';

const defineAdminUser = () => ({
  email: 'admin',
  name: 'Admin',
  password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
  isAdmin: true,
});

export { defineAdminUser };
