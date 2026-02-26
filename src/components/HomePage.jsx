// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import LanguageSwitcher from './LanguageSwitcher';
// import API from '../api/axios';
// import './HomePage.css';

// function HomePage() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [accesses, setAccesses] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
  
//   // 👇 ПРОСТО ЧИТАЕМ ИЗ localStorage КАЖДЫЙ РАЗ
//   const userId = localStorage.getItem('userId');
//   const userLogin = localStorage.getItem('userLogin');
//   const isAdmin = localStorage.getItem('isAdmin') === 'true';
//   const isAuthenticated = userId && !isAdmin;

//   console.log('🏠 Рендер HomePage:', { isAuthenticated, userLogin, userId });

//   useEffect(() => {
//     if (isAuthenticated && userId) {
//       loadUserData();
//     }
//   }, []); // Загружаем только один раз

//   const loadUserData = async () => {
//     try {
//       setLoading(true);
//       console.log('📥 Загружаем данные для:', userId);
      
//       const accessesRes = await API.get(`/user/accesses/${userId}`);
//       setAccesses(accessesRes.data.accesses || []);
      
//       const historyRes = await API.get(`/user/profile/${userId}`);
//       setHistory(historyRes.data.history || []);
//     } catch (error) {
//       console.error('Ошибка загрузки:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     alert(t('common.copied') || 'Скопировано!');
//   };

//   const startTest = (login, password) => {
//     localStorage.setItem('tempLogin', login);
//     localStorage.setItem('tempPassword', password);
//     navigate('/test');
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = '/'; // 👈 ПОЛНАЯ ПЕРЕЗАГРУЗКА
//   };

//   return (
//     <div className="home-container">
//       {/* Шапка с навигацией */}
//       <div className="home-header">
//         <div className="logo">
//           <span className="logo-icon">🧠</span>
//           <span className="logo-text">PsychoTest</span>
//         </div>
        
//         <div className="header-actions">
//           <LanguageSwitcher />
          
//           {isAuthenticated ? (
//             <div className="user-menu">
//               <span className="user-greeting">👋 {userLogin || userId}</span>
//               <button 
//                 onClick={() => navigate('/profile')}
//                 className="profile-btn"
//               >
//                 {t('home.view_profile')}
//               </button>
//               <button 
//                 onClick={handleLogout}
//                 className="logout-btn"
//               >
//                 {t('home.logout')}
//               </button>
//             </div>
//           ) : (
//             <>
//               <button 
//                 onClick={() => navigate('/register')}
//                 className="register-nav-btn"
//               >
//                 {t('home.guest_content.cta.button')}
//               </button>
//               <button 
//                 onClick={() => navigate('/login')}
//                 className="login-btn"
//               >
//                 {t('nav.login')}
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Герой-секция */}
//       <div className="hero-section">
//         <h1 className="hero-title">
//           {t('home.title')}
//         </h1>
//         <p className="hero-subtitle">
//           {t('home.subtitle')}
//         </p>
//       </div>

//       {isAuthenticated ? (
//         /* ===== КОНТЕНТ ДЛЯ АВТОРИЗОВАННЫХ ===== */
//         <div className="authenticated-content">
          
//           {/* БЛОК ПОКУПКИ */}
//           <div className="purchase-block">
//             <h2>{t('home.purchase_new')}</h2>
//             <button 
//               onClick={() => navigate('/payment')}
//               className="purchase-btn"
//             >
//               {t('home.purchase_button')}
//             </button>
//           </div>

