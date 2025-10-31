import React from 'react'
import {Router, Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserDashboard from './pages/UserDashboard'
import CaptainDashboard from './pages/CaptainDashboard'
import Captain from './pages/Captain'
import Ride from './pages/Ride'
import Business from './pages/Business'
import Company from './pages/Company'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Help from './pages/Help'
import AuthSuccess from './pages/Authsuccess'
import ProtectedRoute from './components/ProtectedRoute'
import TrainingModules from './pages/TrainingModule'
import { Navigate } from 'react-router-dom';

export const App = () => {
  return (
    <div>
     <Routes>
       <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path='/' element={<Home/>}/>
        <Route path='/business' element={<Business/>}/>
       <Route path='/ride' element={<Ride/>}/>
       <Route path='/captain' element={<Captain/>}/>
        <Route path='/company' element={<Company/>}/>
        <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/help' element={<Help/>}/>
    <Route path='/auth/success' element={<AuthSuccess/>}/>
    <Route path='/trainingmodule' element={<TrainingModules/>}/>
    <Route element={<ProtectedRoute role="user" />}>
          <Route path="/userdashboard" element={<UserDashboard />} />
        </Route>
 <Route element={<ProtectedRoute role="captain" />}>
          <Route path="/captaindashboard" element={<CaptainDashboard />} />
        </Route>

      </Routes>
    </div>
  )
}

