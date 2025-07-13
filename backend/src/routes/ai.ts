import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth';
import { AuthenticatedRequest, GeneratePNRequest, APIResponse, GeneratePNResponse } from '../types';
import aiService from '../services/aiService';

const router = Router();

// Generate push notifications
router.post('/generate', authenticateToken, [
  body('product').notEmpty().withMessage('Product is required'),
  body('offer').notEmpty().withMessage('Offer is required'),
  body('discountedPrice').optional().isNumeric().withMessage('Discounted price must be a number'),
  body('mrp').optional().isNumeric().withMessage('MRP must be a number'),
  body('brand').optional().isString().withMessage('Brand must be a string'),
  body('category').optional().isString().withMessage('Category must be a string'),
  body('emotion').optional().isString().withMessage('Emotion must be a string'),
  body('urgency').optional().isString().withMessage('Urgency must be a string'),
  body('tone').optional().isString().withMessage('Tone must be a string'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errors.array()
      });
    }

    const userId = req.user!.id;
    const requestData: GeneratePNRequest = req.body;

    // Generate push notifications using AI service
    const result = await aiService.generatePushNotifications(requestData, userId);

    const response: APIResponse<GeneratePNResponse> = {
      success: true,
      data: result,
      message: 'Push notifications generated successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate push notifications'
    });
  }
});

// Provide feedback on generated notifications
router.post('/feedback', authenticateToken, [
  body('notificationId').notEmpty().withMessage('Notification ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('actualCTR').optional().isNumeric().withMessage('CTR must be a number'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errors.array()
      });
    }

    const userId = req.user!.id;
    const { notificationId, rating, actualCTR } = req.body;

    // Process feedback through AI service
    await aiService.learnFromFeedback(userId, notificationId, rating, actualCTR);

    const response: APIResponse = {
      success: true,
      message: 'Feedback received and processed successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Feedback processing error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process feedback'
    });
  }
});

// Get AI learning insights
router.get('/insights', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    // This would typically involve more complex analytics
    // For now, we'll return basic insights
    const response: APIResponse = {
      success: true,
      data: {
        message: 'AI insights endpoint - to be implemented',
        userId
      }
    };

    res.json(response);
  } catch (error) {
    console.error('AI insights error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve AI insights'
    });
  }
});

export default router;