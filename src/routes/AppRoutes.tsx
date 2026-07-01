import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthLayout } from '../layouts/AuthLayout'
import { AppLayout } from '../layouts/AppLayout'
import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  VerifyEmailPage,
} from '@/features/auth'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'
import { CreateCompanyPage } from '@/features/companies'
import { CompaniesPage, CompanyDetailsPage } from '@/features/companies'
import { Applications } from '../pages/Applications'
import { Dashboard } from '../pages/Dashboard'
import { Settings } from '../pages/Settings'
import { Statistics } from '../pages/Statistics'
import { ExtractedData, MyCVs, Training } from '@/features/resumes'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/companies/new" element={<CreateCompanyPage />} />
          <Route path="/companies/:companyId" element={<CompanyDetailsPage />} />
          <Route path="/profile/cv" element={<MyCVs />} />
          <Route path="/profile/cv/extracted-data" element={<ExtractedData />} />
          <Route
            path="/profile/cv/extracted-data/training"
            element={<Training />}
          />
          <Route path="/applications" element={<Applications />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
