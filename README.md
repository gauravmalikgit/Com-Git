# AI-Powered Push Notification Generator

A full-stack web application that generates high-converting push notifications using AI. The app learns from user data to provide personalized, context-aware push notification recommendations.

## 🚀 Features

### 👥 User Authentication
- **Secure Registration & Login**: Email and password authentication with JWT tokens
- **User Data Isolation**: Each user has their own secure data space
- **Session Management**: Persistent authentication with token validation

### 📁 Data Upload & Training
- **File Upload**: Support for CSV/Excel files containing past campaign data
- **Data Processing**: Automatic parsing and validation of campaign data
- **EDA Analytics**: Exploratory data analysis showing top performing keywords, offers, CTR patterns

### 🧠 AI-Powered Generation
- **Personalized Learning**: AI model adapts to each user's historical performance data
- **Context-Aware**: Uses past successful patterns to generate relevant notifications
- **Multi-Variant Generation**: Creates 2-3 different notification variations
- **Performance Prediction**: Estimates CTR based on historical patterns

### 💬 Intuitive Interface
- **Chatbot-style Form**: Easy-to-use form for input parameters
- **Real-time Generation**: Fast AI-powered notification generation
- **Feedback System**: Rate generated notifications to improve future suggestions
- **Performance Insights**: View estimated CTR and reasoning behind each suggestion

### 📊 Analytics Dashboard
- **Performance Tracking**: Monitor CTR, revenue, and engagement metrics
- **Trend Analysis**: View historical performance trends
- **Learning Insights**: Understand what works best for your audience

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for modern styling
- **Shadcn/ui** components for beautiful UI
- **React Hook Form** with Zod validation
- **Recharts** for data visualization

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **PostgreSQL** with Prisma ORM
- **JWT** for authentication
- **OpenAI GPT-4** for AI generation
- **bcryptjs** for password hashing
- **Multer** for file uploads

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- OpenAI API key

### 1. Clone the Repository
```bash
git clone <repository-url>
cd pn-generator
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Edit .env with your configuration:
# - DATABASE_URL: Your PostgreSQL connection string
# - JWT_SECRET: A secure secret key for JWT tokens
# - OPENAI_API_KEY: Your OpenAI API key
# - Other configuration as needed

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start the backend server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Backend Health Check: http://localhost:3001/health

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/pn_generator"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# OpenAI
OPENAI_API_KEY="your-openai-api-key-here"

# Server
PORT=3001
NODE_ENV="development"

# CORS
FRONTEND_URL="http://localhost:3000"

# File Upload
MAX_FILE_SIZE=5000000  # 5MB
UPLOAD_DIR="uploads"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX=100
```

## 🎯 Usage

### 1. User Registration
1. Visit the homepage
2. Click "Sign Up" to create a new account
3. Provide name, email, and password
4. You'll be automatically logged in and redirected to the dashboard

### 2. Upload Campaign Data
1. Go to the "Upload Data" tab
2. Upload your CSV/Excel file with columns like:
   - Title, Description, CTR, Revenue, Sent, Campaign Name, Offer, Brand, Category
3. The system will process your data and extract learning patterns

### 3. Generate Push Notifications
1. Go to the "Generate PN" tab
2. Fill in the form with:
   - **Product**: The product you're promoting
   - **Offer**: The discount or offer details
   - **Pricing**: Discounted price and MRP
   - **Brand & Category**: Optional brand and category information
   - **Emotion & Tone**: Desired emotional trigger and tone
3. Click "Generate Push Notifications"
4. Review the generated variations with estimated CTR
5. Rate the suggestions to improve future recommendations

### 4. View Analytics
1. Go to the "Analytics" tab
2. View your performance metrics:
   - Average CTR
   - Total Revenue
   - Number of Campaigns
   - Performance trends

## 🔮 AI Learning Features

### Per-User Adaptation
- **Historical Analysis**: The AI analyzes your past campaign performance
- **Pattern Recognition**: Identifies successful words, emojis, tones, and structures
- **Personalized Recommendations**: Generates notifications based on your specific audience

### Context-Aware Generation
- **Similarity Matching**: Uses vector similarity to find comparable past campaigns
- **Few-Shot Learning**: Provides examples of your best-performing notifications to the AI
- **Dynamic Prompting**: Adjusts prompts based on your preferences and performance data

### Continuous Learning
- **Feedback Loop**: User ratings improve future suggestions
- **Performance Tracking**: Actual CTR data enhances prediction accuracy
- **Preference Learning**: Adapts to user-specific tone and style preferences

## 🏗️ Architecture

### Database Schema
- **Users**: User accounts and authentication
- **Campaigns**: File uploads and campaign data
- **Notifications**: Push notification content and performance metrics
- **Analytics**: Aggregated performance data
- **AI Learning Data**: ML patterns and user-specific insights
- **User Preferences**: Personalization settings

### API Endpoints
- **Authentication**: `/api/auth/*` - Login, register, logout
- **Users**: `/api/users/*` - User profile and preferences
- **Campaigns**: `/api/campaigns/*` - Campaign management
- **Notifications**: `/api/notifications/*` - PN history and management
- **Analytics**: `/api/analytics/*` - Performance metrics
- **AI**: `/api/ai/*` - Generation and feedback

## 🚀 Production Deployment

### Backend Deployment
1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Deploy to your preferred platform (Vercel, Heroku, AWS, etc.)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred platform
3. Configure API endpoint URLs

### Security Considerations
- Use strong JWT secrets
- Enable HTTPS in production
- Implement rate limiting
- Validate all inputs
- Use environment variables for sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the documentation
2. Look for existing issues
3. Create a new issue with detailed information

## 🎉 Acknowledgments

- OpenAI for GPT-4 API
- Shadcn/ui for beautiful components
- Prisma for database management
- Next.js team for the excellent framework