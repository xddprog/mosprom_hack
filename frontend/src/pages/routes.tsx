import RootPage from "./(dashboard)/rootPage";
import ErrorPage from "./(dashboard)/errorPage";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { lazy } from "react";
import AuthPage from "./(auth)/authPage";
import { ERouteNames } from "@/shared";
import { vacancyDetailAction } from "@/entities/vacancy/actions/vacancyDetailAction";
import { routesWithHoc } from "@/shared/lib/utils/routesWithHoc";
import { privatePage } from "@/entities/viewer/lib/hoc/privatePage";

const ApplicantPage = lazy(() => import("@/pages/(dashboard)/dashboardPage"));

const AdminPage = lazy(() => import("@/pages/(admin)/adminPage"));

const UniversityPage = lazy(
  () => import("@/pages/(university)/universityPage")
);

const StudentPage = lazy(() => import("@/pages/(university)/studentPage"));
const UniversityProfilePage = lazy(
  () => import("@/pages/(university)/universityProfilePage")
);

const UniversityInternshipPage = lazy(
  () => import("@/pages/(university)/universityInternshipPage")
);

const CompanyPage = lazy(() => import("@/pages/(company)/companyPage"));
const CompanyInternshipPage = lazy(
  () => import("@/pages/(company)/companyInternshipPage")
);
const ManagementPage = lazy(() => import("@/pages/(company)/managementPage"));
const VacancyManagementPage = lazy(
  () => import("@/pages/(company)/vacancyManagementPage")
);

const CompanyProfilePage = lazy(
  () => import("@/pages/(company)/companyProfilePage")
);

const VacancyPage = lazy(() => import("@/pages/(dashboard)/vacancyPage"));

const RegisterPage = lazy(() => import("@/pages/(auth)/registerPage"));
const LoginPage = lazy(() => import("@/pages/(auth)/loginPage"));

export const routes = createBrowserRouter([
  {
    path: ERouteNames.DEFAULT_ROUTE,
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ERouteNames.EMPTY_ROUTE,
        element: <Outlet />,
        children: [
          {
            path: ERouteNames.DASHBOARD_ROUTE,
            element: <Outlet />,
            children: [
              {
                path: ERouteNames.EMPTY_ROUTE,
                element: <ApplicantPage />,
              },
              {
                path: ERouteNames.VACANCY_DETAIL_ROUTE,
                element: <Navigate to={ERouteNames.DASHBOARD_ROUTE} replace />,
              },
              {
                path: ERouteNames.VACANCY_ROUTE,
                // loader: vacancyDetailAction,
                element: <VacancyPage />,
              },
            ],
          },
          ...routesWithHoc(privatePage, [
            {
              path: ERouteNames.EMPTY_ROUTE,
              element: <Navigate to={ERouteNames.DASHBOARD_ROUTE} replace />,
            },

            {
              path: ERouteNames.DASHBOARD_COMPANY_ROUTE,
              element: <Outlet />,
              children: [
                {
                  path: ERouteNames.EMPTY_ROUTE,
                  element: <CompanyPage />,
                },
                {
                  path: ERouteNames.MANAGEMENT_ROUTE,
                  element: <ManagementPage />,
                },
                {
                  path: ERouteNames.COMPANY_INTERNSHIP_ROUTE,
                  element: <CompanyInternshipPage />,
                },
                {
                  path: ERouteNames.COMPANY_INTERNSHIP_ROUTE,
                  element: <CompanyInternshipPage />,
                },
                {
                  path: ERouteNames.VACANCY_MANAGEMENT_ROUTE,
                  element: <VacancyManagementPage />,
                },
                {
                  path: ERouteNames.COMPANY_PROFILE_ROUTE,
                  element: <CompanyProfilePage />,
                },
              ],
            },
            {
              path: ERouteNames.DASHBOARD_UNIVERSITY_ROUTE,
              element: <Outlet />,
              children: [
                {
                  path: ERouteNames.EMPTY_ROUTE,
                  element: <UniversityPage />,
                },
                {
                  path: ERouteNames.STUDENT_ROUTE,
                  element: <StudentPage />,
                },
                {
                  path: ERouteNames.UNIVERSITY_INTERNSHIP_ROUTE,
                  element: <UniversityInternshipPage />,
                },

                {
                  path: ERouteNames.PROFILE_ROUTE,
                  element: <UniversityProfilePage />,
                },
              ],
            },
            {
              path: ERouteNames.DASHBOARD_ADMIN_ROUTE,
              element: <Outlet />,
              children: [
                {
                  path: ERouteNames.EMPTY_ROUTE,
                  element: <AdminPage />,
                },
              ],
            },
          ]),
        ],
      },
      {
        path: ERouteNames.AUTH_ROUTE,
        element: <AuthPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ERouteNames.EMPTY_ROUTE,
            element: <Navigate to={ERouteNames.REGISTER_ROUTE} replace />,
          },
          {
            path: ERouteNames.REGISTER_ROUTE,
            element: <RegisterPage />,
          },
          {
            path: ERouteNames.LOGIN_ROUTE,
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);
