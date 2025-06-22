# Pulse - Burnout Detection & Prevention Platform

A privacy-first web platform that proactively tracks mental well-being across distributed teams using anonymous Slack check-ins, behavioral signals, and AI-powered insights.

## 🧠 Purpose

Pulse helps companies detect burnout early at a team level, empower managers with non-invasive signals, reduce reliance on HR surveys, and deliver wellness insights and engagement metrics.

## 🚀 Features

- **Slack Check-ins**: Daily mood prompts via Slack
- **Anonymous Aggregation**: Privacy-first team insights
- **Predictive Burnout Scoring**: AI-powered risk assessment
- **After-hours Detection**: Behavioral signal monitoring
- **Manager Dashboards**: Team-level insights and alerts
- **Email Digests**: Weekly summaries with actionable insights
- **Integration Hub**: Slack, Calendar, and HR system connections

## 🛠️ Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js (Express)
- **Database**: PostgreSQL with Prisma ORM
- **Slack Integration**: @slack/bolt SDK
- **AI**: OpenAI API for recommendations
- **Email**: SendGrid for weekly digests
- **Auth**: Clerk for secure authentication
- **Deployment**: Vercel (frontend) + Render (backend)

## 📁 Project Structure

```
pulse/
├── frontend/          # React application
├── backend/           # Node.js API server
├── slack-app/         # Slack Bolt application
├── prisma/           # Database schema
└── docker-compose.yml # Development environment
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL
- Slack App credentials
- OpenAI API key

### Development Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd pulse
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   # Fill in your environment variables
   ```

3. **Database setup:**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

4. **Start development servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend
   cd frontend && npm run dev
   
   # Terminal 3 - Slack app
   cd slack-app && npm run dev
   ```

## 📊 User Roles

### 👤 Employee
- Receive Slack check-ins
- Submit daily mood
- View private well-being dashboard

### 🧑‍💼 Manager
- See anonymized team trends
- Get burnout risk alerts
- Review AI recommendations

### 🏢 Admin (HR/Leadership)
- Company-wide analytics
- Team/department filtering
- Integration management

## 🔐 Environment Variables

Create a `.env` file with:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/pulse"

# Slack
SLACK_BOT_TOKEN="xoxb-your-bot-token"
SLACK_SIGNING_SECRET="your-signing-secret"
SLACK_APP_TOKEN="xapp-your-app-token"

# OpenAI
OPENAI_API_KEY="sk-your-openai-key"

# Email (SendGrid)
SENDGRID_API_KEY="SG-your-sendgrid-key"

# Auth (Clerk)
CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# App
NODE_ENV="development"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

## 📈 Burnout Score Algorithm

The predictive burnout score (0-100) is calculated using:
- 7/14-day moving average of mood scores
- After-hours activity weighting
- Recovery score trends
- AI sentiment analysis

**Risk Zones:**
- 0-39: Stable (Green)
- 40-69: Monitoring (Yellow)
- 70-100: High Risk (Red)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
