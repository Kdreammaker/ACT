'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FoodSearch from './FoodSearch';
import BeerRecommendation from './BeerRecommendation';
import TPORecommendation from './TPORecommendation';

export default function RecommendPage() {
  const [selectedFood, setSelectedFood] = useState('');
  const [selectedTPO, setSelectedTPO] = useState('');
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendationType, setRecommendationType] = useState<'food' | 'tpo'>('food');
  const searchParams = useSearchParams();

  useEffect(() => {
    const food = searchParams.get('food');
    const tpo = searchParams.get('tpo');
    
    if (food) {
      setSelectedFood(food);
      setRecommendationType('food');
      setShowRecommendation(true);
    } else if (tpo) {
      setSelectedTPO(tpo);
      setRecommendationType('tpo');
      setShowRecommendation(true);
    }
  }, [searchParams]);

  const handleFoodSelect = (food: string) => {
    setSelectedFood(food);
    setRecommendationType('food');
    setShowRecommendation(true);
  };

  const handleTPOSelect = (tpo: string) => {
    setSelectedTPO(tpo);
    setRecommendationType('tpo');
    setShowRecommendation(true);
  };

  const handleBackToSearch = () => {
    setShowRecommendation(false);
    setSelectedFood('');
    setSelectedTPO('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        {!showRecommendation ? (
          <FoodSearch onFoodSelect={handleFoodSelect} />
        ) : recommendationType === 'food' ? (
          <BeerRecommendation 
            food={selectedFood} 
            onBack={handleBackToSearch}
          />
        ) : (
          <TPORecommendation 
            tpo={selectedTPO} 
            onBack={handleBackToSearch}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}