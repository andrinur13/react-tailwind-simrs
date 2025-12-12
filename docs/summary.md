# React Tailwind SIMRS - Project Documentation

## 📋 Project Overview

**React SIMRS** (Sistem Informasi Manajemen Rumah Sakit) is a modern web application built for hospital management systems. It's designed as a comprehensive employee management platform with authentication, dashboard, and administrative features.

### 🛠 Tech Stack

- **Frontend Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **UI Components**: Radix UI + shadcn/ui components
- **Routing**: React Router DOM 7.10.1
- **State Management**: React Context API (for authentication)
- **HTTP Client**: Axios 1.13.2
- **Icons**: Lucide React 0.560.0
- **Notifications**: Sonner 2.0.7
- **Theme**: next-themes 0.4.6

## 🏗 Project Structure

```
src/
├── app/                    # Main application pages
│   ├── Dashboard.tsx       # Dashboard page (basic implementation)
│   ├── About.tsx          # About page
│   ├── Login.tsx          # Authentication login page
│   └── employee/          # Employee management module
│       ├── index.tsx      # Employee list with pagination & search
│       ├── detail.tsx     # Employee detail view
│       └── create.tsx     # Employee creation form
├── components/            # Reusable UI components
│   ├── app-sidebar.tsx    # Main navigation sidebar
│   ├── LoadingSkeleton.tsx # Loading states
│   ├── nav-*.tsx          # Navigation components
│   └── ui/               # shadcn/ui component library
├── hooks/                # Custom React hooks
│   └── use-mobile.ts     # Mobile detection hook
├── layout/               # Layout components
│   └── PageLayout.tsx    # Main page layout with sidebar
├── lib/                  # Core utilities and services
│   ├── api.ts           # API service layer (Employee, Department, Competencies)
│   ├── auth.tsx         # Authentication context provider
│   ├── axios.tsx        # Axios HTTP client configuration
│   └── utils.ts         # Utility functions
└── router/              # Application routing
    └── index.tsx        # Route definitions
```

## 🔐 Authentication System

### Features
- **Context-based Authentication**: Uses React Context for state management
- **Token-based Security**: JWT tokens stored in localStorage
- **Auto-logout**: Handles 401 responses with automatic logout
- **Protected Routes**: Routes require authentication except login page

### Implementation Details
- **Login Flow**: Email/password → API call → Store token & user data
- **Token Management**: Automatic injection in API requests via Axios interceptors
- **Logout Handling**: Clears localStorage and redirects to login

## 👥 Employee Management Module

### Core Features
1. **Employee List** (`/employee`)
   - Paginated data display (15 items per page)
   - Real-time search functionality (by name)
   - Action buttons (View, Edit, Delete)
   - Toast notifications for CRUD operations

2. **Employee Creation** (`/employee/create`)
   - Comprehensive form with validation
   - Department selection (dropdown)
   - Fields: Name, Email, Password, Addresses, Phone, Department

3. **Employee Details** (`/employee/detail/:id`)
   - Detailed employee information view
   - Edit capabilities

### API Integration
- **GET** `/employees` - List with pagination
- **GET** `/employees/:id` - Single employee details
- **POST** `/employees` - Create new employee
- **PUT** `/employees/:id` - Update employee
- **DELETE** `/employees/:id` - Delete employee

## 🏢 Data Models

### Available APIs
1. **Employee API**: CRUD operations for employee management
2. **Department API**: Department management with pagination
3. **Competencies API**: Skills/competencies management with search

### API Configuration
- **Base URL**: Configured via `VITE_API_URL` environment variable
- **Authentication**: Bearer token in Authorization header
- **Response Format**: JSON with standardized structure
- **Error Handling**: Centralized error responses with field validation

## 🎨 UI/UX Design

### Design System
- **Component Library**: shadcn/ui with Radix UI primitives
- **Theme**: "new-york" style with neutral base colors
- **Icons**: Lucide React icon library
- **Responsive**: Mobile-first approach with responsive breakpoints

