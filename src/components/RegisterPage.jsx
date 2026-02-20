import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import API from '../api/axios'; // 👈 ИМПОРТИРУЕМ API
import LanguageSwitcher from './LanguageSwitcher';
import './RegisterPage.css';

function RegisterPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Проверка паролей
    if (password !== confirmPassword) {
      setError(t('register.password_mismatch') || 'Пароли не совпадают');
      return;
    }
    
    if (password.length < 6) {
      setError(t('register.password_short') || 'Пароль должен быть не менее 6 символов');
      return;
    }

    try {
      setLoading(true);
      
      // 1. Создание пользователя в Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Получаем токен
      const idToken = await userCredential.user.getIdToken();
      
      console.log('🟢 Firebase токен получен, отправляем на бэкенд');
      
      // 3. Отправляем данные на бэкенд для создания в Firestore
      const response = await API.post('/auth/register', {
        idToken,
        email,
        login: email.split('@')[0] // Временный логин из email
      });
      
      if (response.data.success) {
        // 4. Отправка письма с подтверждением
        await sendEmailVerification(userCredential.user);
        
        setSuccess(true);
        
        // Перенаправление на страницу входа через 3 секунды
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
      
    } catch (err) {
      console.error('❌ Ошибка регистрации:', err);
      
      if (err.code === 'auth/email-already-in-use') {
        setError(t('register.email_exists') || 'Этот email уже зарегистрирован');
      } else if (err.code === 'auth/invalid-email') {
        setError(t('register.invalid_email') || 'Некорректный email');
      } else if (err.response?.status === 400) {
        setError(err.response.data.detail || 'Ошибка при создании профиля');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <LanguageSwitcher />
      <div className="register-card">
        <h1 className="register-title">{t('register.title') || 'Регистрация'}</h1>
        <p className="register-subtitle">
          {t('register.subtitle') || 'Создайте аккаунт для доступа к тестированию'}
        </p>
        
        {success ? (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h3>{t('register.success_title') || 'Регистрация успешна!'}</h3>
            <p>{t('register.success_message') || 'На вашу почту отправлено письмо с подтверждением'}</p>
            <p>{t('register.redirect') || 'Вы будете перенаправлены на страницу входа...'}</p>
          </div>
        ) : (
          <>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="email">{t('register.email') || 'Email'}</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">{t('register.password') || 'Пароль'}</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">{t('register.confirm_password') || 'Подтвердите пароль'}</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="form-input"
                />
              </div>
              
              <button 
                type="submit" 
                className="register-button"
                disabled={loading}
              >
                {loading ? t('loading') : (t('register.button') || 'Зарегистрироваться')}
              </button>
            </form>

            <div className="register-links">
              <p>
                {t('register.has_account') || 'Уже есть аккаунт?'} 
                <Link to="/login" className="login-link">
                  {t('nav.login') || 'Войти'}
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;