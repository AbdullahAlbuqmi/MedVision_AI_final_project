import { getLanguage } from './i18n';

interface TranslationCache {
  [key: string]: string;
}

// Check if text is primarily in English (contains mostly English characters)
export function isEnglishText(text: string): boolean {
  if (!text || text.trim().length === 0) return false;
  
  // Remove numbers, punctuation, and whitespace
  const cleanText = text.replace(/[0-9\s.,;:!?'"()\-–—]/g, '');
  
  // Count English letters (A-Z, a-z)
  const englishChars = (cleanText.match(/[A-Za-z]/g) || []).length;
  
  // Count Arabic letters
  const arabicChars = (cleanText.match(/[\u0600-\u06FF]/g) || []).length;
  
  // If more than 70% are English letters, consider it English text
  return englishChars > arabicChars && englishChars / cleanText.length > 0.7;
}

// Get cached translation
function getCachedTranslation(text: string): string | null {
  try {
    const cache = localStorage.getItem('translation_cache');
    if (!cache) return null;
    
    const parsedCache: TranslationCache = JSON.parse(cache);
    return parsedCache[text] || null;
  } catch {
    return null;
  }
}

// Save translation to cache
function saveCachedTranslation(text: string, translation: string) {
  try {
    const cache = localStorage.getItem('translation_cache');
    const parsedCache: TranslationCache = cache ? JSON.parse(cache) : {};
    
    parsedCache[text] = translation;
    
    // Limit cache size to 100 entries
    const entries = Object.entries(parsedCache);
    if (entries.length > 100) {
      const limitedCache = Object.fromEntries(entries.slice(-100));
      localStorage.setItem('translation_cache', JSON.stringify(limitedCache));
    } else {
      localStorage.setItem('translation_cache', JSON.stringify(parsedCache));
    }
  } catch (err) {
    console.error('Failed to cache translation:', err);
  }
}

// Translate text to Arabic using LibreTranslate API
export async function translateToArabic(text: string): Promise<string> {
  const language = getLanguage();
  
  // Only translate if site language is Arabic and text is English
  if (language !== 'ar' || !isEnglishText(text)) {
    return text;
  }
  
  // Check cache first
  const cached = getCachedTranslation(text);
  if (cached) {
    return cached;
  }
  
  try {
    // Using LibreTranslate free API
    const response = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: 'ar',
        format: 'text'
      })
    });
    
    if (!response.ok) {
      console.warn('Translation API failed, returning original text');
      return text;
    }
    
    const data = await response.json();
    const translatedText = data.translatedText || text;
    
    // Cache the translation
    saveCachedTranslation(text, translatedText);
    
    return translatedText;
  } catch (err) {
    console.error('Translation error:', err);
    return text; // Return original text on error
  }
}

// Translate an object with text values
export async function translateObject<T extends Record<string, any>>(obj: T): Promise<T> {
  const language = getLanguage();
  
  // Only translate if site language is Arabic
  if (language !== 'ar') {
    return obj;
  }
  
  const translatedObj: any = { ...obj };
  
  for (const key in translatedObj) {
    const value = translatedObj[key];
    
    if (typeof value === 'string' && isEnglishText(value)) {
      translatedObj[key] = await translateToArabic(value);
    }
  }
  
  return translatedObj as T;
}
