import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthGuard } from '@/components/AuthGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { getLanguage, t, type Language } from '@/lib/i18n';
import { getUsers, createUser, updateUser, deleteUser, type User, type UserRole, type UserStatus } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

function AdminContent() {
  const [language, setLanguage] = useState<Language>(getLanguage());
  const [users, setUsers] = useState<User[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'doctor' as UserRole,
  });
  const [newPassword, setNewPassword] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setLanguage(getLanguage());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setUsers(getUsers());
  };

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: language === 'en' ? 'Error' : 'خطأ',
        description: language === 'en' ? 'All fields are required' : 'جميع الحقول مطلوبة',
        variant: 'destructive',
      });
      return;
    }

    createUser({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
      status: 'active',
    });

    toast({
      title: t('userCreated', language),
    });

    setShowCreateDialog(false);
    setNewUser({ name: '', email: '', password: '', role: 'doctor' });
    loadUsers();
  };

  const handleToggleStatus = (user: User) => {
    const newStatus: UserStatus = user.status === 'active' ? 'suspended' : 'active';
    updateUser(user.id, { status: newStatus });
    toast({
      title: t('userUpdated', language),
    });
    loadUsers();
  };

  const handleResetPassword = () => {
    if (!selectedUser || !newPassword) return;

    updateUser(selectedUser.id, { password: newPassword });
    toast({
      title: t('userUpdated', language),
      description: language === 'en' ? 'Password reset successfully' : 'تم إعادة تعيين كلمة المرور بنجاح',
    });

    setShowResetDialog(false);
    setSelectedUser(null);
    setNewPassword('');
  };

  const handleDeleteUser = (user: User) => {
    if (window.confirm(t('confirmDelete', language))) {
      deleteUser(user.id);
      toast({
        title: t('userDeleted', language),
      });
      loadUsers();
    }
  };

  const doctors = users.filter(u => u.role === 'doctor');

  const renderUserTable = (userList: User[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('name', language)}</TableHead>
          <TableHead>{t('email', language)}</TableHead>
          <TableHead>{t('role', language)}</TableHead>
          <TableHead>{t('status', language)}</TableHead>
          <TableHead>{t('actions', language)}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userList.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                {t(user.role, language)}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                {t(user.status, language)}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleStatus(user)}
                >
                  {user.status === 'active' ? t('suspend', language) : t('activate', language)}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedUser(user);
                    setShowResetDialog(true);
                  }}
                >
                  {t('resetPassword', language)}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteUser(user)}
                >
                  {t('delete', language)}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">{t('adminPanel', language)}</h1>
            <Button onClick={() => setShowCreateDialog(true)}>
              {t('createUser', language)}
            </Button>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">{t('userManagement', language)}</TabsTrigger>
              <TabsTrigger value="doctors">{t('doctorsList', language)}</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {renderUserTable(users)}
            </TabsContent>

            <TabsContent value="doctors" className="space-y-4">
              {renderUserTable(doctors)}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Create User Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('createNewUser', language)}</DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? 'Enter user details to create a new account' 
                : 'أدخل تفاصيل المستخدم لإنشاء حساب جديد'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('name', language)}</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('email', language)}</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('password', language)}</Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">{t('role', language)}</Label>
              <Select
                value={newUser.role}
                onValueChange={(value) => setNewUser({ ...newUser, role: value as UserRole })}
              >
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor">{t('doctor', language)}</SelectItem>
                  <SelectItem value="admin">{t('admin', language)}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              {t('cancel', language)}
            </Button>
            <Button onClick={handleCreateUser}>{t('save', language)}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('resetPassword', language)}</DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? `Reset password for ${selectedUser?.name}` 
                : `إعادة تعيين كلمة المرور لـ ${selectedUser?.name}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">{t('newPassword', language)}</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetDialog(false)}>
              {t('cancel', language)}
            </Button>
            <Button onClick={handleResetPassword}>{t('save', language)}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}

export default function Admin() {
  return (
    <AuthGuard requiredRole="admin">
      <AdminContent />
    </AuthGuard>
  );
}
