import OpenAI from 'openai';
import { GeneratePNRequest, GeneratedPN, GeneratePNResponse } from '../types';
import { prisma } from '../server';

class AIService {
  private openai: OpenAI;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }
    
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generatePushNotifications(
    request: GeneratePNRequest,
    userId: string
  ): Promise<GeneratePNResponse> {
    try {
      // Get user's historical data for context
      const userContext = await this.getUserContext(userId);
      
      // Generate push notifications using OpenAI
      const systemPrompt = this.buildSystemPrompt(userContext);
      const userPrompt = this.buildUserPrompt(request);

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const response = completion.choices[0].message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      return this.parseAIResponse(response);
    } catch (error) {
      console.error('Error generating push notifications:', error);
      throw error;
    }
  }

  private async getUserContext(userId: string) {
    // Get user's best performing notifications
    const topNotifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { ctr: 'desc' },
      take: 10,
      select: {
        title: true,
        description: true,
        ctr: true,
        emotion: true,
        urgency: true,
        tone: true,
        brand: true,
        category: true,
      }
    });

    // Get user's analytics
    const analytics = await prisma.analytics.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        topPerformingWords: true,
        topPerformingEmojis: true,
        bestPerformingTone: true,
        bestPerformingLength: true,
        bestPerformingUrgency: true,
        avgCtr: true,
      }
    });

    // Get user preferences
    const preferences = await prisma.userPreferences.findUnique({
      where: { userId },
      select: {
        preferredTone: true,
        preferredLength: true,
        preferredEmojis: true,
        preferredUrgency: true,
      }
    });

    return {
      topNotifications,
      analytics,
      preferences,
    };
  }

  private buildSystemPrompt(userContext: any): string {
    const { topNotifications, analytics, preferences } = userContext;
    
    let systemPrompt = `You are an expert push notification copywriter specialized in creating high-converting mobile push notifications for e-commerce and retail apps.

Your task is to generate 3 push notification variations based on the user's product and offer details.

Guidelines:
1. Keep titles under 50 characters
2. Keep descriptions under 120 characters
3. Use action-oriented language
4. Include emojis strategically
5. Create urgency and FOMO when appropriate
6. Focus on benefits, not just features
7. Use power words that drive action`;

    if (analytics) {
      systemPrompt += `\n\nUSER'S HISTORICAL PERFORMANCE DATA:
- Average CTR: ${analytics.avgCtr}%
- Top performing words: ${analytics.topPerformingWords?.join(', ')}
- Top performing emojis: ${analytics.topPerformingEmojis?.join(', ')}
- Best performing tone: ${analytics.bestPerformingTone}
- Best performing length: ${analytics.bestPerformingLength} characters
- Best performing urgency level: ${analytics.bestPerformingUrgency}`;
    }

    if (preferences) {
      systemPrompt += `\n\nUSER PREFERENCES:
- Preferred tone: ${preferences.preferredTone}
- Preferred length: ${preferences.preferredLength}
- Use emojis: ${preferences.preferredEmojis ? 'Yes' : 'No'}
- Preferred urgency: ${preferences.preferredUrgency}`;
    }

    if (topNotifications && topNotifications.length > 0) {
      systemPrompt += `\n\nTOP PERFORMING NOTIFICATIONS:`;
      topNotifications.forEach((notif, index) => {
        systemPrompt += `\n${index + 1}. "${notif.title}" - "${notif.description}" (CTR: ${notif.ctr}%)`;
      });
    }

    systemPrompt += `\n\nResponse format should be a JSON object with:
{
  "generated": [
    {
      "title": "notification title",
      "description": "notification description",
      "estimatedCTR": number,
      "confidence": number,
      "reasoning": "why this approach should work"
    }
  ],
  "suggestions": ["tip 1", "tip 2", "tip 3"]
}`;

    return systemPrompt;
  }

  private buildUserPrompt(request: GeneratePNRequest): string {
    const { product, offer, discountedPrice, mrp, brand, category, emotion, urgency, tone } = request;
    
    let userPrompt = `Generate 3 push notification variations for:

Product: ${product}
Offer: ${offer}`;

    if (discountedPrice && mrp) {
      userPrompt += `\nPrice: ₹${discountedPrice} (was ₹${mrp})`;
    }

    if (brand) {
      userPrompt += `\nBrand: ${brand}`;
    }

    if (category) {
      userPrompt += `\nCategory: ${category}`;
    }

    if (emotion) {
      userPrompt += `\nDesired emotion: ${emotion}`;
    }

    if (urgency) {
      userPrompt += `\nUrgency level: ${urgency}`;
    }

    if (tone) {
      userPrompt += `\nTone: ${tone}`;
    }

    userPrompt += `\n\nPlease generate 3 different variations with different approaches (e.g., discount-focused, urgency-focused, benefit-focused).`;

    return userPrompt;
  }

  private parseAIResponse(response: string): GeneratePNResponse {
    try {
      const parsed = JSON.parse(response);
      
      // Validate the response structure
      if (!parsed.generated || !Array.isArray(parsed.generated)) {
        throw new Error('Invalid response format');
      }

      return {
        generated: parsed.generated.map((item: any) => ({
          title: item.title,
          description: item.description,
          estimatedCTR: item.estimatedCTR || 0,
          confidence: item.confidence || 0,
          reasoning: item.reasoning || ''
        })),
        suggestions: parsed.suggestions || []
      };
    } catch (error) {
      console.error('Error parsing AI response:', error);
      
      // Fallback parsing if JSON parsing fails
      return {
        generated: [{
          title: 'Limited Time Offer!',
          description: 'Don\'t miss out on this amazing deal',
          estimatedCTR: 2.5,
          confidence: 0.7,
          reasoning: 'Fallback notification due to parsing error'
        }],
        suggestions: ['Try being more specific with your request', 'Consider testing different emotional triggers']
      };
    }
  }

  async learnFromFeedback(
    userId: string,
    notificationId: string,
    rating: number,
    actualCTR?: number
  ): Promise<void> {
    try {
      // Update notification with feedback
      await prisma.notification.update({
        where: { id: notificationId },
        data: {
          rating,
          ctr: actualCTR || undefined
        }
      });

      // Update AI learning data
      await this.updateLearningData(userId, notificationId, rating, actualCTR);
    } catch (error) {
      console.error('Error learning from feedback:', error);
      throw error;
    }
  }

  private async updateLearningData(
    userId: string,
    notificationId: string,
    rating: number,
    actualCTR?: number
  ): Promise<void> {
    // Get the notification details
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
      select: {
        title: true,
        description: true,
        emotion: true,
        urgency: true,
        tone: true,
        brand: true,
        category: true,
        ctr: true,
      }
    });

    if (!notification) return;

    // Update or create learning data
    const learningData = await prisma.aILearningData.upsert({
      where: { userId },
      update: {
        totalDataPoints: { increment: 1 },
        lastTrainingDate: new Date(),
      },
      create: {
        userId,
        successfulPatterns: {},
        failedPatterns: {},
        wordEffectiveness: {},
        emojiEffectiveness: {},
        totalDataPoints: 1,
        lastTrainingDate: new Date(),
      }
    });

    // Here you could implement more sophisticated learning algorithms
    // For now, we'll keep it simple and just track the data
    console.log(`Learning data updated for user ${userId} with rating ${rating}`);
  }
}

export default new AIService();