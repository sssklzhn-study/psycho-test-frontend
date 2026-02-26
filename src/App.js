// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import HomePage from './components/HomePage';
// import LoginPage from './components/LoginPage';
// import TestPage from './components/TestPage';
// import AdminPanel from './components/AdminPanel';
// import ResultPage from './components/ResultPage';
// import RegisterPage from './components/RegisterPage';
// import PaymentPage from './components/PaymentPage';
// import UserProfile from './components/UserProfile';
// import './App.css';
// import './i18n';

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [forceUpdate, setForceUpdate] = useState(0);
//   const [networkStatus, setNetworkStatus] = useState(navigator.onLine);

//   useEffect(() => {
//     console.log('🎯 App MOUNTED');
    
//     setTimeout(() => setLoading(false), 1000);

//     const handleOnline = () => setNetworkStatus(true);
//     const handleOffline = () => setNetworkStatus(false);
    
//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);

//     const handleAuthChange = () => {
//       console.log('📢 Событие изменения auth');
//       setForceUpdate(prev => prev + 1);
//     };

//     window.addEventListener('storage', handleAuthChange);
//     window.addEventListener('localStorageChange', handleAuthChange);

//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//       window.removeEventListener('storage', handleAuthChange);
//       window.removeEventListener('localStorageChange', handleAuthChange);
//     };
//   }, []);

//   const isAdmin = localStorage.getItem('isAdmin') === 'true';
//   const userId = localStorage.getItem('userId');
//   const isCompleted = localStorage.getItem('isCompleted') === 'true';
//   const userType = localStorage.getItem('userType');
//   const hasTempLogin = localStorage.getItem('tempLogin');

//   console.log('🔄 App render:', { 
//     isAdmin, 
//     userId, 
//     isCompleted, 
//     userType,
//     hasTempLogin,
//     forceUpdate,
//     networkStatus
//   });

//   return (
//     <div className="App">
//       <div className="background-orb background-orb-1"></div>
//       <div className="background-orb background-orb-2"></div>
//       <div className="background-orb background-orb-3"></div>
//       <div className="grid-overlay"></div>
//       <div className="gold-line-vertical"></div>
//       <div className="gold-line-horizontal"></div>

//       <div className={`network-status ${networkStatus ? 'online' : 'offline'}`}>
//         {networkStatus ? 'Online' : 'Offline'}
//       </div>

//       <div className="app-version">v1.0.0</div>

//       <div className="content-wrapper">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="/register" element={<RegisterPage />} />
          
//           {/* Профиль - только для email-пользователей */}
//           <Route 
//             path="/profile" 
//             element={
//               userId && !isAdmin && userType === 'email' ? 
//                 <UserProfile /> : 
//                 <Navigate to="/" replace />
//             } 
//           />
          
//           {/* Тест - для сгенерированных, купивших, и не прошедших тест */}
//           <Route 
//             path="/test" 
//             element={
//               (() => {
//                 // Сгенерированные пользователи
//                 if (userId && !isAdmin && !isCompleted && userType === 'generated') {
//                   return <TestPage />;
//                 }
                
//                 // Только что купившие тест
//                 if (hasTempLogin && !isCompleted) {
//                   return <TestPage />;
//                 }
                
//                 // Email пользователи, которые еще не проходили тест
//                 if (userId && !isAdmin && !isCompleted && userType === 'email') {
//                   return <TestPage />;
//                 }
                
//                 return <Navigate to="/" replace />;
//               })()
//             } 
//           />
          
//           {/* Результаты - только для прошедших тест */}
//           <Route 
//             path="/result" 
//             element={
//               (() => {
//                 const currentIsCompleted = localStorage.getItem('isCompleted') === 'true';
//                 const currentUserId = localStorage.getItem('userId');
//                 const currentIsAdmin = localStorage.getItem('isAdmin') === 'true';
                
//                 const allowed = currentUserId && !currentIsAdmin && currentIsCompleted;
                
