# S4S Authentication & Scheduling System Setup Guide

## Overview

This implementation provides a complete login system for students and mentors with integrated scheduling functionality. The system includes:

- **User Authentication**: NextAuth.js with Google OAuth and email/password
- **Role-based Access**: Students and Mentors with different dashboards
- **Meeting Scheduling**: Students can schedule sessions with mentors
- **Database**: PostgreSQL with Prisma ORM
- **Real-time Features**: Meeting management and notifications

## Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- Google OAuth credentials (optional but recommended)

## Installation Steps

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Database Setup

1. Create a PostgreSQL database
2. Set up your environment variables:

```bash
# Create .env.local file
cp .env.example .env.local
```

Add the following environment variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/s4s_database"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. Database Migration

```bash
# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push
```

### 4. Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy Client ID and Client Secret to your `.env.local`

## Features Implemented

### Authentication System

- **Sign Up**: `/auth/signup` - Role selection (Student/Mentor)
- **Sign In**: `/auth/signin` - Google OAuth + email/password
- **Protected Routes**: Role-based dashboard access
- **Session Management**: JWT tokens with secure cookies

### Student Dashboard (`/dashboard/student`)

- **Overview**: Statistics and recent meetings
- **Meeting Management**: View scheduled sessions
- **Mentor Discovery**: Browse and search mentors
- **Scheduling**: Book sessions with mentors

### Mentor Dashboard (`/dashboard/mentor`)

- **Profile Management**: Update availability and expertise
- **Meeting Requests**: Accept/decline student requests
- **Session History**: Track completed sessions
- **Earnings**: View session revenue

### API Endpoints

- `POST /api/auth/signup` - User registration
- `GET /api/users?role=MENTOR` - Fetch mentors
- `POST /api/meetings` - Create meetings
- `GET /api/meetings` - Fetch user meetings
- `PUT /api/meetings/[id]` - Update meeting status

## Database Schema

### Core Models

- **User**: Students and mentors with role-based fields
- **Meeting**: Scheduled sessions with participants
- **StudentMentor**: Relationships between students and mentors
- **MeetingParticipant**: Meeting attendance and roles

### Key Features

- **Role-based Access**: STUDENT, MENTOR, ADMIN roles
- **Meeting Types**: One-on-one, Group, Workshop, Consultation
- **Status Tracking**: Scheduled, Confirmed, Cancelled, Completed
- **Availability Management**: Mentor weekly schedules

## Usage Examples

### Student Scheduling a Meeting

```typescript
const response = await fetch("/api/meetings", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "College Application Review",
    description: "Need help with my personal statement",
    startTime: "2024-01-15T14:00:00Z",
    endTime: "2024-01-15T15:00:00Z",
    duration: 60,
    meetingType: "ONE_ON_ONE",
    participantIds: ["mentor-user-id"],
  }),
});
```

### Fetching Available Mentors

```typescript
const mentors = await fetch("/api/users?role=MENTOR&search=engineering").then(
  (res) => res.json()
);
```

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure session management
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Prisma ORM
- **CSRF Protection**: NextAuth.js built-in protection

## Deployment Considerations

### Environment Variables

Ensure all environment variables are set in production:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="production-secret"
NEXTAUTH_URL="https://yourdomain.com"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

### Database

- Use a production PostgreSQL database (e.g., Supabase, Railway, or AWS RDS)
- Set up database backups
- Configure connection pooling

### Security

- Use HTTPS in production
- Set secure cookie options
- Implement rate limiting
- Add input sanitization

## Next Steps

### Immediate Enhancements

1. **Email Notifications**: Meeting confirmations and reminders
2. **Calendar Integration**: Google Calendar sync for mentors
3. **Payment Processing**: Stripe integration for paid sessions
4. **Video Conferencing**: Zoom/Google Meet integration

### Advanced Features

1. **Real-time Chat**: WebSocket-based messaging
2. **File Sharing**: Document upload and sharing
3. **Progress Tracking**: Student application milestones
4. **Analytics Dashboard**: Session metrics and insights

## Troubleshooting

### Common Issues

1. **Database Connection**: Check DATABASE_URL format
2. **Google OAuth**: Verify redirect URIs match exactly
3. **Session Issues**: Clear browser cookies and localStorage
4. **Build Errors**: Ensure all dependencies are installed

### Development Commands

```bash
# Start development server
pnpm dev

# Database operations
pnpm db:generate  # Generate Prisma client
pnpm db:push      # Push schema changes
pnpm db:studio    # Open Prisma Studio

# Type checking
pnpm type-check

# Build for production
pnpm build
```

## Support

For issues or questions:

1. Check the NextAuth.js documentation
2. Review Prisma documentation
3. Check browser console for errors
4. Verify environment variables are set correctly

This implementation provides a solid foundation for your S4S platform with room for future enhancements and scaling.
