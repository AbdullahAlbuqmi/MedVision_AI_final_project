import { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthGuard } from '@/components/AuthGuard';
import { BackLink } from '@/components/BackLink';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { getLanguage, t } from '@/lib/i18n';

const API_URL = 'https://skin-sp3o.onrender.com/predict';

interface PredictionResult {
  prediction: string;
  confidence: string;
  all_predictions: Record<string, string>;
}

function DermatologyContent() {
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
        description: language === 'ar' ? 'تم تحليل الصورة بنجاح' : 'Image analyzed successfully',
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'فشل تحليل الصورة. يرجى المحاولة مرة أخرى.' : 'Failed to analyze image. Please try again.',
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container px-4 py-8">
          <BackLink to="/doctor" labelKey="backDashboard" className="mb-6" />

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {language === 'ar' ? 'تحليل الأمراض الجلدية بالذكاء الاصطناعي' : 'Dermatology AI Analysis'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'قم بتحميل صورة للجلد للحصول على تحليل تلقائي للأمراض الجلدية المحتملة'
                    : 'Upload a skin image to get AI-powered analysis for potential skin conditions'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertDescription>
                    {language === 'ar'
                      ? 'يدعم النظام: حب الشباب، الأكزيما، التقرن الشعري، الصدفية، الثآليل'
                      : 'Supports: Acne, Eczema, Keratosis Pilaris, Psoriasis, Warts'}
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                      <span className="text-sm font-medium mb-2">
                        {language === 'ar' ? 'انقر لتحميل صورة' : 'Click to upload image'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {language === 'ar' ? 'PNG، JPG، JPEG' : 'PNG, JPG, JPEG'}
                      </span>
                    </label>
                  </div>

                  {previewUrl && (
                    <div className="space-y-4">
                      <div className="rounded-lg overflow-hidden border">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-auto max-h-96 object-contain bg-muted"
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
                            language === 'ar' ? 'تحليل الصورة' : 'Analyze Image'
                          )}
                        </Button>
                        <Button variant="outline" onClick={handleReset}>
                          {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
                        </Button>
                      </div>
                    </div>
                  )}

                  {result && (
                    <Card className="border-primary/20 bg-primary/5">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {language === 'ar' ? 'نتائج التحليل' : 'Analysis Results'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-background rounded-lg border-2 border-primary">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">
                              {language === 'ar' ? 'التشخيص الأكثر احتمالاً' : 'Most Likely Diagnosis'}
                            </p>
                            <p className="text-xl font-bold">{result.prediction}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground mb-1">
                              {language === 'ar' ? 'مستوى الثقة' : 'Confidence'}
                            </p>
                            <p className="text-2xl font-bold text-primary">{result.confidence}</p>
                          </div>
                        </div>

                        <div>
                          <p className="font-medium mb-3">
                            {language === 'ar' ? 'جميع الاحتمالات' : 'All Predictions'}
                          </p>
                          <div className="space-y-2">
                            {Object.entries(result.all_predictions).map(([condition, confidence]) => (
                              <div key={condition} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                                <span className="font-medium">{condition}</span>
                                <span className="text-muted-foreground">{confidence}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Alert>
                          <AlertDescription className="text-sm">
                            {language === 'ar'
                              ? '⚠️ هذا التحليل للأغراض التعليمية فقط ولا يغني عن الاستشارة الطبية المتخصصة'
                              : '⚠️ This analysis is for educational purposes only and does not replace professional medical consultation'}
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Dermatology() {
  return (
    <AuthGuard requiredRole="doctor">
      <DermatologyContent />
    </AuthGuard>
  );
}
