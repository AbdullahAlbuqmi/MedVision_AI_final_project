import { useState } from 'react';
import { Search, Loader2, Pill, AlertCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BackLink } from '@/components/BackLink';
import { getSession } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getLanguage } from '@/lib/i18n';
import { translateObject } from '@/lib/translator';

const API_URL = 'https://drugs-description-api.onrender.com/search';

interface DrugResult {
  main: string;
  secondary: string;
  [key: string]: any;
}

interface SearchResponse {
  query: string;
  count: number;
  language: string;
  message?: string;
  results: DrugResult[];
}

export default function DrugDescription() {
  const { toast } = useToast();
  const language = getLanguage();
  
  const [drugName, setDrugName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);
  
  // Filter options
  const [filters, setFilters] = useState({
    use: true,
    side: true,
    sub: false,
    tclass: false,
    cclass: false,
    habit: false,
  });

  const handleSearch = async () => {
    if (!drugName.trim()) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'يرجى إدخال اسم الدواء' : 'Please enter a drug name',
        variant: 'destructive',
      });
      return;
    }

    setIsSearching(true);
    try {
      const params = new URLSearchParams({
        name: drugName,
        language: language === 'ar' ? 'arabic' : 'english',
        use: filters.use.toString(),
        side: filters.side.toString(),
        sub: filters.sub.toString(),
        tclass: filters.tclass.toString(),
        cclass: filters.cclass.toString(),
        habit: filters.habit.toString(),
      });

      const response = await fetch(`${API_URL}?${params}`);
      if (!response.ok) throw new Error('Search failed');
      
      const data: SearchResponse = await response.json();
      
      // Translate results if language is Arabic and results are in English
      if (data.results && data.results.length > 0) {
        const translatedResults = await Promise.all(
          data.results.map(result => translateObject(result))
        );
        data.results = translatedResults;
      }
      
      setSearchResponse(data);
      
      if (data.count > 0) {
        toast({
          title: language === 'ar' ? 'نجح البحث' : 'Search Complete',
          description: language === 'ar' 
            ? `تم العثور على ${data.count} نتيجة` 
            : `Found ${data.count} result(s)`,
        });
      }
    } catch (err) {
      console.error('Search error:', err);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'فشل البحث عن الدواء' : 'Failed to search for drug',
        variant: 'destructive',
      });
      setSearchResponse(null);
    } finally {
      setIsSearching(false);
    }
  };

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const session = getSession();
  const isLoggedIn = session !== null && session.role === 'doctor';

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container px-4 py-8">
          <BackLink 
            to={isLoggedIn ? '/doctor' : '/'}
            labelKey={isLoggedIn ? 'backDashboard' : 'backHome'}
          />

          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Pill className="h-6 w-6" />
                  {language === 'ar' ? 'وصف الأدوية' : 'Drug Description'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'ابحث عن معلومات تفصيلية حول الأدوية بالاسم التجاري أو العلمي'
                    : 'Search for detailed drug information by trade or scientific name'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {language === 'ar'
                      ? 'يمكنك البحث باستخدام الاسم التجاري أو الاسم العلمي للدواء'
                      : 'You can search using either the trade name or scientific name'}
                  </AlertDescription>
                </Alert>

                <div className="flex gap-2">
                  <Input
                    placeholder={language === 'ar' ? 'أدخل اسم الدواء' : 'Enter drug name'}
                    value={drugName}
                    onChange={(e) => setDrugName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch} disabled={isSearching}>
                    {isSearching ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {language === 'ar' ? 'جاري البحث...' : 'Searching...'}
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        {language === 'ar' ? 'بحث' : 'Search'}
                      </>
                    )}
                  </Button>
                </div>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-sm">
                      {language === 'ar' ? 'خيارات العرض' : 'Display Options'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { key: 'use', label: language === 'ar' ? 'الاستخدام' : 'Usage' },
                      { key: 'side', label: language === 'ar' ? 'الأعراض الجانبية' : 'Side Effects' },
                      { key: 'sub', label: language === 'ar' ? 'البدائل' : 'Substitutes' },
                      { key: 'tclass', label: language === 'ar' ? 'الفئة العلاجية' : 'Therapeutic Class' },
                      { key: 'cclass', label: language === 'ar' ? 'الفئة الكيميائية' : 'Chemical Class' },
                      { key: 'habit', label: language === 'ar' ? 'قابلية الإدمان' : 'Habit Forming' },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={key}
                          checked={filters[key as keyof typeof filters]}
                          onCheckedChange={() => toggleFilter(key as keyof typeof filters)}
                        />
                        <Label htmlFor={key} className="cursor-pointer">
                          {label}
                        </Label>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {searchResponse && (
              <div className="space-y-4">
                {searchResponse.count === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {searchResponse.message || (language === 'ar' 
                        ? 'لم يتم العثور على نتائج' 
                        : 'No results found')}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <>
                    <div className="text-sm text-muted-foreground">
                      {language === 'ar' 
                        ? `عرض ${searchResponse.count} نتيجة للبحث عن "${searchResponse.query}"`
                        : `Showing ${searchResponse.count} result(s) for "${searchResponse.query}"`}
                    </div>
                    
                    {searchResponse.results.map((result, index) => (
                      <Card key={index} className="border-l-4 border-l-primary">
                        <CardHeader>
                          <CardTitle className="text-xl">{result.main}</CardTitle>
                          <CardDescription className="text-base">
                            {result.secondary}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {Object.entries(result)
                            .filter(([key]) => key !== 'main' && key !== 'secondary')
                            .map(([key, value]) => (
                              <div key={key} className="space-y-2">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                  {key}
                                </h4>
                                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                                  {value as string}
                                </p>
                              </div>
                            ))}
                        </CardContent>
                      </Card>
                    ))}
                  </>
                )}
              </div>
            )}

            <Alert>
              <AlertDescription className="text-sm">
                {language === 'ar'
                  ? '⚠️ هذه المعلومات للأغراض التعليمية فقط. استشر طبيبك أو صيدليك قبل استخدام أي دواء.'
                  : '⚠️ This information is for educational purposes only. Consult your doctor or pharmacist before using any medication.'}
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
