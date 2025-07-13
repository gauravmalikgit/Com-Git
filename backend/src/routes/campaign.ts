import { Router, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { AuthenticatedRequest, APIResponse } from '../types';

const router = Router();

// Get campaigns
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const response: APIResponse = {
      success: true,
      data: [],
      message: 'Campaigns endpoint - to be implemented'
    };

    res.json(response);
  } catch (error) {
    console.error('Get campaigns error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;