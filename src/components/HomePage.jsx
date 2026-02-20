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
  
  // 👇 ПРОСТО ЧИТАЕМ ИЗ localStorage КАЖДЫЙ РАЗ
  const userId = localStorage.getItem('userId');
  const userLogin = localStorage.getItem('userLogin');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isAuthenticated = userId && !isAdmin;

  console.log('🏠 Рендер HomePage:', { isAuthenticated, userLogin, userId });

  useEffect(() => {
    if (isAuthenticated && userId) {
      loadUserData();
    }
  }, []); // Загружаем только один раз

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
    alert('Скопировано!');
  };

  const startTest = (login, password) => {
    localStorage.setItem('tempLogin', login);
    localStorage.setItem('tempPassword', password);
    navigate('/test');
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/'; // 👈 ПОЛНАЯ ПЕРЕЗАГРУЗКА
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
              <button 
                onClick={() => navigate('/profile')}
                className="profile-btn"
              >
                👤 Личный кабинет
              </button>
              <button 
                onClick={handleLogout}
                className="logout-btn"
              >
                Выйти
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => navigate('/register')}
                className="register-nav-btn"
              >
                📝 Регистрация
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="login-btn"
              >
                🔐 Войти
              </button>
            </>
          )}
        </div>
      </div>

      {/* Герой-секция */}
      <div className="hero-section">
        <h1 className="hero-title">
          Профессиональное психологическое тестирование
        </h1>
        <p className="hero-subtitle">
          160 вопросов · 6 шкал · Точная методика
        </p>
      </div>

      {isAuthenticated ? (
        /* ===== КОНТЕНТ ДЛЯ АВТОРИЗОВАННЫХ ===== */
        <div className="authenticated-content">
          
          {/* БЛОК ПОКУПКИ */}
          <div className="purchase-block">
            <h2>💳 Приобрести новый тест</h2>
            <button 
              onClick={() => navigate('/payment')}
              className="purchase-btn"
            >
              🚀 Купить тест (1000 ₸)
            </button>
          </div>

          {/* БЛОК ДОСТУПОВ */}
          <div className="accesses-block">
            <h2>🔑 Мои доступы</h2>
            {loading ? (
              <p>Загрузка...</p>
            ) : accesses.length === 0 ? (
              <p className="no-data">У вас пока нет активных доступов</p>
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
                          ▶️ Пройти тест
                        </button>
                      ) : (
                        <span className="completed-badge">✅ Пройден</span>
                      )}
                      <button 
                        onClick={() => copyToClipboard(access.login)}
                        className="copy-btn"
                        title="Копировать логин"
                      >
                        📋
                      </button>
                      <button 
                        onClick={() => copyToClipboard(access.password)}
                        className="copy-btn"
                        title="Копировать пароль"
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
            <h2>📊 Последние результаты</h2>
            {loading ? (
              <p>Загрузка...</p>
            ) : history.length === 0 ? (
              <p className="no-data">У вас пока нет пройденных тестов</p>
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
                    📋 Все результаты
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
            <h2 className="section-title">Почему выбирают нас?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🔬</div>
                <h3>Научная методика</h3>
                <p>Тест основан на профессиональных психологических методиках</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>6 шкал оценки</h3>
                <p>Достоверность, психопатия, истероидность и другие</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Анонимно и безопасно</h3>
                <p>Все результаты хранятся в вашем личном кабинете</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Доступно везде</h3>
                <p>Проходите тест с любого устройства</p>
              </div>
            </div>
          </div>

          {/* Как это работает */}
          <div className="how-it-works">
            <h2 className="section-title">Как это работает?</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Зарегистрируйтесь</h3>
                  <p>Создайте аккаунт за 1 минуту</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Купите тест</h3>
                  <p>Через Kaspi QR (1000 ₸ за тест)</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Пройдите тест</h3>
                  <p>160 вопросов за 20-30 минут</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Изучите результаты</h3>
                  <p>Подробный отчет по всем шкалам</p>
                </div>
              </div>
            </div>
          </div>

          {/* Призыв к действию */}
          <div className="cta-section">
            <h2 className="cta-title">Готовы узнать себя лучше?</h2>
            <button 
              onClick={() => navigate('/register')}
              className="cta-large-btn"
            >
              📝 Зарегистрироваться
            </button>
          </div>
        </div>
      )}

      {/* Футер */}
      <div className="home-footer">
        <p>© 2026 PsychoTest. Все права защищены</p>
      </div>
    </div>
  );
}

export default HomePage;