# Database Setup Guide for S4S Platform

## 🆓 Free Database Options

### 1. **Supabase (Recommended)**

- **Free tier**: 500MB database, 50MB file storage, 2GB bandwidth
- **Perfect for**: Startups and small to medium projects
- **Pros**: Built-in auth, real-time features, great dashboard, PostgreSQL
- **Cons**: Limited bandwidth on free tier

### 2. **Railway**

- **Free tier**: $5 credit monthly (enough for small projects)
- **Pros**: Easy deployment, good performance
- **Cons**: Requires credit card for verification

### 3. **Neon**

- **Free tier**: 3GB storage, 10GB bandwidth
- **Pros**: Serverless PostgreSQL, branching
- **Cons**: Newer platform

### 4. **PlanetScale**

- **Free tier**: 1GB storage, 1 billion reads/month
- **Pros**: MySQL-based, great performance
- **Cons**: MySQL (we'd need to adjust schema slightly)

---

## 🚀 Supabase Setup (Recommended)

### Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub or email
4. Create a new organization

### Step 2: Create Database Project

1. Click "New Project"
2. Choose your organization
3. Fill in project details:
   - **Name**: `s4s-platform`
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click "Create new project"

### Step 3: Get Database Connection String

1. Go to **Settings** → **Database**
2. Copy the **Connection string** (URI format)
3. It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### Step 4: Set Up Environment Variables

Create a `.env.local` file in your project root:

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_SECRET="your-super-secret-key-here-make-it-long-and-random"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (Optional - for Google Sign In)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Supabase (Optional - for additional features)
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### Step 5: Generate Prisma Client

```bash
# Install dependencies if you haven't already
pnpm install

# Generate Prisma client
pnpm db:generate
```

### Step 6: Push Database Schema

```bash
# Push the schema to your Supabase database
pnpm db:push
```

### Step 7: Verify Setup

```bash
# Start your development server
pnpm dev
```

Visit `http://localhost:3000/auth/signup` to test the setup!

---

## 🔧 Alternative: Railway Setup

### Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Add a credit card (required for verification)

### Step 2: Create Database

1. Click "New Project"
2. Select "Provision PostgreSQL"
3. Wait for database to be created

### Step 3: Get Connection String

1. Click on your PostgreSQL database
2. Go to "Connect" tab
3. Copy the "Postgres Connection URL"

### Step 4: Set Environment Variables

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/railway"
```

---

## 🔧 Alternative: Neon Setup

### Step 1: Create Neon Account

1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub
3. Create a new project

### Step 2: Get Connection String

1. Copy the connection string from your dashboard
2. It will look like: `postgresql://[USER]:[PASSWORD]@[HOST]/[DATABASE]`

### Step 3: Set Environment Variables

```env
DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]/[DATABASE]"
```

---

## 🛠️ Database Commands

### Prisma Commands

```bash
# Generate Prisma client (after schema changes)
pnpm db:generate

# Push schema to database
pnpm db:push

# Open Prisma Studio (database GUI)
pnpm db:studio

# Create a migration (for production)
pnpm prisma migrate dev --name init

# Reset database (WARNING: deletes all data)
pnpm prisma db push --force-reset
```

### View Your Data

```bash
# Open Prisma Studio to view/edit data
pnpm db:studio
```

This opens a web interface at `http://localhost:5555` where you can:

- View all tables
- Add/edit/delete records
- Run queries
- Monitor database performance

---

## 🔒 Security Best Practices

### Environment Variables

1. **Never commit `.env.local` to git**
2. **Use strong passwords** for database
3. **Rotate secrets** regularly
4. **Use different databases** for development/production

### Database Security

1. **Enable SSL** (Supabase does this automatically)
2. **Use connection pooling** in production
3. **Limit database access** to your application only
4. **Regular backups** (Supabase handles this)

---

## 🚨 Troubleshooting

### Common Issues

1. **Connection Refused**

   - Check if DATABASE_URL is correct
   - Verify database is running
   - Check firewall settings

2. **Authentication Failed**

   - Verify username/password in connection string
   - Check if database user has proper permissions

3. **Schema Push Failed**
   - Check if database exists
   - Verify connection string format
   - Check for syntax errors in schema

### Getting Help

1. **Supabase**: Check their [documentation](https://supabase.com/docs)
2. **Prisma**: Visit [prisma.io/docs](https://prisma.io/docs)
3. **Railway**: Check their [docs](https://docs.railway.app)
4. **Neon**: Visit [neon.tech/docs](https://neon.tech/docs)

---

## 📊 Database Monitoring

### Supabase Dashboard

- **Real-time metrics**: Query performance, connections
- **Logs**: Database and API logs
- **Backups**: Automatic daily backups
- **Settings**: Database configuration

### Prisma Studio

- **Data browser**: View and edit records
- **Query interface**: Run custom queries
- **Schema viewer**: Visualize your database structure

---

## 🚀 Production Considerations

### Scaling

1. **Connection pooling**: Use PgBouncer for high traffic
2. **Read replicas**: For read-heavy workloads
3. **Caching**: Implement Redis for frequently accessed data

### Monitoring

1. **Query performance**: Monitor slow queries
2. **Connection limits**: Watch for connection exhaustion
3. **Storage usage**: Monitor database size

### Backups

1. **Automated backups**: Most providers offer this
2. **Point-in-time recovery**: For critical data
3. **Cross-region replication**: For disaster recovery

This setup will give you a production-ready database that can scale with your S4S platform!
