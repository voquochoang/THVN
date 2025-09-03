import React, { useState, useMemo, useCallback, useEffect } from 'react';
import type { Theme, GenerationResults } from './types';
import { THEME_CATEGORIES } from './constants';
import { generateImage } from './services/geminiService';

import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ThemeSelector from './components/ThemeSelector';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';

type Gender = 'Male' | 'Female' | 'Unspecified' | null;

const App: React.FC = () => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [selectedThemes, setSelectedThemes] = useState<Theme[]>([]);
    const [generationResults, setGenerationResults] = useState<GenerationResults>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [detectedGender, setDetectedGender] = useState<Gender>(null);
    const [visitCount, setVisitCount] = useState<number | null>(null);

    useEffect(() => {
        let currentCount = localStorage.getItem('visitCount');
        let newCount: number;

        if (currentCount) {
            newCount = parseInt(currentCount, 10) + 1;
        } else {
            // Start the count at 1 for new visitors for accuracy.
            newCount = 1;
        }

        localStorage.setItem('visitCount', newCount.toString());
        setVisitCount(newCount);
    }, []); // Empty dependency array ensures this runs only once on mount

    const uploadedImagePreview = useMemo(() => {
        if (uploadedFile) {
            return URL.createObjectURL(uploadedFile);
        }
        return null;
    }, [uploadedFile]);
    
    const handleReset = useCallback(() => {
        setUploadedFile(null);
        setSelectedThemes([]);
        setGenerationResults({});
        setError(null);
        setIsLoading(false);
        setDetectedGender(null);
        if (uploadedImagePreview) {
            URL.revokeObjectURL(uploadedImagePreview);
        }
    }, [uploadedImagePreview]);

    const handleImageUpload = (file: File) => {
        if (isLoading) return;
        handleReset();
        setUploadedFile(file);
    };
    
    const handleToggleTheme = (theme: Theme) => {
        setSelectedThemes(prev => {
            const isSelected = prev.some(t => t.id === theme.id);
            if (isSelected) {
                return prev.filter(t => t.id !== theme.id);
            }
            if (prev.length < 6) {
                return [...prev, theme];
            }
            return prev;
        });
    };

    const handleGenerate = async () => {
        if (!uploadedFile || selectedThemes.length === 0 || detectedGender === null) {
            setError('Vui lòng tải ảnh, chọn giới tính và chọn ít nhất một chủ đề.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGenerationResults(
            selectedThemes.reduce((acc, theme) => {
                acc[theme.id] = { status: 'loading', themeName: theme.name };
                return acc;
            }, {} as GenerationResults)
        );

        const generationPromises = selectedThemes.map(theme => {
            let finalPrompt = theme.prompt;
            
            if (theme.id === 'trung-thu-2025-hoa-than-chi-hang-chu-cuoi') {
                let characterInstruction = '';
                switch (detectedGender) {
                    case 'Male':
                        characterInstruction = " Transform the person in the photo into the legendary character 'Chú Cuội'. He is the main character of the scene. The beautiful goddess 'Chị Hằng' should also be present in the background or as a secondary character, completing the festive atmosphere.";
                        break;
                    case 'Female':
                        characterInstruction = " Transform the person in the photo into the beautiful goddess 'Chị Hằng'. She is the main character of the scene. The legendary character 'Chú Cuội' should also be present in the background or as a secondary character, completing the festive atmosphere.";
                        break;
                    case 'Unspecified':
                        characterInstruction = " In the uploaded photo, transform the male individual into the legendary character 'Chú Cuội' and the female individual into the beautiful goddess 'Chị Hằng'. Both should be depicted as the main characters, interacting joyfully together.";
                        break;
                }
                finalPrompt += characterInstruction;
            } else {
                let instruction = "";
                if (detectedGender === 'Male') {
                    instruction = " Re-imagine the person as a male character.";
                } else if (detectedGender === 'Female') {
                    instruction = " Re-imagine the person as a female character.";
                }
                instruction += " The character's clothing MUST be appropriate for the specific theme. Do NOT use an 'áo dài' unless the theme explicitly involves cultural events, tradition, or festivals. For example, for sports themes, provide athletic attire; for science themes, provide modern or futuristic clothing.";
                finalPrompt += instruction;
            }

            return generateImage(uploadedFile, finalPrompt)
                .then(imageUrl => ({ id: theme.id, status: 'done' as const, imageUrl, themeName: theme.name }))
                .catch(e => ({ id: theme.id, status: 'error' as const, error: e.message || 'Lỗi không xác định', themeName: theme.name }))
        });

        for (const promise of generationPromises) {
            promise.then(result => {
                setGenerationResults(prev => ({
                    ...prev,
                    [result.id]: {
                        status: result.status,
                        themeName: result.themeName,
                        imageUrl: result.status === 'done' ? result.imageUrl : undefined,
                        error: result.status === 'error' ? result.error : undefined,
                    },
                }));
            });
        }
        
        await Promise.allSettled(generationPromises);
        setIsLoading(false);
    };
    
    const isReadyToGenerate = uploadedFile && selectedThemes.length > 0 && detectedGender !== null;

    const GenderButton: React.FC<{
        label: string;
        value: Gender;
    }> = ({ label, value }) => (
        <button
            onClick={() => setDetectedGender(value)}
            className={`
                px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 border-2
                ${detectedGender === value 
                    ? 'bg-yellow-400 border-yellow-500 text-black shadow-lg scale-105' 
                    : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'}
            `}
        >
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
            {isLoading && <Loader />}
            <Header />

            <main className="max-w-7xl mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    
                    {/* Left Column: Controls */}
                    <div className="flex flex-col gap-8 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 lg:sticky lg:top-8">
                        <ImageUploader 
                            onImageUpload={handleImageUpload} 
                            imagePreviewUrl={uploadedImagePreview}
                        />

                        {uploadedFile && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold mb-4 text-center text-red-700 dark:text-red-500">Bước 1.5: Chọn giới tính</h2>
                                <div className="flex justify-center gap-4">
                                    <GenderButton label="Nam" value="Male" />
                                    <GenderButton label="Nữ" value="Female" />
                                    <GenderButton label="Khác" value="Unspecified" />
                                </div>
                            </div>
                        )}
                        
                        <ThemeSelector 
                            categories={THEME_CATEGORIES} 
                            selectedThemes={selectedThemes} 
                            onToggleTheme={handleToggleTheme} 
                            disabled={!uploadedFile}
                        />

                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md dark:bg-red-900/50 dark:text-red-300 dark:border-red-600" role="alert">
                                <p className="font-bold">Lỗi</p>
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="mt-4">
                            <button
                                onClick={handleGenerate}
                                disabled={!isReadyToGenerate || isLoading}
                                className="w-full bg-red-600 text-white font-bold py-4 px-4 rounded-lg text-lg
                                           hover:bg-red-700 transition-all duration-300
                                           disabled:bg-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-600
                                           flex items-center justify-center shadow-lg transform hover:scale-105 disabled:scale-100"
                            >
                                {isLoading ? 'Đang xử lý...' : `Tạo ${selectedThemes.length > 0 ? selectedThemes.length : ''} ảnh`}
                            </button>
                        </div>
                    </div>
                    
                    {/* Right Column: Results */}
                    <div className="mt-8 lg:mt-0">
                         <ResultDisplay 
                            generationResults={generationResults}
                            onReset={handleReset} 
                         />
                    </div>
                </div>

                <footer className="text-center mt-12 py-4 text-gray-500 dark:text-gray-400 text-sm">
                    <div className="max-w-md mx-auto bg-amber-50 dark:bg-amber-900/30 border-2 border-amber-400 dark:border-amber-600 rounded-xl p-6 shadow-lg mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 0h10.5c.621 0 1.125-.504 1.125-1.125v-6.75c0-.621-.504-1.125-1.125-1.125H6.375c-.621 0-1.125.504-1.125 1.125v6.75c0 .621.504 1.125 1.125 1.125z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 10.5V6.375c0-1.036-.84-1.875-1.875-1.875h-3.75c-1.036 0-1.875.84-1.875 1.875V10.5m0 0v5.625" />
                        </svg>
                        <p className="mt-4 font-bold text-lg text-amber-800 dark:text-amber-200">Nếu bạn thấy App hữu ích, hãy ủng hộ tác giả một ly cà phê nhé.</p>
                        <div className="mt-4 space-y-2 text-base">
                            <p>
                                <strong>Momo:</strong>
                                <span className="ml-2 font-mono bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md text-gray-800 dark:text-gray-200">0949435512</span>
                            </p>
                            <p>
                                <strong>Liên hệ công việc Zalo:</strong>
                                <span className="ml-2 font-mono bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md text-gray-800 dark:text-gray-200">0949435512</span>
                            </p>
                        </div>
                    </div>
                    
                    <div className="space-y-4 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <div>
                            <p>Được tạo bởi AI của Google. Tự hào Việt Nam V2.</p>
                            <p className="mt-2">
                                Phát triển bởi <strong>Võ Quốc Hoàng</strong> - 
                                <a 
                                    href="https://www.facebook.com/voquochoang82" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 font-semibold transition-colors"
                                >
                                    {' '}Facebook
                                </a>
                            </p>
                        </div>
                        {visitCount !== null && (
                            <div>
                                <p className="flex items-center justify-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Lượt truy cập: {visitCount.toLocaleString('vi-VN')}</span>
                                </p>
                            </div>
                        )}
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default App;