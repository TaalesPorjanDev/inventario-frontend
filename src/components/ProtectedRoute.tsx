import { Navigate } from "react-router-dom"
import React from "react"

interface ProtectedRouteProps {
    children: React.ReactNode
    redirectTo?: string
}


export function ProtectedRoute({ children, redirectTo = "/login"}: ProtectedRouteProps) {
    const token = localStorage.getItem("token")
    
    if(!token) {
        return <Navigate to={redirectTo}/>
    }
    
    return children 
}