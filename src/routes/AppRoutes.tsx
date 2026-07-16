import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthLayout } from '../layouts/AuthLayout'
import { AppLayout } from '../layouts/AppLayout'
import { ROUTES } from './paths'
import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  VerifyEmailPage,
} from '@/features/auth'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'
import { ApplicationsPage } from '@/features/applications'
import { CreateCompanyPage } from '@/features/companies'
import { CompaniesPage, CompanyDetailsPage } from '@/features/companies'
import { DashboardPage } from '@/features/dashboard'
import {
  ExperiencesPage,
  ExtractedDataPage,
  MyCVsPage,
  SkillsPage,
  TrainingPage,
  GeneratedCvPublicPage,
} from '@/features/resumes'
import { StatisticsPage } from '@/features/statistics'
import { SettingsPage } from '@/features/user'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmailPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={`${ROUTES.RESET_PASSWORD}/:token`} element={<ResetPasswordPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.COMPANIES} element={<CompaniesPage />} />
          <Route path={`${ROUTES.COMPANIES}/new`} element={<CreateCompanyPage />} />
          <Route path={`${ROUTES.COMPANIES}/:companyId`} element={<CompanyDetailsPage />} />
          <Route path={ROUTES.PROFILE_CV} element={<MyCVsPage />} />
          <Route path={ROUTES.EXTRACTED_DATA} element={<ExtractedDataPage />} />
          <Route path={ROUTES.EXTRACTED_DATA_TRAINING} element={<TrainingPage />} />
          <Route path={ROUTES.EXTRACTED_DATA_EXPERIENCES} element={<ExperiencesPage />} />
          <Route path={ROUTES.EXTRACTED_DATA_SKILLS} element={<SkillsPage />} />
          <Route path={ROUTES.APPLICATIONS} element={<ApplicationsPage />} />
          <Route path={ROUTES.STATISTICS} element={<StatisticsPage />} />
          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path={ROUTES.GENERATED_CV_PUBLIC} element={<GeneratedCvPublicPage />} />

      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  )
}
