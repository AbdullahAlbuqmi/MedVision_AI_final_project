import { useState } from 'react';
import { Search, AlertTriangle, Loader2 } from 'lucide-react';
import axios from 'axios';
import { z } from 'zod';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BackLink } from '@/components/BackLink';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getLanguage } from '@/lib/i18n';

const drugNameSchema = z.string()
  .trim()
  .min(1, { message: "Drug name cannot be empty" })
  .max(100, { message: "Drug name must be less than 100 characters" })
  .regex(/^[a-zA-Z0-9\s\-]+$/, { message: "Drug name can only contain letters, numbers, spaces, and hyphens" });

const API_URL = 'https://durg-interaction.onrender.com';

interface SearchResult {
  drug1_name?: string;
  drug2_name?: string;
  interaction_type?: string;
  drug1_brand?: string;
  drug2_brand?: string;
}

interface InteractionResult {
  drug1_name?: string;
  drug2_name?: string;
  interaction_type?: string;
  drug1_brand?: string;
  drug2_brand?: string;
  drug1_scientific?: string;
  drug2_scientific?: string;
}

export default function DrugInteractions() {
  const { toast } = useToast();
  const language = getLanguage();
  
  const [drug, setDrug] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const [drug1, setDrug1] = useState('');
  const [drug2, setDrug2] = useState('');
  const [interaction, setInteraction] = useState<InteractionResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleSearch = async () => {
    // Validate input
    const validation = drugNameSchema.safeParse(drug);
    if (!validation.success) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: validation.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    setIsSearching(true);
    try {
      const res = await axios.post(`${API_URL}/search_drug`, { 
        drug_name: validation.data 
      });
      
      // Extract drug names and interaction type from API response
      const rawInteractions = res.data.interactions || [];
      const interactions = rawInteractions
        .map((item: any) => ({
          drug1_name: item.drug1_name,
          drug2_name: item.drug2_name,
          interaction_type: item.interaction_type,
          drug1_brand: item.drug1_brand,
          drug2_brand: item.drug2_brand
        }))
        .filter((item: SearchResult) => 
          item.drug1_name && item.drug2_name && item.interaction_type
        );
      
      setSearchResults(interactions);
      
      if (interactions.length > 0) {
        toast({
          title: language === 'ar' ? 'نجح البحث' : 'Search Complete',
          description: language === 'ar' 
            ? `تم العثور على ${interactions.length} تفاعل` 
            : `Found ${interactions.length} interaction(s)`,
        });
      }
    } catch (err) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'فشل البحث عن التفاعلات' : 'Failed to search interactions',
        variant: 'destructive',
      });
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCheckInteraction = async () => {
    // Validate both drug names
    const validation1 = drugNameSchema.safeParse(drug1);
    const validation2 = drugNameSchema.safeParse(drug2);
    
    if (!validation1.success) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: `${language === 'ar' ? 'الدواء الأول' : 'First drug'}: ${validation1.error.errors[0].message}`,
        variant: 'destructive',
      });
      return;
    }
    
    if (!validation2.success) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: `${language === 'ar' ? 'الدواء الثاني' : 'Second drug'}: ${validation2.error.errors[0].message}`,
        variant: 'destructive',
      });
      return;
    }

    setIsChecking(true);
    try {
      const res = await axios.post(`${API_URL}/check_interaction`, { 
        drug1: validation1.data, 
        drug2: validation2.data 
      });
      
      const interactionData = res.data.interaction;
      
      if (interactionData && interactionData.drug1_name && 
          interactionData.drug2_name && interactionData.interaction_type) {
        // Extract drug names and interaction type from API response
        setInteraction({
          drug1_name: interactionData.drug1_name,
          drug2_name: interactionData.drug2_name,
          interaction_type: interactionData.interaction_type,
          drug1_brand: interactionData.drug1_brand,
          drug2_brand: interactionData.drug2_brand,
          drug1_scientific: interactionData.drug1_scientific,
          drug2_scientific: interactionData.drug2_scientific
        });
        
        toast({
          title: language === 'ar' ? 'تم الفحص' : 'Check Complete',
          description: language === 'ar' ? 'تم فحص التفاعل بين الدوائين' : 'Interaction checked',
        });
      } else {
        setInteraction(null);
      }
    } catch (err) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'فشل فحص التفاعل' : 'Failed to check interaction',
        variant: 'destructive',
      });
      setInteraction(null);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container px-4 py-8">
          <BackLink />

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {language === 'ar' ? 'فحص التفاعلات الدوائية' : 'Drug Interactions Checker'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'البحث عن تفاعلات الأدوية والتحقق من التفاعلات بين دوائين'
                    : 'Search for drug interactions and check interactions between two drugs'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="search" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="search">
                      {language === 'ar' ? 'البحث عن دواء' : 'Search Drug'}
                    </TabsTrigger>
                    <TabsTrigger value="check">
                      {language === 'ar' ? 'فحص التفاعل' : 'Check Interaction'}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="search" className="space-y-4">
                    <Alert>
                      <Search className="h-4 w-4" />
                      <AlertDescription>
                        {language === 'ar'
                          ? 'أدخل اسم الدواء للبحث عن جميع التفاعلات المعروفة'
                          : 'Enter a drug name to search for all known interactions'}
                      </AlertDescription>
                    </Alert>

                    <div className="flex gap-2">
                      <Input
                        placeholder={language === 'ar' ? 'أدخل اسم الدواء' : 'Enter drug name'}
                        value={drug}
                        onChange={(e) => setDrug(e.target.value)}
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

                    {searchResults.length > 0 && (
                      <div className="space-y-4 mt-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">
                            {language === 'ar' ? 'التفاعلات المعروفة' : 'Known Interactions'}
                          </h3>
                          <Badge variant="secondary" className="text-base">
                            {language === 'ar' ? 'المجموع' : 'Total'}: {searchResults.length}
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          {searchResults.map((result, index) => (
                            <Card key={index} className="border-l-4 border-l-orange-500">
                              <CardContent className="pt-4">
                                <div className="space-y-3">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                      <p className="text-sm text-muted-foreground mb-1">
                                        {language === 'ar' ? 'الدواء الأول' : 'Drug 1'}
                                      </p>
                                      <p className="font-semibold text-base">{result.drug1_name}</p>
                                      {result.drug1_brand && (
                                        <p className="text-sm text-muted-foreground mt-1">
                                          {language === 'ar' ? 'الاسم التجاري' : 'Brand'}: {result.drug1_brand}
                                        </p>
                                      )}
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground mb-1">
                                        {language === 'ar' ? 'الدواء الثاني' : 'Drug 2'}
                                      </p>
                                      <p className="font-semibold text-base">{result.drug2_name}</p>
                                      {result.drug2_brand && (
                                        <p className="text-sm text-muted-foreground mt-1">
                                          {language === 'ar' ? 'الاسم التجاري' : 'Brand'}: {result.drug2_brand}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground mb-1">
                                      {language === 'ar' ? 'نوع التفاعل' : 'Interaction Type'}
                                    </p>
                                    <Badge variant="outline" className="mt-1">
                                      {result.interaction_type}
                                    </Badge>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {!isSearching && searchResults.length === 0 && drug && (
                      <Alert>
                        <AlertDescription>
                          {language === 'ar'
                            ? 'لم يتم العثور على تفاعلات لهذا الدواء'
                            : 'No interactions found for this drug'}
                        </AlertDescription>
                      </Alert>
                    )}
                  </TabsContent>

                  <TabsContent value="check" className="space-y-4">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        {language === 'ar'
                          ? 'أدخل اسمي الدوائين للتحقق من وجود تفاعل بينهما'
                          : 'Enter two drug names to check if there is an interaction between them'}
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                      <Input
                        placeholder={language === 'ar' ? 'الدواء الأول' : 'First drug'}
                        value={drug1}
                        onChange={(e) => setDrug1(e.target.value)}
                      />
                      <Input
                        placeholder={language === 'ar' ? 'الدواء الثاني' : 'Second drug'}
                        value={drug2}
                        onChange={(e) => setDrug2(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleCheckInteraction()}
                      />
                      <Button onClick={handleCheckInteraction} disabled={isChecking} className="w-full">
                        {isChecking ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {language === 'ar' ? 'جاري الفحص...' : 'Checking...'}
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            {language === 'ar' ? 'فحص التفاعل' : 'Check Interaction'}
                          </>
                        )}
                      </Button>
                    </div>

                    {interaction && (
                      <Card className="mt-6 border-l-4 border-l-red-500">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                            {language === 'ar' ? 'نتيجة الفحص' : 'Interaction Result'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">
                                  {language === 'ar' ? 'الدواء الأول' : 'Drug 1'}
                                </p>
                                <p className="font-semibold text-base">{interaction.drug1_name}</p>
                                {interaction.drug1_brand && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {language === 'ar' ? 'الاسم التجاري' : 'Brand'}: {interaction.drug1_brand}
                                  </p>
                                )}
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">
                                  {language === 'ar' ? 'الدواء الثاني' : 'Drug 2'}
                                </p>
                                <p className="font-semibold text-base">{interaction.drug2_name}</p>
                                {interaction.drug2_brand && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {language === 'ar' ? 'الاسم التجاري' : 'Brand'}: {interaction.drug2_brand}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {language === 'ar' ? 'نوع التفاعل' : 'Interaction Type'}
                              </p>
                              <Badge variant="destructive" className="text-base px-3 py-1">
                                {interaction.interaction_type}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {!isChecking && !interaction && drug1 && drug2 && (
                      <Alert>
                        <AlertDescription>
                          {language === 'ar'
                            ? 'لم يتم العثور على تفاعل بين هذين الدوائين'
                            : 'No interaction found between these drugs'}
                        </AlertDescription>
                      </Alert>
                    )}
                  </TabsContent>
                </Tabs>

                <Alert className="mt-6">
                  <AlertDescription className="text-sm">
                    {language === 'ar'
                      ? '⚠️ هذه المعلومات للأغراض التعليمية فقط. استشر طبيبك أو صيدليك قبل تناول أي دواء.'
                      : '⚠️ This information is for educational purposes only. Consult your doctor or pharmacist before taking any medication.'}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
