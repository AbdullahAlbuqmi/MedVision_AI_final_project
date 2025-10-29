import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Loader2, Scan, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthGuard } from '@/components/AuthGuard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { getLanguage } from '@/lib/i18n';

const API_URL = 'https://kidney-classification-model.onrender.com/predict';

interface PredictionResult {
  prediction: string;
  confidence: string;
  message: string;
}

function KidneyAnalysisContent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const language = getLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: language === 'ar' ? 'خطأ' : 'Error',
          description: language === 'ar' ? 'يرجى اختيار صورة صالحة' : 'Please select a valid image file',
          variant: 'destructive',
        });
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setResult(data);
      
      toast({
        title: language === 'ar' ? 'نجح التحليل' : 'Analysis Complete',
        description: language === 'ar' ? 'تم تحليل الصورة بنجاح' : 'CT scan analyzed successfully',
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'فشل تحليل الصورة. يرجى المحاولة مرة أخرى.' : 'Failed to analyze CT scan. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
  };

  const hasStone = result?.prediction?.toLowerCase() === 'stone';
  const isNormal = result?.prediction?.toLowerCase() === 'normal';

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/doctor')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'ar' ? 'العودة إلى لوحة التحكم' : 'Back to Dashboard'}
          </Button>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Scan className="h-6 w-6" />
                  {language === 'ar' ? 'تحليل الأشعة المقطعية للكلى' : 'Kidney CT Analysis'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'قم بتحميل صورة أشعة مقطعية للكلى للكشف عن حصوات الكلى'
                    : 'Upload a kidney CT scan image for kidney stone detection'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertDescription>
                    {language === 'ar'
                      ? 'يستخدم هذا النظام الذكاء الاصطناعي للكشف عن حصوات الكلى من الأشعة المقطعية'
                      : 'This system uses AI to detect kidney stones from CT scans'}
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                      <span className="text-sm font-medium mb-2">
                        {language === 'ar' ? 'انقر لتحميل صورة الأشعة المقطعية' : 'Click to upload CT scan image'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {language === 'ar' ? 'PNG، JPG، JPEG' : 'PNG, JPG, JPEG'}
                      </span>
                    </label>
                  </div>

                  {previewUrl && (
                    <div className="space-y-4">
                      <div className="rounded-lg overflow-hidden border bg-black">
                        <img
                          src={previewUrl}
                          alt="CT Scan Preview"
                          className="w-full h-auto max-h-96 object-contain"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={handleAnalyze}
                          disabled={isAnalyzing}
                          className="flex-1"
                        >
                          {isAnalyzing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {language === 'ar' ? 'جاري التحليل...' : 'Analyzing...'}
                            </>
                          ) : (
                            <>
                              <Scan className="mr-2 h-4 w-4" />
                              {language === 'ar' ? 'تحليل الصورة' : 'Analyze CT Scan'}
                            </>
                          )}
                        </Button>
                        <Button variant="outline" onClick={handleReset}>
                          {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
                        </Button>
                      </div>
                    </div>
                  )}

                  {result && (
                    <Card className={`border-2 ${hasStone ? 'border-orange-500 bg-orange-500/5' : 'border-green-500 bg-green-500/5'}`}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {hasStone ? (
                            <>
                              <AlertCircle className="h-5 w-5 text-orange-500" />
                              {language === 'ar' ? 'نتيجة التحليل' : 'Analysis Result'}
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                              {language === 'ar' ? 'نتيجة التحليل' : 'Analysis Result'}
                            </>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className={`p-6 rounded-lg text-center ${hasStone ? 'bg-orange-500/10' : 'bg-green-500/10'}`}>
                          <p className="text-sm text-muted-foreground mb-2">
                            {language === 'ar' ? 'التشخيص' : 'Diagnosis'}
                          </p>
                          <p className={`text-3xl font-bold ${hasStone ? 'text-orange-600' : 'text-green-600'}`}>
                            {hasStone 
                              ? (language === 'ar' ? 'حصوة كلوية' : 'Kidney Stone')
                              : (language === 'ar' ? 'طبيعي' : 'Normal')
                            }
                          </p>
                        </div>

                        <Alert className={hasStone ? 'border-orange-500 bg-orange-500/5' : 'border-green-500 bg-green-500/5'}>
                          {hasStone ? (
                            <>
                              <AlertCircle className="h-4 w-4 text-orange-500" />
                              <AlertDescription className="text-orange-700 dark:text-orange-400">
                                {language === 'ar'
                                  ? result.message || 'تم الكشف عن احتمالية وجود حصوة كلوية. يُنصح بإجراء فحوصات إضافية واستشارة طبية متخصصة.'
                                  : result.message || 'Possible kidney stone detected. Further examination and specialized medical consultation recommended.'}
                              </AlertDescription>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                              <AlertDescription className="text-green-700 dark:text-green-400">
                                {language === 'ar'
                                  ? result.message || 'كلية طبيعية - لم يتم الكشف عن حصوات.'
                                  : result.message || 'Normal kidney - No stones detected.'}
                              </AlertDescription>
                            </>
                          )}
                        </Alert>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <Alert>
                  <AlertDescription className="text-sm">
                    {language === 'ar'
                      ? '⚠️ هذا التحليل للأغراض المساعدة فقط ولا يغني عن التشخيص الطبي المتخصص. يجب دائمًا استشارة طبيب مختص.'
                      : '⚠️ This analysis is for assistive purposes only and does not replace professional medical diagnosis. Always consult a qualified physician.'}
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

export default function KidneyAnalysis() {
  return (
    <AuthGuard requiredRole="doctor">
      <KidneyAnalysisContent />
    </AuthGuard>
  );
}