### Layout Structure
- **Sidebar Navigation**: Collapsible sidebar with team switcher
- **Breadcrumb**: Navigation breadcrumbs in header
- **Content Area**: Main content with consistent padding
- **Cards**: Primary content containers for data presentation

### Key Components
- **Tables**: Sortable, paginated data tables
- **Forms**: Validated forms with error handling
- **Dialogs**: Modal dialogs for confirmations
- **Buttons**: Consistent button styling with loading states
- **Toasts**: Non-intrusive notifications using Sonner

## 🗺 Navigation & Routing

### Route Structure
```
/ → Login Page (public)
/dashboard → Dashboard (protected)
/about → About Page (protected)
/employee → Employee List (protected)
/employee/detail/:id → Employee Details (protected)
/employee/create → Create Employee (protected)
```

### Sidebar Navigation
- **Playground Section**: Dashboard, Employee, About, Settings
- **Models Section**: Genesis, Explorer, Quantum (placeholder)
- **Documentation Section**: Introduction, Tutorials, etc. (placeholder)
- **Settings Section**: General, Team, Billing, Limits (placeholder)
- **Projects Section**: Design Engineering, Sales & Marketing, Travel (placeholder)

## 🔧 Development Setup

### Requirements
- Node.js (latest LTS version)
- npm/yarn package manager

### Environment Variables
```bash
VITE_API_URL=your_api_endpoint_here
```

### Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Configuration Files
- **TypeScript**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- **ESLint**: `eslint.config.js`
- **Vite**: `vite.config.ts`
- **Tailwind**: Configuration in `index.css`
- **shadcn/ui**: `components.json`

## 🚀 Features Implementation Status

### ✅ Completed Features
- [x] Authentication system with login/logout
- [x] Protected routing
- [x] Employee CRUD operations
- [x] Paginated data tables
- [x] Search functionality
- [x] Toast notifications
- [x] Responsive sidebar navigation
- [x] Form validation and error handling
- [x] Loading states and skeletons

### 🚧 Placeholder/Demo Features
- [ ] Dashboard content (currently shows basic text)
- [ ] About page content
- [ ] Department management UI
- [ ] Competencies management UI
- [ ] Settings pages
- [ ] Documentation pages
- [ ] Projects management

### 🔮 Potential Enhancements
- [ ] Advanced filtering and sorting
- [ ] Bulk operations for employees
- [ ] File upload for employee photos
- [ ] Export functionality (PDF, Excel)
- [ ] Advanced dashboard with charts and metrics
- [ ] Role-based access control
- [ ] Audit logging
- [ ] Real-time notifications
- [ ] Dark/light theme toggle
- [ ] Internationalization (i18n)

## 📝 Code Quality & Best Practices

### TypeScript Integration
- Strict TypeScript configuration
- Type-safe API responses
- Interface definitions for data models
- Props typing for all components

### Component Architecture
- Functional components with hooks
- Separation of concerns (UI, logic, API)
- Reusable component library
- Custom hooks for common functionality

### State Management
- React Context for global state (auth)
- Local state for component-specific data
- Proper state updates and cleanup

### Performance Considerations
- Code splitting with React Router
- Optimized imports
- Efficient re-rendering patterns
- Loading states for better UX

## 🛠 Maintenance & Support

### Error Handling
- Global error boundaries
- API error handling with user feedback
- Form validation with field-specific errors
- Network error recovery

### Logging & Debugging
- Console logging for development
- Error tracking preparation
- Performance monitoring capabilities

### Testing Preparation
- Component structure suitable for testing
- Separation of business logic
- Mockable API layer

---

**Last Updated**: December 12, 2025
**Version**: 0.0.0
**Status**: Development Phase

This documentation provides a comprehensive overview of the React Tailwind SIMRS project structure, features, and implementation details for developers and stakeholders.