//           {/* БЛОК ДОСТУПОВ */}
//           <div className="accesses-block">
//             <h2>{t('home.my_accesses')}</h2>
//             {loading ? (
//               <p>{t('loading')}</p>
//             ) : accesses.length === 0 ? (
//               <p className="no-data">{t('home.no_accesses')}</p>
//             ) : (
//               <div className="accesses-list">
//                 {accesses.map((access) => (
//                   <div key={access.userId} className="access-card">
//                     <div className="access-login">{access.login}</div>
//                     <div className="access-actions">
//                       {!access.isCompleted ? (
//                         <button 
//                           onClick={() => startTest(access.login, access.password)}
//                           className="start-test-btn"
//                         >
//                           {t('home.start_test')}
//                         </button>
//                       ) : (
//                         <span className="completed-badge">{t('home.completed')}</span>
//                       )}
//                       <button 
//                         onClick={() => copyToClipboard(access.login)}
//                         className="copy-btn"
//                         title={t('home.copy_login')}
//                       >
//                         📋
//                       </button>
//                       <button 
//                         onClick={() => copyToClipboard(access.password)}
//                         className="copy-btn"
//                         title={t('home.copy_password')}
//                       >
//                         🔑
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* БЛОК ИСТОРИИ */}
//           <div className="recent-results">
//             <h2>{t('home.recent_results')}</h2>
//             {loading ? (
//               <p>{t('loading')}</p>
//             ) : history.length === 0 ? (
//               <p className="no-data">{t('home.no_results')}</p>
//             ) : (
//               <div className="results-preview">
//                 {history.slice(0, 3).map((item, idx) => (
//                   <div key={idx} className="result-preview-card">
//                     <div className="result-date">
//                       {new Date(item.completedAt.seconds * 1000).toLocaleDateString()}
//                     </div>
//                     <div className={`result-status ${item.recommendation?.replace(/\s+/g, '-')}`}>
//                       {item.recommendation}
//                     </div>
//                   </div>
//                 ))}
//                 {history.length > 3 && (
//                   <button 
//                     onClick={() => navigate('/profile')}
//                     className="view-all-btn"
//                   >
//                     {t('home.all_results')}
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         /* ===== КОНТЕНТ ДЛЯ ГОСТЕЙ ===== */
//         <div className="guest-content">
//           {/* Преимущества */}
//           <div className="features-section">
//             <h2 className="section-title">{t('home.guest_content.features_title')}</h2>
//             <div className="features-grid">
//               <div className="feature-card">
//                 <div className="feature-icon">🔬</div>
//                 <h3>{t('home.guest_content.features.scientific.title')}</h3>
//                 <p>{t('home.guest_content.features.scientific.desc')}</p>
//               </div>
//               <div className="feature-card">
//                 <div className="feature-icon">📊</div>
//                 <h3>{t('home.guest_content.features.scales.title')}</h3>
//                 <p>{t('home.guest_content.features.scales.desc')}</p>
//               </div>
//               <div className="feature-card">
//                 <div className="feature-icon">🔒</div>
//                 <h3>{t('home.guest_content.features.anonymous.title')}</h3>
//                 <p>{t('home.guest_content.features.anonymous.desc')}</p>
//               </div>
//               <div className="feature-card">
//                 <div className="feature-icon">📱</div>
//                 <h3>{t('home.guest_content.features.anywhere.title')}</h3>
//                 <p>{t('home.guest_content.features.anywhere.desc')}</p>
//               </div>
//             </div>
//           </div>

//           {/* Как это работает */}
//           <div className="how-it-works">
//             <h2 className="section-title">{t('home.guest_content.how_it_works')}</h2>
//             <div className="steps">
//               <div className="step">
//                 <div className="step-number">1</div>
//                 <div className="step-content">
//                   <h3>{t('home.guest_content.steps.register.title')}</h3>
//                   <p>{t('home.guest_content.steps.register.desc')}</p>
//                 </div>
//               </div>
//               <div className="step">
//                 <div className="step-number">2</div>
//                 <div className="step-content">
//                   <h3>{t('home.guest_content.steps.buy.title')}</h3>
//                   <p>{t('home.guest_content.steps.buy.desc')}</p>
//                 </div>
//               </div>
//               <div className="step">
//                 <div className="step-number">3</div>
//                 <div className="step-content">
//                   <h3>{t('home.guest_content.steps.take.title')}</h3>
//                   <p>{t('home.guest_content.steps.take.desc')}</p>
//                 </div>
//               </div>
//               <div className="step">
//                 <div className="step-number">4</div>
//                 <div className="step-content">
//                   <h3>{t('home.guest_content.steps.results.title')}</h3>
//                   <p>{t('home.guest_content.steps.results.desc')}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Призыв к действию */}
//           <div className="cta-section">
//             <h2 className="cta-title">{t('home.guest_content.cta.title')}</h2>
//             <button 
//               onClick={() => navigate('/register')}
//               className="cta-large-btn"
//             >
//               {t('home.guest_content.cta.button')}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Футер */}
//       <div className="home-footer">
//         <p>{t('home.rights')}</p>
//       </div>
//     </div>
//   );
// }

// export default HomePage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import API from '../api/axios';
import './HomePage.css';

