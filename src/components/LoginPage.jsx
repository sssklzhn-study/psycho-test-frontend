import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth, signInWithEmailAndPassword } from '../firebase';
import API from '../api/axios';
import LanguageSwitcher from './LanguageSwitcher';
import './LoginPage.css';

function LoginPage() {
  const { t } = useTranslation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (login === 'admin') {
        console.log('🟡 Попытка входа администратора через Firebase');
        
        const userCredential = await signInWithEmailAndPassword(
          auth, 
          'admin@psychotest.com', 
          password
        );
        
        const idToken = await userCredential.user.getIdToken();
        
        console.log('🟢 Firebase токен получен, отправляем на бэкенд');
        
        const response = await API.post('/auth/firebase-admin', {
          idToken
        });

        if (response.data.success) {
          localStorage.setItem('isAdmin', 'true');
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('userLogin', 'admin');
          localStorage.setItem('isCompleted', 'false');
          
          console.log('✅ Админ авторизован, перенаправление...');
          
          // 👇 АДМИН ИДЕТ В АДМИНКУ!
          window.location.href = '/admin';
        }
        return;
      }

      console.log('🟡 Вход через Firebase');
      
      const userCredential = await signInWithEmailAndPassword(auth, login, password);
      
      const idToken = await userCredential.user.getIdToken();
      
      console.log('🟢 Firebase токен получен, отправляем на бэкенд');
      
      const response = await API.post('/auth/firebase-login', {
        idToken,
        login,
        password
      });

      if (response.data.success) {
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('userLogin', response.data.login);
        localStorage.setItem('isCompleted', response.data.isCompleted);
        localStorage.setItem('isAdmin', 'false');

        console.log('✅ Пользователь авторизован');
        
        // 👇 ОБЫЧНЫЙ ПОЛЬЗОВАТЕЛЬ ИДЕТ НА ГЛАВНУЮ
        window.location.href = '/';
      }
    } catch (err) {
      console.error('🔴 Ошибка входа:', err);
      
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError(t('login.error.invalid'));
      } else if (err.code === 'auth/user-not-found') {
        setError(t('login.error.invalid'));
      } else if (err.code === 'auth/too-many-requests') {
        setError('Слишком много попыток. Попробуйте позже');
      } else {
        setError(err.response?.data?.detail || t('login.error.invalid'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <LanguageSwitcher />
      <div className="login-card">
        <h1 className="login-title">{t('login.title')}</h1>
        <p className="login-subtitle">{t('login.subtitle')}</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="login">{t('login.username')}</label>
            <input
              type="text"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder={t('login.placeholder.username')}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">{t('login.password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('login.placeholder.password')}
              required
              className="form-input"
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? t('loading') : t('login.button')}
          </button>
        </form>

        <div className="register-link-container">
          <p className="register-link-text">
            {t('register.no_account') || 'Нет аккаунта?'} 
            <Link to="/register" className="register-link-btn">
              {t('register.button') || 'Зарегистрироваться'}
            </Link>
          </p>
        </div>

        <div className="payment-link-container">
          <p className="payment-link-text">
            {t('payment.no_login') || 'Нет логина?'} 
            <button 
              className="payment-link-btn"
              onClick={() => navigate('/payment')}
            >
              {t('payment.buy_access') || 'Купить доступ'}
            </button>
          </p>
        </div>

        <div className="login-info">
          <p>{t('login.user.hint')}</p>
          <p>{t('login.admin.hint')}</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;