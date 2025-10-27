import { useState } from 'react';
import { Upload, Brain, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthGuard } from '@/components/AuthGuard';
import { BackLink } from '@/components/BackLink';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getLanguage, t, type Language } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';

function BrainAnalysisContent() {
  const [language] = useState<Language>(getLanguage());
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    prediction: string;
    confidence: string;
    all_predictions?: Record<string, string>;
  } | null>(null);
  const { toast } = useToast();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'الرجاء اختيار صورة أولاً' : 'Please select an image first',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await fetch('https://brain-mri-2z8c.onrender.com/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setResult(data);
      
      toast({
        title: language === 'ar' ? 'تم التحليل بنجاح' : 'Analysis Complete',
        description: language === 'ar' ? 'تم تحليل الصورة بنجاح' : 'Image analyzed successfully',
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: language === 'ar' ? 'خطأ في التحليل' : 'Analysis Error',
        description: language === 'ar' ? 'حدث خطأ أثناء تحليل الصورة' : 'An error occurred during analysis',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getResultColor = (prediction: string) => {
    if (prediction === 'No Tumor') return 'text-green-600 dark:text-green-400';
    if (prediction === 'Glioma') return 'text-red-600 dark:text-red-400';
    if (prediction === 'Meningioma') return 'text-orange-600 dark:text-orange-400';
    if (prediction === 'Pituitary') return 'text-yellow-600 dark:text-yellow-400';
    return 'text-foreground';
  };

  const getResultIcon = (prediction: string) => {
    if (prediction === 'No Tumor') return <CheckCircle2 className="h-6 w-6" />;
    return <AlertCircle className="h-6 w-6" />;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container px-4 py-8">
          <BackLink />
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{t('brainAnalysis', language)}</h1>
                <p className="text-muted-foreground">{t('brainAnalysisDesc', language)}</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'رفع الصورة' : 'Upload Image'}</CardTitle>
                  <CardDescription>
                    {language === 'ar' 
                      ? 'اختر صورة الرنين المغناطيسي للدماغ للتحليل'
                      : 'Select a brain MRI image for analysis'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition-colors hover:border-primary/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex cursor-pointer flex-col items-center gap-2 text-center"
                    >
                      <Upload className="h-12 w-12 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {language === 'ar' ? 'انقر لرفع الصورة' : 'Click to upload image'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {language === 'ar' ? 'PNG، JPG، JPEG' : 'PNG, JPG, JPEG'}
                      </span>
                    </label>
                  </div>

                  {previewUrl && (
                    <div className="space-y-4">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full rounded-lg border"
                      />
                      <Button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="w-full"
                        size="lg"
                      >
                        {isAnalyzing
                          ? language === 'ar' ? 'جاري التحليل...' : 'Analyzing...'
                          : language === 'ar' ? 'تحليل الصورة' : 'Analyze Image'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'نتائج التحليل' : 'Analysis Results'}</CardTitle>
                  <CardDescription>
                    {language === 'ar'
                      ? 'نتائج تحليل الذكاء الاصطناعي'
                      : 'AI analysis results'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!result ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Brain className="mb-4 h-16 w-16 text-muted-foreground/50" />
                      <p className="text-muted-foreground">
                        {language === 'ar'
                          ? 'قم برفع صورة للحصول على النتائج'
                          : 'Upload an image to see results'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className={`flex items-center gap-3 ${getResultColor(result.prediction)}`}>
                        {getResultIcon(result.prediction)}
                        <div>
                          <p className="text-sm font-medium">
                            {language === 'ar' ? 'التشخيص' : 'Diagnosis'}
                          </p>
                          <p className="text-2xl font-bold">
                            {result.prediction}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-sm font-medium text-muted-foreground">
                          {language === 'ar' ? 'مستوى الثقة' : 'Confidence Level'}
                        </p>
                        <p className="text-xl font-semibold">{result.confidence}</p>
                      </div>

                      {result.all_predictions && (
                        <div>
                          <p className="mb-3 text-sm font-medium text-muted-foreground">
                            {language === 'ar' ? 'جميع التوقعات' : 'All Predictions'}
                          </p>
                          <div className="space-y-2">
                            {Object.entries(result.all_predictions).map(([label, conf]) => (
                              <div key={label} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                                <span className="text-sm font-medium">
                                  {label}
                                </span>
                                <span className="text-sm font-semibold">{conf}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-xs">
                          {language === 'ar'
                            ? 'هذه النتائج للإشارة فقط ولا تحل محل التشخيص الطبي المهني'
                            : 'These results are for reference only and do not replace professional medical diagnosis'}
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BrainAnalysis() {
  return (
    <AuthGuard requiredRole="doctor">
      <BrainAnalysisContent />
    </AuthGuard>
  );
}
