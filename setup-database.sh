#!/bin/bash

echo "🚀 S4S Database Setup Script"
echo "=============================="

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local with your database configuration:"
    echo ""
    echo "DATABASE_URL=\"postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres\""
    echo "NEXTAUTH_SECRET=\"your-super-secret-key-here\""
    echo "NEXTAUTH_URL=\"http://localhost:3000\""
    echo ""
    echo "See DATABASE_SETUP.md for detailed instructions."
    exit 1
fi

echo "✅ .env.local found"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
else
    echo "✅ Dependencies already installed"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
pnpm db:generate

# Push schema to database
echo "🗄️  Pushing database schema..."
pnpm db:push

echo ""
echo "🎉 Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Start the development server: pnpm dev"
echo "2. Visit http://localhost:3000/auth/signup to test"
echo "3. Open Prisma Studio: pnpm db:studio"
echo ""
echo "For help, see DATABASE_SETUP.md" 