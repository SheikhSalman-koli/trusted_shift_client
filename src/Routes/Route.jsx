import { createBrowserRouter } from "react-router";
import RootLayOut from "../Layout/RootLayOut";
import Home from "../Pages/Home";
import AuthLayOut from "../Layout/AuthLayOut";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoute from "./PrivateRoute";
import AddParcel from "../Pages/SendParcel/AddParcel";
import DashBoardLayout from "../Layout/DashBoardLayout";
import MyParcel from "../Pages/Dashborad/MyParcel/MyParcel";
import Payment from "../Pages/Dashborad/Patment/Payment";
import Histiry from "../Pages/Dashborad/PaymentHistory/Histiry";
import BeARider from "../Pages/BeRider.jsx/BeARider";
import PendingRider from "../Pages/Dashborad/Pending/PendingRider";
import ActiveRiders from "../Pages/Dashborad/Actives/ActiveRiders";
import AdminUsers from "../Pages/Dashborad/MakeAdmin/AdminUsers";
import Forbidden from "../Pages/Dashborad/forbidden/Forbidden";
import AdminRoute from "./AdminRoute";
import AssignRider from "../Pages/Dashborad/Assign/AssignRider";
import PendingDelivery from "../Pages/Dashborad/PendingDeliveries/PendingDelivery";
import RiderRoute from "./RiderRoute";
import CompletedParcels from "../Pages/Dashborad/completed/CompletedParcels";
import EarningDetails from "../Pages/Dashborad/EarningDetails/EarningDetails";
import AllowWithdraw from "../Pages/Dashborad/Assign/AllowWithdraw";
import { Component } from "react";
import DashBoardHome from "../Pages/Dashborad/DashboardHome/DashBoardHome";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayOut,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'coverage',
                loader: () => fetch('/warehouses.json'),
                // Component: Coverage,
                element: <PrivateRoute>
                    <Coverage></Coverage>
                </PrivateRoute>
            },
            {
                path: 'sendparcel',
                loader: () => fetch('/warehouses.json'),
                element: <PrivateRoute>
                    <AddParcel></AddParcel>
                </PrivateRoute>
            },
            {
                path: 'berider',
                loader: () => fetch('/warehouses.json'),
                element: <PrivateRoute>
                    <BeARider></BeARider>
                </PrivateRoute>
            },
            {
                path: 'forbidden',
                Component: Forbidden
            }

        ]
    },
    {
        path: '/',
        Component: AuthLayOut,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <DashBoardLayout></DashBoardLayout>
        </PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashBoardHome
            },
            {
                path: 'myparcel',
                Component: MyParcel
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'history',
                Component: Histiry
            },
            // rider routes only
            {
                path: 'pending-delivery',
                element: <RiderRoute><PendingDelivery></PendingDelivery></RiderRoute>  
            },
            {
                path: 'completed-parcels',
                element: <RiderRoute><CompletedParcels></CompletedParcels></RiderRoute>
            },
            {
                path: 'earning-details',
                element: <RiderRoute><EarningDetails></EarningDetails></RiderRoute>
            },
            // admin routes only
            {
                path: 'assignrider',
                element: <AdminRoute>
                    <AssignRider></AssignRider>
                </AdminRoute>
            },
            {
                path: 'pendingrider',
                element: <AdminRoute>
                    <PendingRider></PendingRider>
                </AdminRoute>
            },
            {
                path: 'activerider',
                element: <AdminRoute>
                    <ActiveRiders></ActiveRiders>
                </AdminRoute>
            },
            {
                path: 'adminusers',
                element: <AdminRoute>
                    <AdminUsers></AdminUsers>
                </AdminRoute>
            },
            {
                path: 'allow-withdraw',
                element: <AdminRoute><AllowWithdraw></AllowWithdraw></AdminRoute>
            }
        ]
    }
])