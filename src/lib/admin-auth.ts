// lib/admin-auth.ts
export function verifyAdmin(email: string, password?: string): boolean {
  const adminUsers = [
    { 
      email: "musbahuameen2123@gmail.com", 
      password: process.env.ADMIN_PASSWORD_1 
    },
    { 
      email: "resumetailorapp@gmail.com", 
      password: process.env.ADMIN_PASSWORD_2 
    }
  ];

  const admin = adminUsers.find(user => user.email === email);
  
  if (!admin) return false;
  
  // If no password provided, still allow access but show warning
  if (!password) return true;
  
  return password === admin.password;
}