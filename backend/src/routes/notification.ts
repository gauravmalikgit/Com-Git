import { Router, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { AuthenticatedRequest, APIResponse } from '../types';

const router = Router();

// Get notifications
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const response: APIResponse = {
      success: true,
      data: [],
      message: 'Notifications endpoint - to be implemented'
    };

    res.json(response);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;