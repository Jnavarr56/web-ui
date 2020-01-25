import React, { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import AuthLayout from './layouts/Auth'
import DashboardLayout from './layouts/Dashboard'
import ErrorLayout from './layouts/Error'

const routes = [
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/auth/login" />
	},
	{
		path: '/auth',
		component: AuthLayout,
		routes: [
			{
				path: '/auth/login',
				exact: true,
				component: lazy(() => import('views/Login'))
			},
			{
				path: '/auth/register',
				exact: true,
				component: lazy(() => import('views/Register'))
			},
			{
				path: '/auth/callback',
				exact: true,
				component: () => null
			},
			{
				component: () => <Redirect to="/errors/error-404" />
			}
		]
	},
	{
		path: '/dashboard',
		component: DashboardLayout,
		routes: [
			//   {
			//     path: '/dashboard',
			//     exact: true,
			//     component: lazy(() => import('views/Login'))
			//   },
			//   {
			//     component: () => <Redirect to="/errors/error-404" />
			//   }
		]
	},
	{
		path: '/errors',
		component: ErrorLayout,
		routes: [
			{
				path: '/errors/error-401',
				exact: true,
				component: lazy(() => import('views/Error401'))
			},
			{
				path: '/errors/error-404',
				exact: true,
				component: lazy(() => import('views/Error404'))
			},
			{
				path: '/errors/error-500',
				exact: true,
				component: lazy(() => import('views/Error500'))
			},
			{
				component: () => <Redirect to="/errors/error-404" />
			}
		]
	},
	{
		component: () => <Redirect to="/errors/error-404" />
	}
]

export default routes
