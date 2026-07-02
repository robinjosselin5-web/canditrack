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
import { ApplicationsPage } from '../pages/ApplicationsPage'
import { DashboardPage } from '../pages/DashboardPage'
import { StatisticsPage } from '../pages/StatisticsPage'
import {
  ExperiencesPage,
  ExtractedDataPage,
  MyCVsPage,
  SkillsPage,
  TrainingPage,
} from '@/features/resumes'
import { SettingsPage } from '@/features/user'

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
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/companies/new" element={<CreateCompanyPage />} />
          <Route path="/companies/:companyId" element={<CompanyDetailsPage />} />
          <Route path="/profile/cv" element={<MyCVsPage />} />
          <Route path="/profile/cv/extracted-data" element={<ExtractedDataPage />} />
          <Route
            path="/profile/cv/extracted-data/training"
            element={<TrainingPage />}
          />
          <Route
            path="/profile/cv/extracted-data/experiences"
            element={<ExperiencesPage />}
          />
          <Route
            path="/profile/cv/extracted-data/skills"
            element={<SkillsPage />}
          />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
