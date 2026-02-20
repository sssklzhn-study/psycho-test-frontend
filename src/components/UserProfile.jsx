import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../api/axios';
import LanguageSwitcher from './LanguageSwitcher';
import { generateIndividualPDF } from '../utils/pdfGenerator';
import './UserProfile.css';

function UserProfile() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [accesses, setAccesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswords, setShowPasswords] = useState({});
  const [testCount, setTestCount] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const userLogin = localStorage.getItem('userLogin');

  useEffect(() => {
    loadProfile();
    loadAccesses();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await API.get(`/user/profile/${userId}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
    }
  };

  const loadAccesses = async () => {
    try {
      const response = await API.get(`/user/accesses/${userId}`);
      setAccesses(response.data.accesses || []);
    } catch (error) {
      console.error('Ошибка загрузки доступов:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = (userData) => {
    const success = generateIndividualPDF(userData);
    if (!success) {
      alert(t('profile.pdf_error'));
    }
  };

  const togglePassword = (userId) => {
    setShowPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(t('profile.copied'));
  };

  const createPayment = async () => {
    try {
      setPaymentLoading(true);
      const amount = testCount * 1000;
      
      const response = await API.post('/payment/create-order', {
        amount,
        count: testCount
      });
      
      if (response.data.success) {
        setQrCode(response.data.qrCode);
        setShowPayment(true);
        checkPaymentStatus(response.data.orderId);
      }
    } catch (error) {
      console.error('Ошибка создания заказа:', error);
      alert(t('profile.payment_error'));
    } finally {
      setPaymentLoading(false);
    }
  };

  const checkPaymentStatus = async (orderId) => {
    const interval = setInterval(async () => {
      try {
        const response = await API.post(`/payment/check/${orderId}`);
        
        if (response.data.paid) {
          clearInterval(interval);
          alert(t('profile.payment_success'));
          setShowPayment(false);
          loadAccesses();
        }
      } catch (error) {
        console.error('Ошибка проверки оплаты:', error);
      }
    }, 3000);
  };

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return <div className="profile-loading">{t('loading')}</div>;
  }

  return (
    <div className="profile-container">
      <LanguageSwitcher />
      
      <div className="profile-header">
        <div className="header-left">
          <h1 className="profile-title">{t('profile.title')}</h1>
          <p className="profile-login">{userLogin}</p>
        </div>
        <button onClick={logout} className="logout-btn">
          {t('nav.logout')}
        </button>
      </div>

      {/* СТАТИСТИКА */}
      {profile && (
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">{profile.stats.totalTests}</div>
              <div className="stat-label">{t('profile.stats.total')}</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">{profile.stats.recommended}</div>
              <div className="stat-label">{t('profile.stats.recommended')}</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <div className="stat-value">{profile.stats.conditional}</div>
              <div className="stat-label">{t('profile.stats.conditional')}</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">❌</div>
            <div className="stat-content">
              <div className="stat-value">{profile.stats.notRecommended}</div>
              <div className="stat-label">{t('profile.stats.not_recommended')}</div>
            </div>
          </div>
        </div>
      )}

      {/* ИСТОРИЯ ТЕСТОВ */}
      <div className="history-section">
        <h2>{t('profile.history')}</h2>
        
        {profile?.history.length === 0 ? (
          <p className="no-history">{t('profile.no_history')}</p>
        ) : (
          <div className="history-list">
            {profile?.history.map((test, index) => (
              <div key={index} className="history-item">
                <div className="history-date">
                  {test.completedAt 
                    ? new Date(test.completedAt.seconds * 1000).toLocaleDateString()
                    : '-'}
                </div>
                <div className={`history-status ${test.recommendation?.replace(/\s+/g, '-')}`}>
                  {test.recommendation}
                </div>
                <div className="history-actions">
                  <button
                    className="history-btn pdf-btn"
                    onClick={() => downloadPDF({ 
                      login: userLogin, 
                      completedAt: test.completedAt,
                      results: test 
                    })}
                    title={t('profile.download_pdf')}
                  >
                    📥 {t('profile.pdf')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* МОИ ДОСТУПЫ (логины/пароли) */}
      <div className="accesses-section">
        <h2>{t('profile.accesses')}</h2>
        
        <div className="accesses-list">
          {accesses.map((access) => (
            <div key={access.userId} className="access-item">
              <div className="access-info">
                <div className="access-login">{access.login}</div>
                <div className="access-password">
                  {showPasswords[access.userId] ? access.password : '••••••••'}
                  <button 
                    className="toggle-password"
                    onClick={() => togglePassword(access.userId)}
                    title={showPasswords[access.userId] ? t('profile.hide_password') : t('profile.show_password')}
                  >
                    {showPasswords[access.userId] ? '👁️' : '👁️‍🗨️'}
                  </button>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(access.password)}
                    title={t('profile.copy_password')}
                  >
                    📋
                  </button>
                </div>
              </div>
              <div className="access-status">
                {access.isCompleted ? (
                  <span className="status-badge completed">{t('profile.completed')}</span>
                ) : (
                  <span className="status-badge pending">{t('profile.pending')}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ПОКУПКА НОВОГО ТЕСТА */}
      <div className="payment-section">
        <h2>{t('profile.buy_new')}</h2>
        
        {!showPayment ? (
          <div className="payment-form">
            <div className="form-group">
              <label>{t('profile.test_count')}</label>
              <input
                type="number"
                min="1"
                max="10"
                value={testCount}
                onChange={(e) => setTestCount(parseInt(e.target.value) || 1)}
                className="payment-input"
              />
            </div>
            
            <div className="payment-amount">
              <span>{t('profile.amount')}:</span>
              <span className="amount">{testCount * 1000} ₸</span>
            </div>
            
            <button
              onClick={createPayment}
              disabled={paymentLoading}
              className="payment-btn"
            >
              {paymentLoading ? t('profile.creating') : t('profile.pay_button')}
            </button>
          </div>
        ) : (
          <div className="qr-container">
            <h3>{t('profile.scan_qr')}</h3>
            <img src={qrCode} alt="Kaspi QR" className="qr-image" />
            <p className="qr-note">{t('profile.waiting_payment')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;