# Development Best Practices Guide

## Overview

This document outlines the established patterns and best practices for maintaining consistency and code quality in the Kustom platform project.

## File Structure & Organization

### 1. Paths Management (`src/components/pages/general/paths.js`)

**Purpose**: Centralized route management for consistent navigation across the application.

**Pattern**:
```javascript
export const RouteList = {
  // Always use descriptive names
  AUTH: "/auth",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  // Add new routes here
}
```

**Best Practices**:
- ✅ Always add new page paths to `RouteList`
- ✅ Use descriptive, uppercase names
- ✅ Keep paths consistent with component naming
- ❌ Never hardcode routes in components

### 2. API Endpoints Management (`src/components/pages/general/api-list.js`)

**Purpose**: Centralized API endpoint management for consistent server communication.

**Pattern**:
```javascript
const ApiList = {
  // Group by functionality
  API_URL_FOR_CHECK_USER: "users/check",
  API_URL_FOR_SEND_OTP: "otp/send",
  // Add new endpoints here
}
```

**Best Practices**:
- ✅ Always add new API endpoints to `ApiList`
- ✅ Use descriptive names with `API_URL_FOR_` prefix
- ✅ Group related endpoints together
- ✅ Keep endpoint paths consistent with backend
- ❌ Never hardcode API URLs in components

## Server Communication

### 3. Axios Helper Functions (`src/utils/axios.js`)

**Purpose**: Centralized HTTP request handling with consistent error management.

**Available Functions**:
```javascript
// For POST requests
postToServer(url, data, method = '')

// For GET requests  
getFromServer(url, params = {}, method = '')
```

**Usage Pattern**:
```javascript
// ✅ Correct usage
import { postToServer, getFromServer } from '@/utils/axios'
import ApiList from '@/components/pages/general/api-list'

const response = await postToServer(ApiList.API_URL_FOR_CHECK_USER, { phone })
const data = await getFromServer(ApiList.API_URL_FOR_GET_USER_PROFILE, { id: userId })
```

**Best Practices**:
- ✅ Always use `postToServer` for POST/PUT/DELETE requests
- ✅ Always use `getFromServer` for GET requests
- ✅ Always import endpoints from `ApiList`
- ✅ Handle errors consistently
- ❌ Never use axios directly in components
- ❌ Never hardcode API URLs

### 4. Direct API Calls

**Purpose**: Direct API communication using helper functions.

**Pattern**:
```javascript
import { postToServer, getFromServer } from '@/utils/axios'
import ApiList from '@/components/pages/general/api-list'

// Direct API calls
const response = await postToServer(ApiList.API_URL_FOR_CHECK_USER, { phone })
const userData = await getFromServer(ApiList.API_URL_FOR_GET_USER_PROFILE, { id: userId })
```

**Best Practices**:
- ✅ Always use helper functions (`postToServer`, `getFromServer`)
- ✅ Always import from `ApiList`
- ✅ Handle async/await properly
- ✅ Group related API calls in components
- ❌ Don't create separate service layers

## Component Development

### 5. Navigation Pattern

**Purpose**: Consistent navigation using centralized route management.

**Pattern**:
```javascript
import { RouteList } from '@/components/pages/general/paths'

// ✅ Correct usage
navigate(RouteList.AUTH, { state: { type: "b2c" } })
navigate(RouteList.DASHBOARD)

// ❌ Incorrect usage
navigate("/auth")
navigate("/dashboard")
```

**Best Practices**:
- ✅ Always import `RouteList` in components
- ✅ Always use `RouteList` constants for navigation
- ✅ Pass state data when needed
- ❌ Never hardcode route paths

### 6. API Calls in Components

**Purpose**: Consistent API communication using direct helper functions.

**Pattern**:
```javascript
import { postToServer, getFromServer } from '@/utils/axios'
import ApiList from '@/components/pages/general/api-list'

// ✅ Correct usage
const response = await postToServer(ApiList.API_URL_FOR_CHECK_USER, { phone })
const userData = await getFromServer(ApiList.API_URL_FOR_GET_USER_PROFILE, { id: userId })

// ❌ Incorrect usage
const response = await axios.post('/users/check', { phone })
```

**Best Practices**:
- ✅ Always import helper functions (`postToServer`, `getFromServer`)
- ✅ Always import `ApiList` for endpoints
- ✅ Use appropriate API endpoints
- ✅ Handle loading states
- ✅ Handle errors with toast notifications
- ❌ Never make direct API calls in components

## Error Handling

### 7. Toast Notifications

**Purpose**: Consistent user feedback for actions and errors.

**Pattern**:
```javascript
import { useToast } from '@/hooks/use-toast'

const { toast } = useToast()

// Success
toast({
  title: "Success",
  description: "Operation completed successfully"
})

// Error
toast({
  title: "Error",
  description: "Something went wrong",
  variant: "destructive"
})
```

