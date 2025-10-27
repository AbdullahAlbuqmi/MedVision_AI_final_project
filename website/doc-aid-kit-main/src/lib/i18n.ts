export type Language = 'en' | 'ar';

export const translations = {
  en: {
    // Header
    logo: 'MedVision AI',
    forDoctors: 'For Doctors',
    login: 'Login',
    logout: 'Logout',
    profile: 'Profile',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    
    // Home
    heroTitle: 'Advanced AI Healthcare Tools',
    heroSubtitle: 'Empowering healthcare professionals with cutting-edge AI technology',
    ourTools: 'Our Tools',
    publicTools: 'Public Tools',
    doctorTools: 'Doctor Tools',
    lockedMessage: '🔒 For Doctors only',
    
    // Tools
    healthAssistant: 'Health Assistant',
    healthAssistantDesc: 'AI-powered chatbot for health queries',
    drugDescription: 'Drug Description',
    drugDescriptionDesc: 'Detailed medication information',
    drugInteractions: 'Drug Interactions',
    drugInteractionsDesc: 'Check medication interactions',
    chestXray: 'Chest X-Ray Analysis',
    chestXrayDesc: 'AI-powered pneumonia detection from chest X-rays',
    kidneyAnalysis: 'Kidney CT Analysis',
    kidneyAnalysisDesc: 'AI-powered kidney stone detection from CT scans',
    clinicalChat: 'Advanced Clinical Chat',
    clinicalChatDesc: 'Specialized medical consultation',
    dermatology: 'Dermatology AI Analysis',
    dermatologyDesc: 'Skin condition analysis',
    ophthalmology: 'Ophthalmology AI Analysis',
    ophthalmologyDesc: 'Eye condition detection',
    brainAnalysis: 'Brain AI Analysis',
    brainAnalysisDesc: 'Brain MRI tumor detection',
    
    // Login
    loginTitle: 'Doctor Login',
    email: 'Email',
    password: 'Password',
    role: 'Role',
    doctor: 'Doctor',
    admin: 'Administrator',
    loginButton: 'Sign In',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    invalidCredentials: 'Invalid email or password',
    roleAutoDetected: 'Role was auto-detected from the stored account.',
    
    // Doctor Dashboard
    signedInAs: 'Signed in as Doctor',
    welcomeDoctor: 'Welcome, Doctor',
    allToolsUnlocked: 'All tools are now available to you',
    
    // Admin Panel
    adminPanel: 'Admin Panel',
    userManagement: 'User Management',
    doctorsList: 'Doctors List',
    createUser: 'Create User',
    name: 'Name',
    status: 'Status',
    actions: 'Actions',
    active: 'Active',
    suspended: 'Suspended',
    activate: 'Activate',
    suspend: 'Suspend',
    resetPassword: 'Reset Password',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    createNewUser: 'Create New User',
    nameRequired: 'Name is required',
    userCreated: 'User created successfully',
    userUpdated: 'User updated successfully',
    userDeleted: 'User deleted successfully',
    confirmDelete: 'Are you sure you want to delete this user?',
    
    // Profile
    profileTitle: 'My Profile',
    displayName: 'Display Name',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    nameUpdated: 'Name updated',
    passwordUpdated: 'Password updated',
    securityNote: 'For security, consider logging out and back in.',
    currentPasswordError: 'Current password is incorrect',
    passwordMismatchError: 'New password and confirmation do not match',
    
    // Navigation
    backDashboard: 'Back to Dashboard',
    
    // Footer
    rights: 'All rights reserved',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    
    // Vision & Mission
    visionMissionTitle: 'Our Vision & Mission',
    visionTitle: 'Our Vision',
    visionText: 'To become a pioneering Saudi team leading the integration of artificial intelligence in healthcare, contributing to the goals of Saudi Vision 2030 by building smart, human-centered solutions that ease people\'s lives and empower doctors in their noble mission.',
    missionTitle: 'Our Mission',
    missionText: 'We believe technology exists to serve humanity. AI can be the patient\'s voice, the doctor\'s ally, and the bridge toward a smarter, more compassionate healthcare system.',
    
    // Team
    teamTitle: 'Meet the Team',
    teamSubtitle: 'Get to know the team',
    teamIntro: 'A team of five Saudi graduates from diverse tech backgrounds, united by a passion to serve their nation and shape the future of digital healthcare through artificial intelligence. The journey began at Tuwaiq Academy, and continues with one dream — to contribute to Saudi Vision 2030.',
    teamMember1: 'Abdullah Albuqami',
    teamMember2: 'Reem Alsaif',
    teamMember3: 'Khalid Alshuraim',
    teamMember4: 'Razan Albishri',
    teamMember5: 'Khalid Khubrani',
    teamClosing: '✨ Together, we create impact — building a smarter, healthier future.',
  },
  ar: {
    // Header
    logo: 'الصحة الذكية',
    forDoctors: 'للأطباء',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    profile: 'الملف الشخصي',
    language: 'اللغة',
    theme: 'المظهر',
    light: 'فاتح',
    dark: 'داكن',
    
    // Home
    heroTitle: 'أدوات ذكاء اصطناعي متقدمة للرعاية الصحية',
    heroSubtitle: 'تمكين المتخصصين في الرعاية الصحية بأحدث تقنيات الذكاء الاصطناعي',
    ourTools: 'أدواتنا',
    publicTools: 'أدوات عامة',
    doctorTools: 'أدوات الأطباء',
    lockedMessage: '🔒 للأطباء فقط',
    
    // Tools
    healthAssistant: 'المساعد الصحي',
    healthAssistantDesc: 'محادثة ذكية للاستفسارات الصحية',
    drugDescription: 'وصف الدواء',
    drugDescriptionDesc: 'معلومات تفصيلية عن الأدوية',
    drugInteractions: 'تفاعلات الأدوية',
    drugInteractionsDesc: 'فحص تفاعلات الأدوية',
    chestXray: 'تحليل أشعة الصدر',
    chestXrayDesc: 'تحليل ذكي لصور الأشعة السينية للصدر',
    kidneyAnalysis: 'تحليل الأشعة المقطعية للكلى',
    kidneyAnalysisDesc: 'كشف حصوات الكلى بالذكاء الاصطناعي من الأشعة المقطعية',
    clinicalChat: 'محادثة سريرية متقدمة',
    clinicalChatDesc: 'استشارة طبية متخصصة',
    dermatology: 'تحليل الأمراض الجلدية',
    dermatologyDesc: 'تحليل حالات الجلد',
    ophthalmology: 'تحليل طب العيون',
    ophthalmologyDesc: 'كشف أمراض العيون',
    brainAnalysis: 'تحليل الدماغ بالذكاء الاصطناعي',
    brainAnalysisDesc: 'كشف أورام الدماغ من الرنين المغناطيسي',
    
    // Login
    loginTitle: 'تسجيل دخول الطبيب',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    role: 'الدور',
    doctor: 'طبيب',
    admin: 'مسؤول',
    loginButton: 'تسجيل الدخول',
    emailRequired: 'البريد الإلكتروني مطلوب',
    passwordRequired: 'كلمة المرور مطلوبة',
    invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    roleAutoDetected: 'تم التعرف على الدور من الحساب المسجّل.',
    
    // Doctor Dashboard
    signedInAs: 'مسجل الدخول كطبيب',
    welcomeDoctor: 'مرحباً، دكتور',
    allToolsUnlocked: 'جميع الأدوات متاحة لك الآن',
    
    // Admin Panel
    adminPanel: 'لوحة الإدارة',
    userManagement: 'إدارة المستخدمين',
    doctorsList: 'قائمة الأطباء',
    createUser: 'إنشاء مستخدم',
    name: 'الاسم',
    status: 'الحالة',
    actions: 'الإجراءات',
    active: 'نشط',
    suspended: 'موقوف',
    activate: 'تفعيل',
    suspend: 'إيقاف',
    resetPassword: 'إعادة تعيين كلمة المرور',
    delete: 'حذف',
    cancel: 'إلغاء',
    save: 'حفظ',
    createNewUser: 'إنشاء مستخدم جديد',
    nameRequired: 'الاسم مطلوب',
    userCreated: 'تم إنشاء المستخدم بنجاح',
    userUpdated: 'تم تحديث المستخدم بنجاح',
    userDeleted: 'تم حذف المستخدم بنجاح',
    confirmDelete: 'هل أنت متأكد من حذف هذا المستخدم؟',
    
    // Profile
    profileTitle: 'ملفي الشخصي',
    displayName: 'الاسم المعروض',
    changePassword: 'تغيير كلمة المرور',
    currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور',
    nameUpdated: 'تم تحديث الاسم',
    passwordUpdated: 'تم تحديث كلمة المرور',
    securityNote: 'لأمان أعلى، يُفضّل تسجيل الخروج ثم الدخول مجددًا.',
    currentPasswordError: 'كلمة المرور الحالية غير صحيحة',
    passwordMismatchError: 'تأكيد كلمة المرور غير مطابق',
    
    // Navigation
    backDashboard: 'العودة إلى لوحة التحكم',
    
    // Footer
    rights: 'جميع الحقوق محفوظة',
    about: 'عن',
    contact: 'اتصل',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
    
    // Vision & Mission
    visionMissionTitle: 'رؤيتنا ورسالتنا',
    visionTitle: 'رؤيتنا',
    visionText: 'أن نكون فريقًا سعوديًا رائدًا في توظيف الذكاء الاصطناعي لخدمة قطاع الصحة، مساهمين في تحقيق مستهدفات رؤية المملكة 2030 عبر بناء حلول تقنية ذكية تُسهِّل حياة الناس وتُساند الطبيب في أداء رسالته الإنسانية.',
    missionTitle: 'رسالتنا',
    missionText: 'نؤمن أن التقنية خُلقت لتخدم الإنسان، وأن الذكاء الاصطناعي يمكن أن يكون صوت المريض، وسند الطبيب، وجسرًا نحو رعاية صحية أكثر وعيًا وإنسانية.',
    
    // Team
    teamTitle: 'الفريق',
    teamSubtitle: 'تعرف على الفريق',
    teamIntro: 'خمسة خريجين سعوديين من مجالات تقنية مختلفة، جمعهم الشغف لخدمة وطنهم والمساهمة في تطوير مستقبل الرعاية الصحية من خلال الذكاء الاصطناعي، ضمن رحلة بدأت في أكاديمية طويق، وتستمر بحلمٍ واحد: أن نكون جزءًا من مسيرة رؤية 2030.',
    teamMember1: 'عبدالله البقمي',
    teamMember2: 'ريم السيف',
    teamMember3: 'خالد الشريم',
    teamMember4: 'رزان البشري',
    teamMember5: 'خالد خبراني',
    teamClosing: '✨ معًا نصنع الفرق، ونبني مستقبلًا صحيًا أكثر وعيًا وذكاءً.',
  },
};

export function getLanguage(): Language {
  const saved = localStorage.getItem('medapp_language');
  return (saved === 'ar' || saved === 'en') ? saved : 'en';
}

export function setLanguage(lang: Language) {
  localStorage.setItem('medapp_language', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
}

export function t(key: string, lang: Language): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
