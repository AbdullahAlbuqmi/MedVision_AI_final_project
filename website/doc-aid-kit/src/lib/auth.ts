export type UserRole = 'doctor' | 'admin';
export type UserStatus = 'active' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export interface AuthSession {
  email: string;
  role: UserRole;
  userId: string;
  name: string;
}

const USERS_KEY = 'medapp_users';
const AUTH_KEY = 'medapp_auth';

// Seed default admin and test doctor users
export function initializeAuth() {
  const users = getUsers();
  
  // Check and add admin user if doesn't exist
  const adminExists = users.some(u => u.email === 'kkshuraim@hotmail.com');
  if (!adminExists) {
    const adminUser: User = {
      id: crypto.randomUUID(),
      name: 'Admin User',
      email: 'kkshuraim@hotmail.com',
      password: '123456789',
      role: 'admin',
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    users.push(adminUser);
  }
  
  // Check and add test doctor user if doesn't exist
  const doctorExists = users.some(u => u.email === 'try@hotmail.com');
  if (!doctorExists) {
    const doctorUser: User = {
      id: crypto.randomUUID(),
      name: 'Try Doctor',
      email: 'try@hotmail.com',
      password: '123456789',
      role: 'doctor',
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    users.push(doctorUser);
  }
  
  // Save if any changes were made
  if (!adminExists || !doctorExists) {
    saveUsers(users);
  }
}

export function getUsers(): User[] {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function createUser(user: Omit<User, 'id' | 'createdAt'>): User {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function updateUser(id: string, updates: Partial<User>) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    saveUsers(users);
  }
}

export function deleteUser(id: string) {
  const users = getUsers();
  const filtered = users.filter(u => u.id !== id);
  saveUsers(filtered);
}

export function login(email: string, password: string): { success: boolean; error?: string; role?: UserRole } {
  const users = getUsers();
  
  // Case-insensitive email matching
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find(u => 
    u.email.trim().toLowerCase() === normalizedEmail && 
    u.password === password
  );
  
  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }
  
  if (user.status === 'suspended') {
    return { success: false, error: 'Account is suspended. Please contact support.' };
  }
  
  const session: AuthSession = {
    email: user.email,
    role: user.role,
    userId: user.id,
    name: user.name,
  };
  
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  return { success: true, role: user.role };
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function getSession(): AuthSession | null {
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

export function requireAuth(requiredRole?: UserRole): boolean {
  const session = getSession();
  if (!session) return false;
  if (requiredRole && session.role !== requiredRole && session.role !== 'admin') {
    return false;
  }
  return true;
}

export function updateUserProfile(userId: string, name: string): { success: boolean; error?: string } {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return { success: false, error: 'User not found' };
  }
  
  users[userIndex].name = name;
  saveUsers(users);
  
  // Update session
  const session = getSession();
  if (session && session.userId === userId) {
    session.name = name;
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  }
  
  return { success: true };
}

export function updateUserPassword(userId: string, currentPassword: string, newPassword: string): { success: boolean; error?: string } {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return { success: false, error: 'User not found' };
  }
  
  if (users[userIndex].password !== currentPassword) {
    return { success: false, error: 'Current password is incorrect' };
  }
  
  users[userIndex].password = newPassword;
  saveUsers(users);
  
  return { success: true };
}