**Best Practices**:
- ✅ Always import `useToast` hook
- ✅ Use descriptive titles and descriptions
- ✅ Use appropriate variants (default, destructive)
- ✅ Keep messages user-friendly
- ❌ Don't show technical error details to users

### 8. Form Validation

**Purpose**: Consistent client-side validation with user feedback.

**Pattern**:
```javascript
const validateForm = () => {
  if (!formData.name.trim()) {
    toast({
      title: "Name Required",
      description: "Please enter your full name",
      variant: "destructive"
    })
    return false
  }
  return true
}
```

**Best Practices**:
- ✅ Validate all required fields
- ✅ Use descriptive error messages
- ✅ Show one error at a time
- ✅ Return boolean for validation result
- ❌ Don't proceed with invalid data

## Styling Standards

### 9. SHADCN UI Compliance

**Purpose**: Consistent design system across the application.

**Pattern**:
```javascript
// ✅ Correct usage
<Button
  size="lg"
  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 transform scale-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
  Button Text
</Button>
```

**Best Practices**:
- ✅ Use SHADCN UI components
- ✅ Apply consistent color schemes
- ✅ Use proper spacing and typography
- ✅ Include hover and focus states
- ✅ Make components responsive
- ❌ Don't override SHADCN styles unnecessarily

## Development Workflow

### 10. Adding New Features

**Step-by-step process**:

1. **Add Route Path**:
   ```javascript
   // In paths.js
   export const RouteList = {
     // ... existing routes
     NEW_FEATURE: "/new-feature",
   }
   ```

2. **Add API Endpoint**:
   ```javascript
   // In api-list.js
   const ApiList = {
     // ... existing endpoints
     API_URL_FOR_NEW_FEATURE: "new-feature",
   }
   ```

3. **Add API Calls**:
   ```javascript
   // In your component
   import { postToServer, getFromServer } from '@/utils/axios'
   import ApiList from '@/components/pages/general/api-list'
   
   const getData = async (params) => {
     return await getFromServer(ApiList.API_URL_FOR_NEW_FEATURE, params)
   }
   ```

4. **Create Component**:
   ```javascript
   // New component file
   import { RouteList } from '@/components/pages/general/paths'
   import { postToServer, getFromServer } from '@/utils/axios'
   import ApiList from '@/components/pages/general/api-list'
   import { useToast } from '@/hooks/use-toast'
   
   const NewFeature = () => {
     // Component implementation
   }
   ```

5. **Add Route**:
   ```javascript
   // In App.jsx
   <Route path={RouteList.NEW_FEATURE} element={<NewFeature />} />
   ```

### 11. Code Review Checklist

Before submitting code for review, ensure:

- ✅ All routes are added to `RouteList`
- ✅ All API endpoints are added to `ApiList`
- ✅ All API calls use direct helper functions
- ✅ All navigation uses `RouteList`
- ✅ Error handling is implemented
- ✅ Loading states are managed
- ✅ Form validation is in place
- ✅ Styling follows SHADCN UI standards
- ✅ Components are responsive
- ✅ No hardcoded URLs or paths

## Common Mistakes to Avoid

### ❌ Hardcoding Routes
```javascript
// Wrong
navigate("/auth")

// Correct
navigate(RouteList.AUTH)
```

### ❌ Hardcoding API URLs
```javascript
// Wrong
const response = await axios.post('/users/check', data)

// Correct
const response = await postToServer(ApiList.API_URL_FOR_CHECK_USER, data)
```

### ❌ Direct Axios Usage
```javascript
// Wrong
import axios from 'axios'
const response = await axios.get('/api/users')

// Correct
import { getFromServer } from '@/utils/axios'
const response = await getFromServer(ApiList.API_URL_FOR_GET_USER_PROFILE)
```

### ❌ Inconsistent Error Handling
```javascript
// Wrong
console.error(error)

// Correct
toast({
  title: "Error",
  description: "Something went wrong. Please try again.",
  variant: "destructive"
})
```

## Testing Guidelines

### 12. Component Testing

- Test all user interactions
- Verify API calls are made correctly
- Test error scenarios
- Verify navigation works
- Test form validation
- Verify loading states

### 13. API Testing

- Test all endpoints with Postman/curl
- Verify response formats
- Test error responses
- Verify authentication works
- Test rate limiting

## Maintenance

### 14. Regular Updates

- Keep dependencies updated
- Review and refactor code regularly
- Update documentation
- Monitor performance
- Address security vulnerabilities

### 15. Code Quality

- Use ESLint for code quality
- Follow consistent naming conventions
- Write self-documenting code
- Add comments for complex logic
- Keep functions small and focused

## Conclusion

Following these best practices ensures:
- **Consistency**: All developers follow the same patterns
- **Maintainability**: Code is easy to understand and modify
- **Scalability**: New features can be added easily
- **Quality**: Fewer bugs and better user experience
- **Team Collaboration**: Clear standards for code reviews

Remember: **Always follow the established patterns when adding new features or modifying existing code.** 