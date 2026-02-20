// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './components/LoginPage';
// import TestPage from './components/TestPage';
// import AdminPanel from './components/AdminPanel';
// import ResultPage from './components/ResultPage';
// import './App.css';

// function App() {
//   const isAdmin = localStorage.getItem('isAdmin') === 'true';
//   const userId = localStorage.getItem('userId');
//   const isCompleted = localStorage.getItem('isCompleted') === 'true';

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* Публичные маршруты */}
//           <Route path="/login" element={<LoginPage />} />
          
//           {/* Маршруты тестируемого */}
//           <Route 
//             path="/test" 
//             element={
//               userId && !isCompleted ? <TestPage /> : <Navigate to="/login" />
//             } 
//           />
//           <Route 
//             path="/result" 
//             element={
//               userId && isCompleted ? <ResultPage /> : <Navigate to="/login" />
//             } 
//           />
          
//           {/* Маршруты админа */}
//           <Route 
//             path="/admin" 
//             element={
//               isAdmin ? <AdminPanel /> : <Navigate to="/login" />
//             } 
//           />
          
//           {/* Редирект по умолчанию */}
//           <Route path="/" element={<Navigate to="/login" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;






// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom'; 
// import LoginPage from './components/LoginPage';
// import TestPage from './components/TestPage';
// import AdminPanel from './components/AdminPanel';
// import ResultPage from './components/ResultPage';
// import PaymentPage from './components/PaymentPage';
// import './App.css';
// import './i18n';

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [forceUpdate, setForceUpdate] = useState(0);

//   useEffect(() => {
//     console.log('🎯 App MOUNTED');
//     setLoading(false);

//     const handleAuthChange = () => {
//       console.log('📢 Событие изменения auth');
//       setForceUpdate(prev => prev + 1);
//     };

//     window.addEventListener('storage', handleAuthChange);
//     window.addEventListener('localStorageChange', handleAuthChange);

//     return () => {
//       window.removeEventListener('storage', handleAuthChange);
//       window.removeEventListener('localStorageChange', handleAuthChange);
//     };
//   }, []);

//   // ЧИТАЕМ localStorage ПРИ КАЖДОМ РЕНДЕРЕ
//   const isAdmin = localStorage.getItem('isAdmin') === 'true';
//   const userId = localStorage.getItem('userId');
//   const isCompleted = localStorage.getItem('isCompleted') === 'true';

//   console.log('🔄 App render:', { 
//     isAdmin, 
//     userId, 
//     isCompleted, 
//     forceUpdate,
//     timestamp: new Date().toLocaleTimeString() 
//   });

//   if (loading) {
//     return <div>Загрузка приложения...</div>;
//   }

//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
        
//         <Route 
//           path="/test" 
//           element={
//             userId && !isAdmin && !isCompleted ? 
//               <TestPage /> : 
//               <Navigate to="/login" replace />
//           } 
//         />
        
//         <Route 
//           path="/result" 
//           element={
//             (() => {
//               const currentIsCompleted = localStorage.getItem('isCompleted') === 'true';
//               const currentUserId = localStorage.getItem('userId');
//               const currentIsAdmin = localStorage.getItem('isAdmin') === 'true';
              
//               const allowed = currentUserId && !currentIsAdmin && currentIsCompleted;
              
//               console.log('🔍 /result check:', {
//                 currentUserId,
//                 currentIsAdmin,
//                 currentIsCompleted,
//                 allowed
//               });
              
//               return allowed ? <ResultPage /> : <Navigate to="/login" replace />;
//             })()
//           } 
//         />
        
//         <Route 
//           path="/admin/*" 
//           element={
//             isAdmin ? <AdminPanel /> : <Navigate to="/login" replace />
//           } 
//         />
        
//         <Route path="/" element={<Navigate to="/login" replace />} />
//       </Routes>
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
import './App.css';
import './i18n';

function App() {
  const [loading, setLoading] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);

  useEffect(() => {
    console.log('🎯 App MOUNTED');
    
    // Симуляция загрузки
    setTimeout(() => setLoading(false), 1000);

    // Слушаем изменения сети
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Слушаем auth изменения
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

  console.log('🔄 App render:', { 
    isAdmin, 
    userId, 
    isCompleted, 
    forceUpdate,
    networkStatus,
    timestamp: new Date().toLocaleTimeString() 
  });

  // if (loading) {
  //   return (
  //     <div className="loading-screen">
  //       <div className="loading-spinner"></div>
  //       <div className="loading-text">PsychoTest</div>
  //       <div className="loading-progress">
  //         <div className="loading-progress-bar"></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="App">
      {/* Фоновые элементы */}
      <div className="background-orb background-orb-1"></div>
      <div className="background-orb background-orb-2"></div>
      <div className="background-orb background-orb-3"></div>
      <div className="grid-overlay"></div>
      <div className="gold-line-vertical"></div>
      <div className="gold-line-horizontal"></div>

      {/* Индикатор сети */}
      <div className={`network-status ${networkStatus ? 'online' : 'offline'}`}>
        {networkStatus ? 'Online' : 'Offline'}
      </div>

      {/* Версия приложения */}
      <div className="app-version">v1.0.0</div>

      {/* Контент */}
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route 
            path="/profile" 
            element={
              userId && !isAdmin ? <UserProfile /> : <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/test" 
            element={
              userId && !isAdmin && !isCompleted ? 
                <TestPage /> : 
                <Navigate to="/" replace />
            } 
          />
          <Route path="/register" element={<RegisterPage />} />
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