function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [accesses, setAccesses] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const userId = localStorage.getItem('userId');
  const userLogin = localStorage.getItem('userLogin');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const userType = localStorage.getItem('userType');
  const isAuthenticated = userId && !isAdmin;

  console.log('🏠 Рендер HomePage:', { isAuthenticated, userLogin, userId, userType });

  useEffect(() => {
    if (isAuthenticated && userId) {
      loadUserData();
    }
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      console.log('📥 Загружаем данные для:', userId);
      
      const accessesRes = await API.get(`/user/accesses/${userId}`);
      setAccesses(accessesRes.data.accesses || []);
      
      const historyRes = await API.get(`/user/profile/${userId}`);
      setHistory(historyRes.data.history || []);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(t('common.copied') || 'Скопировано!');
  };

  const startTest = (login, password) => {
    localStorage.setItem('tempLogin', login);
    localStorage.setItem('tempPassword', password);
    navigate('/test');
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="home-container">
      {/* Шапка с навигацией */}
      <div className="home-header">
        <div className="logo">
          <span className="logo-icon">🧠</span>
          <span className="logo-text">PsychoTest</span>
        </div>
        
        <div className="header-actions">
          <LanguageSwitcher />
          
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-greeting">👋 {userLogin || userId}</span>
              {userType === 'email' && (
                <button 
                  onClick={() => navigate('/profile')}
                  className="profile-btn"
                >
                  {t('home.view_profile')}
                </button>
              )}
              <button 
                onClick={handleLogout}
                className="logout-btn"
              >
                {t('home.logout')}
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => navigate('/register')}
                className="register-nav-btn"
              >
                {t('home.guest_content.cta.button')}
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="login-btn"
              >
                {t('nav.login')}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Герой-секция */}
      <div className="hero-section">
        <h1 className="hero-title">
          {t('home.title')}
        </h1>
        <p className="hero-subtitle">
          {t('home.subtitle')}
        </p>
      </div>

      {isAuthenticated ? (
        /* ===== КОНТЕНТ ДЛЯ АВТОРИЗОВАННЫХ ===== */
        <div className="authenticated-content">
          
          {/* БЛОК ПОКУПКИ - ТОЛЬКО ДЛЯ EMAIL-ПОЛЬЗОВАТЕЛЕЙ */}
          {userType === 'email' && (
            <div className="purchase-block">
              <h2>{t('home.purchase_new')}</h2>
              <button 
                onClick={() => navigate('/payment')}
                className="purchase-btn"
              >
                {t('home.purchase_button')}
              </button>
            </div>
          )}

          {/* БЛОК ДОСТУПОВ */}
          <div className="accesses-block">
            <h2>{t('home.my_accesses')}</h2>
            {loading ? (
              <p>{t('loading')}</p>
            ) : accesses.length === 0 ? (
              <p className="no-data">{t('home.no_accesses')}</p>
            ) : (
              <div className="accesses-list">
                {accesses.map((access) => (
                  <div key={access.userId} className="access-card">
                    <div className="access-login">{access.login}</div>
                    <div className="access-actions">
                      {!access.isCompleted ? (
                        <button 
                          onClick={() => startTest(access.login, access.password)}
                          className="start-test-btn"
                        >
                          {t('home.start_test')}
                        </button>
                      ) : (
                        <span className="completed-badge">{t('home.completed')}</span>
                      )}
                      <button 
                        onClick={() => copyToClipboard(access.login)}
                        className="copy-btn"
                        title={t('home.copy_login')}
                      >
                        📋
                      </button>
                      <button 
                        onClick={() => copyToClipboard(access.password)}
                        className="copy-btn"
                        title={t('home.copy_password')}
                      >
                        🔑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* БЛОК ИСТОРИИ */}
          <div className="recent-results">
            <h2>{t('home.recent_results')}</h2>
            {loading ? (
              <p>{t('loading')}</p>
            ) : history.length === 0 ? (
              <p className="no-data">{t('home.no_results')}</p>
            ) : (
              <div className="results-preview">
                {history.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="result-preview-card">
                    <div className="result-date">
                      {new Date(item.completedAt.seconds * 1000).toLocaleDateString()}
                    </div>
                    <div className={`result-status ${item.recommendation?.replace(/\s+/g, '-')}`}>
                      {item.recommendation}
                    </div>
                  </div>
                ))}
                {history.length > 3 && (
                  <button 
                    onClick={() => navigate('/profile')}
                    className="view-all-btn"
                  >
                    {t('home.all_results')}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ===== КОНТЕНТ ДЛЯ ГОСТЕЙ ===== */
        <div className="guest-content">
          {/* Преимущества */}
          <div className="features-section">
            <h2 className="section-title">{t('home.guest_content.features_title')}</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🔬</div>
                <h3>{t('home.guest_content.features.scientific.title')}</h3>
                <p>{t('home.guest_content.features.scientific.desc')}</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>{t('home.guest_content.features.scales.title')}</h3>
                <p>{t('home.guest_content.features.scales.desc')}</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>{t('home.guest_content.features.anonymous.title')}</h3>
                <p>{t('home.guest_content.features.anonymous.desc')}</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>{t('home.guest_content.features.anywhere.title')}</h3>
                <p>{t('home.guest_content.features.anywhere.desc')}</p>
              </div>
            </div>
          </div>

          {/* Как это работает */}
          <div className="how-it-works">
            <h2 className="section-title">{t('home.guest_content.how_it_works')}</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>{t('home.guest_content.steps.register.title')}</h3>
                  <p>{t('home.guest_content.steps.register.desc')}</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>{t('home.guest_content.steps.buy.title')}</h3>
                  <p>{t('home.guest_content.steps.buy.desc')}</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>{t('home.guest_content.steps.take.title')}</h3>
                  <p>{t('home.guest_content.steps.take.desc')}</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>{t('home.guest_content.steps.results.title')}</h3>
                  <p>{t('home.guest_content.steps.results.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Призыв к действию */}
          <div className="cta-section">
            <h2 className="cta-title">{t('home.guest_content.cta.title')}</h2>
            <button 
              onClick={() => navigate('/register')}
              className="cta-large-btn"
            >
              {t('home.guest_content.cta.button')}
            </button>
          </div>
        </div>
      )}

      {/* Футер */}
      <div className="home-footer">
        <p>{t('home.rights')}</p>
      </div>
    </div>
  );
}

export default HomePage;
