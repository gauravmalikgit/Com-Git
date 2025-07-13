#!/bin/bash

# AI-Powered Push Notification Generator - Setup Script
# This script helps you set up the development environment quickly

echo "🚀 Setting up AI-Powered Push Notification Generator..."
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2)
if [ "$(printf '%s\n' "18.0.0" "$NODE_VERSION" | sort -V | head -n1)" != "18.0.0" ]; then
    echo "❌ Node.js version $NODE_VERSION is not supported. Please install Node.js v18 or higher."
    exit 1
fi

echo "✅ Node.js version: $NODE_VERSION"

# Check if PostgreSQL is available
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed or not in PATH."
    echo "Please install PostgreSQL and ensure it's running."
    echo "Visit: https://www.postgresql.org/download/"
fi

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
echo "------------------------"

cd backend

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your configuration:"
    echo "   - DATABASE_URL: Your PostgreSQL connection string"
    echo "   - JWT_SECRET: A secure secret key"
    echo "   - OPENAI_API_KEY: Your OpenAI API key"
    echo ""
    echo "Example DATABASE_URL: postgresql://username:password@localhost:5432/pn_generator"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

echo "✅ Backend setup complete!"

# Setup Frontend
echo ""
echo "🎨 Setting up Frontend..."
echo "-------------------------"

cd ../frontend

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

echo "✅ Frontend setup complete!"

# Final instructions
echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Configure your backend/.env file with:"
echo "   - DATABASE_URL (PostgreSQL connection string)"
echo "   - JWT_SECRET (secure random string)"
echo "   - OPENAI_API_KEY (your OpenAI API key)"
echo ""
echo "2. Run database migrations:"
echo "   cd backend && npx prisma migrate dev"
echo ""
echo "3. Start the backend server:"
echo "   cd backend && npm run dev"
echo ""
echo "4. In a new terminal, start the frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "5. Access the application:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:3001"
echo "   - Health Check: http://localhost:3001/health"
echo ""
echo "📚 For detailed setup instructions, see README.md"
echo ""
echo "🆘 Need help? Check the documentation or create an issue."

# Return to root directory
cd ..

echo ""
echo "Happy coding! 🚀"