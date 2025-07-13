'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const pnGeneratorSchema = z.object({
  product: z.string().min(1, 'Product is required'),
  offer: z.string().min(1, 'Offer is required'),
  discountedPrice: z.number().min(0, 'Price must be positive').optional(),
  mrp: z.number().min(0, 'MRP must be positive').optional(),
  brand: z.string().optional(),
  category: z.string().optional(),
  emotion: z.string().optional(),
  urgency: z.string().optional(),
  tone: z.string().optional(),
});

type PNGeneratorFormData = z.infer<typeof pnGeneratorSchema>;

interface GeneratedPN {
  title: string;
  description: string;
  estimatedCTR: number;
  confidence: number;
  reasoning: string;
}

export function PNGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPNs, setGeneratedPNs] = useState<GeneratedPN[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PNGeneratorFormData>({
    resolver: zodResolver(pnGeneratorSchema),
  });

  const onSubmit = async (data: PNGeneratorFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      setGeneratedPNs([]);
      setSuggestions([]);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to continue');
      }

      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate push notifications');
      }

      setGeneratedPNs(result.data.generated);
      setSuggestions(result.data.suggestions);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate push notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (pnIndex: number, rating: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // In a real app, you'd store the notification ID when it's generated
      const notificationId = `temp-${Date.now()}-${pnIndex}`;

      await fetch('/api/ai/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          notificationId,
          rating,
        }),
      });

      // You could show a toast notification here
      console.log(`Feedback submitted: ${rating} stars`);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product */}
          <div className="space-y-2">
            <label htmlFor="product" className="text-sm font-medium text-gray-700">
              Product <span className="text-red-500">*</span>
            </label>
            <Input
              id="product"
              placeholder="e.g., Organic Coconut Oil"
              {...register('product')}
              className={cn(errors.product && 'border-red-500')}
            />
            {errors.product && (
              <p className="text-sm text-red-500">{errors.product.message}</p>
            )}
          </div>

          {/* Offer */}
          <div className="space-y-2">
            <label htmlFor="offer" className="text-sm font-medium text-gray-700">
              Offer <span className="text-red-500">*</span>
            </label>
            <Input
              id="offer"
              placeholder="e.g., 30% OFF + Free Shipping"
              {...register('offer')}
              className={cn(errors.offer && 'border-red-500')}
            />
            {errors.offer && (
              <p className="text-sm text-red-500">{errors.offer.message}</p>
            )}
          </div>

          {/* Discounted Price */}
          <div className="space-y-2">
            <label htmlFor="discountedPrice" className="text-sm font-medium text-gray-700">
              Discounted Price (₹)
            </label>
            <Input
              id="discountedPrice"
              type="number"
              step="0.01"
              placeholder="299"
              {...register('discountedPrice', { valueAsNumber: true })}
              className={cn(errors.discountedPrice && 'border-red-500')}
            />
            {errors.discountedPrice && (
              <p className="text-sm text-red-500">{errors.discountedPrice.message}</p>
            )}
          </div>

          {/* MRP */}
          <div className="space-y-2">
            <label htmlFor="mrp" className="text-sm font-medium text-gray-700">
              MRP (₹)
            </label>
            <Input
              id="mrp"
              type="number"
              step="0.01"
              placeholder="499"
              {...register('mrp', { valueAsNumber: true })}
              className={cn(errors.mrp && 'border-red-500')}
            />
            {errors.mrp && (
              <p className="text-sm text-red-500">{errors.mrp.message}</p>
            )}
          </div>

          {/* Brand */}
          <div className="space-y-2">
            <label htmlFor="brand" className="text-sm font-medium text-gray-700">
              Brand
            </label>
            <Input
              id="brand"
              placeholder="e.g., Organic Valley"
              {...register('brand')}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category
            </label>
            <Input
              id="category"
              placeholder="e.g., Health & Wellness"
              {...register('category')}
            />
          </div>

          {/* Emotion */}
          <div className="space-y-2">
            <label htmlFor="emotion" className="text-sm font-medium text-gray-700">
              Emotion to Trigger
            </label>
            <select
              id="emotion"
              {...register('emotion')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select emotion</option>
              <option value="FOMO">FOMO (Fear of Missing Out)</option>
              <option value="urgency">Urgency</option>
              <option value="excitement">Excitement</option>
              <option value="curiosity">Curiosity</option>
              <option value="savings">Savings</option>
            </select>
          </div>

          {/* Tone */}
          <div className="space-y-2">
            <label htmlFor="tone" className="text-sm font-medium text-gray-700">
              Tone
            </label>
            <select
              id="tone"
              {...register('tone')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select tone</option>
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
              <option value="playful">Playful</option>
              <option value="urgent">Urgent</option>
              <option value="conversational">Conversational</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Generating...' : 'Generate Push Notifications'}
        </Button>
      </form>

      {/* Generated Results */}
      {generatedPNs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Generated Push Notifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedPNs.map((pn, index) => (
              <Card key={index} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Variation {index + 1}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-500">CTR:</span>
                      <span className="text-sm font-medium text-blue-600">
                        {pn.estimatedCTR.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-1">Title</h4>
                      <p className="text-sm text-blue-800">{pn.title}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-1">Description</h4>
                      <p className="text-sm text-green-800">{pn.description}</p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600">
                    <p><strong>Confidence:</strong> {(pn.confidence * 100).toFixed(1)}%</p>
                    <p><strong>Reasoning:</strong> {pn.reasoning}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm text-gray-600">Rate this:</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => handleFeedback(index, rating)}
                          className="text-gray-400 hover:text-yellow-400 transition-colors"
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-sm text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}