//                 console.log('🔍 /result check:', {
//                   currentUserId,
//                   currentIsAdmin,
//                   currentIsCompleted,
//                   allowed
//                 });
                
//                 return allowed ? <ResultPage /> : <Navigate to="/" replace />;
//               })()
//             } 
//           />
          
//           {/* Админ панель */}
//           <Route 
//             path="/admin/*" 
//             element={
//               isAdmin ? <AdminPanel /> : <Navigate to="/" replace />
//             } 
//           />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import TestPage from './components/TestPage';
import AdminPanel from './components/AdminPanel';
import ResultPage from './components/ResultPage';
import RegisterPage from './components/RegisterPage';
import PaymentPage from './components/PaymentPage';
import UserProfile from './components/UserProfile';
import LanguageSwitcher from './components/LanguageSwitcher';
import './App.css';
import './i18n';

function App() {
  const [loading, setLoading] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);

  useEffect(() => {
    console.log('🎯 App MOUNTED');
    
    setTimeout(() => setLoading(false), 1000);

    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleAuthChange = () => {
      console.log('📢 Событие изменения auth');
      setForceUpdate(prev => prev + 1);
    };

    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('localStorageChange', handleAuthChange);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('localStorageChange', handleAuthChange);
    };
  }, []);

  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const userId = localStorage.getItem('userId');
  const isCompleted = localStorage.getItem('isCompleted') === 'true';
  const userType = localStorage.getItem('userType');
  const hasTempLogin = localStorage.getItem('tempLogin');

  console.log('🔄 App render:', { 
    isAdmin, 
    userId, 
    isCompleted, 
    userType,
    hasTempLogin,
    forceUpdate,
    networkStatus
  });

  return (
    <div className="App">
      <div className="background-orb background-orb-1"></div>
      <div className="background-orb background-orb-2"></div>
      <div className="background-orb background-orb-3"></div>
      <div className="grid-overlay"></div>
      <div className="gold-line-vertical"></div>
      <div className="gold-line-horizontal"></div>

      {/* LanguageSwitcher в правом верхнем углу, над всем контентом */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10000
      }}>
        <LanguageSwitcher />
      </div>

      <div className={`network-status ${networkStatus ? 'online' : 'offline'}`}>
        {networkStatus ? 'Online' : 'Offline'}
      </div>

      <div className="app-version">v1.0.0</div>

      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Профиль - только для email-пользователей */}
          <Route 
            path="/profile" 
            element={
              userId && !isAdmin && userType === 'email' ? 
                <UserProfile /> : 
                <Navigate to="/" replace />
            } 
          />
          
          {/* Тест - для сгенерированных, купивших, и не прошедших тест */}
          <Route 
            path="/test" 
            element={
              (() => {
                // Сгенерированные пользователи
                if (userId && !isAdmin && !isCompleted && userType === 'generated') {
                  return <TestPage />;
                }
                
                // Только что купившие тест
                if (hasTempLogin && !isCompleted) {
                  return <TestPage />;
                }
                
                // Email пользователи, которые еще не проходили тест
                if (userId && !isAdmin && !isCompleted && userType === 'email') {
                  return <TestPage />;
                }
                
                return <Navigate to="/" replace />;
              })()
            } 
          />
          
          {/* Результаты - только для прошедших тест */}
          <Route 
            path="/result" 
            element={
              (() => {
                const currentIsCompleted = localStorage.getItem('isCompleted') === 'true';
                const currentUserId = localStorage.getItem('userId');
                const currentIsAdmin = localStorage.getItem('isAdmin') === 'true';
                
                const allowed = currentUserId && !currentIsAdmin && currentIsCompleted;
                
                console.log('🔍 /result check:', {
                  currentUserId,
                  currentIsAdmin,
                  currentIsCompleted,
                  allowed
                });
                
                return allowed ? <ResultPage /> : <Navigate to="/" replace />;
              })()
            } 
          />
          
          {/* Админ панель */}
          <Route 
            path="/admin/*" 
            element={
              isAdmin ? <AdminPanel /> : <Navigate to="/" replace />
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;