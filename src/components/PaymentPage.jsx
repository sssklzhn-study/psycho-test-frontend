// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import API from '../api/axios';
// import LanguageSwitcher from './LanguageSwitcher';
// import './PaymentPage.css';

// function PaymentPage() {
//   const { t } = useTranslation();
//   const [testCount, setTestCount] = useState(1);
//   const [qrCode, setQrCode] = useState(null);
//   const [orderId, setOrderId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [checking, setChecking] = useState(false);
//   const [generatedUsers, setGeneratedUsers] = useState([]);
//   const [step, setStep] = useState('form'); // form, qr, success
//   const navigate = useNavigate();

//   // const createOrder = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const amount = testCount * 1000;
      
//   //     const response = await API.post('/payment/create-order', {
//   //       amount,
//   //       count: testCount
//   //     });
      
//   //     if (response.data.success) {
//   //       setQrCode(response.data.qrCode);
//   //       setOrderId(response.data.orderId);
//   //       setStep('qr');
//   //       checkPaymentStatus(response.data.orderId);
//   //     }
//   //   } catch (error) {
//   //     console.error('Ошибка создания заказа:', error);
//   //     alert(t('payment.error') || 'Не удалось создать заказ');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const createOrder = async () => {
//   try {
//     setLoading(true);
//     const amount = testCount * 1000;
//     const userId = localStorage.getItem('userId'); // 👈 ПОЛУЧАЕМ userId
    
//     const response = await API.post('/payment/create-order', {
//       amount,
//       count: testCount,
//       userId: userId // 👈 ПЕРЕДАЕМ НА БЭКЕНД
//     });
    
//     if (response.data.success) {
//       setQrCode(response.data.qrCode);
//       setOrderId(response.data.orderId);
//       setStep('qr');
//       checkPaymentStatus(response.data.orderId);
//     }
//   } catch (error) {
//     console.error('Ошибка создания заказа:', error);
//     alert(t('payment.error') || 'Не удалось создать заказ');
//   } finally {
//     setLoading(false);
//   }
// };

//   const checkPaymentStatus = async (id) => {
//     setChecking(true);
    
//     const interval = setInterval(async () => {
//       try {
//         const response = await API.post(`/payment/check/${id}`);
        
//         if (response.data.paid) {
//           clearInterval(interval);
//           setChecking(false);
//           setGeneratedUsers(response.data.users || []);
//           setStep('success');
          
//           if (response.data.users && response.data.users.length > 0) {
//             localStorage.setItem('generatedUsers', JSON.stringify(response.data.users));
//           }
//         }
//       } catch (error) {
//         console.error('Ошибка проверки оплаты:', error);
//       }
//     }, 3000);
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     alert(t('payment.copied') || 'Скопировано!');
//   };

//   const goToLogin = () => {
//     navigate('/login');
//   };

//   return (
//     <div className="payment-container">
//       <LanguageSwitcher />
      
//       {step === 'form' && (
//         <div className="payment-card">
//           <h1 className="payment-title">{t('payment.title')}</h1>
          
//           <div className="payment-form">
//             <div className="form-group">
//               <label>{t('payment.count')}</label>
//               <input
//                 type="number"
//                 min="1"
//                 max="50"
//                 value={testCount}
//                 onChange={(e) => setTestCount(parseInt(e.target.value) || 1)}
//                 className="payment-input"
//               />
//             </div>
            
//             <div className="payment-amount">
//               <span className="amount-label">{t('payment.amount')}</span>
//               <span className="amount-value">{testCount * 1000} ₸</span>
//             </div>
            
//             <button
//               onClick={createOrder}
//               disabled={loading}
//               className="payment-button"
//             >
//               {loading ? t('loading') : t('payment.pay')}
//             </button>
//           </div>
          
//           <div className="payment-info">
//             <p>{t('payment.price_per_test')}</p>
//           </div>
//         </div>
//       )}

//       {step === 'qr' && (
//         <div className="payment-card">
//           <h1 className="payment-title">{t('payment.scan')}</h1>
          
//           <div className="qr-container">
//             <img src={qrCode} alt="Kaspi QR" className="qr-image" />
//             <p className="order-id">ID: {orderId}</p>
//             {checking && (
//               <div className="payment-waiting">
//                 <div className="spinner-small"></div>
//                 <p>{t('payment.waiting')}</p>
//               </div>
//             )}
//           </div>
          
//           <div className="payment-instructions">
//             <h3>{t('payment.instructions')}</h3>
//             <ol>
//               <li>{t('payment.instruction1')}</li>
//               <li>{t('payment.instruction2')}</li>
//               <li>{t('payment.instruction3')}</li>
//               <li>{t('payment.instruction4')}</li>
//             </ol>
//           </div>
//         </div>
//       )}

//       {step === 'success' && (
//         <div className="payment-card success-card">
//           <div className="success-icon">✅</div>
//           <h1 className="payment-title">{t('payment.success')}</h1>
          
//           <div className="users-generated">
//             <h3>{t('payment.your_logins')}</h3>
            
//             {generatedUsers.map((user, index) => (
//               <div key={index} className="user-credential">
//                 <div className="credential-row">
//                   <span className="credential-label">Логин:</span>
//                   <span className="credential-value">{user.login}</span>
//                   <button 
//                     className="copy-btn"
//                     onClick={() => copyToClipboard(user.login)}
//                   >
//                     📋
//                   </button>
//                 </div>
//                 <div className="credential-row">
//                   <span className="credential-label">Пароль:</span>
//                   <span className="credential-value">{user.password}</span>
//                   <button 
//                     className="copy-btn"
//                     onClick={() => copyToClipboard(user.password)}
//                   >
//                     📋
//                   </button>
//                 </div>
//                 {index < generatedUsers.length - 1 && <hr className="credential-divider" />}
//               </div>
//             ))}
//           </div>
          
//           <div className="payment-actions">
//             <button onClick={goToLogin} className="login-btn">
//               {t('payment.go_to_login')}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PaymentPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../api/axios';
import LanguageSwitcher from './LanguageSwitcher';
import './PaymentPage.css';

function PaymentPage() {
  const { t } = useTranslation();
  const [testCount, setTestCount] = useState(1);
  const [qrCode, setQrCode] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [generatedUsers, setGeneratedUsers] = useState([]);
  const [step, setStep] = useState('form'); // form, qr, success
  const navigate = useNavigate();

  const createOrder = async () => {
    try {
      setLoading(true);
      const amount = testCount * 1000;
      const userId = localStorage.getItem('userId');
      
      const response = await API.post('/payment/create-order', {
        amount,
        count: testCount,
        userId: userId
      });
      
      if (response.data.success) {
        setQrCode(response.data.qrCode);
        setOrderId(response.data.orderId);
        setStep('qr');
        checkPaymentStatus(response.data.orderId);
      }
    } catch (error) {
      console.error('Ошибка создания заказа:', error);
      alert(t('payment.error') || 'Не удалось создать заказ');
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async (id) => {
    setChecking(true);
    
    const interval = setInterval(async () => {
      try {
        const response = await API.post(`/payment/check/${id}`);
        
        if (response.data.paid) {
          clearInterval(interval);
          setChecking(false);
          setGeneratedUsers(response.data.users || []);
          setStep('success');
          
          if (response.data.users && response.data.users.length > 0) {
            localStorage.setItem('generatedUsers', JSON.stringify(response.data.users));
            
            // 👇 ЕСЛИ КУПИЛИ ОДИН ТЕСТ - СРАЗУ НА ТЕСТ
            if (response.data.users.length === 1) {
              const user = response.data.users[0];
              
              // Сохраняем данные для теста
              localStorage.setItem('tempLogin', user.login);
              localStorage.setItem('tempPassword', user.password);
              
              // 👇 РЕДИРЕКТ НА ТЕСТ
              setTimeout(() => {
                window.location.href = '/test';
              }, 2000);
            }
          }
        }
      } catch (error) {
        console.error('Ошибка проверки оплаты:', error);
      }
    }, 3000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(t('payment.copied') || 'Скопировано!');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="payment-container">
      <LanguageSwitcher />
      
      {step === 'form' && (
        <div className="payment-card">
          <h1 className="payment-title">{t('payment.title')}</h1>
          
          <div className="payment-form">
            <div className="form-group">
              <label>{t('payment.count')}</label>
              <input
                type="number"
                min="1"
                max="50"
                value={testCount}
                onChange={(e) => setTestCount(parseInt(e.target.value) || 1)}
                className="payment-input"
              />
            </div>
            
            <div className="payment-amount">
              <span className="amount-label">{t('payment.amount')}</span>
              <span className="amount-value">{testCount * 1000} ₸</span>
            </div>
            
            <button
              onClick={createOrder}
              disabled={loading}
              className="payment-button"
            >
              {loading ? t('loading') : t('payment.pay')}
            </button>
          </div>
          
          <div className="payment-info">
            <p>{t('payment.price_per_test')}</p>
          </div>
        </div>
      )}

      {step === 'qr' && (
        <div className="payment-card">
          <h1 className="payment-title">{t('payment.scan')}</h1>
          
          <div className="qr-container">
            <img src={qrCode} alt="Kaspi QR" className="qr-image" />
            <p className="order-id">ID: {orderId}</p>
            {checking && (
              <div className="payment-waiting">
                <div className="spinner-small"></div>
                <p>{t('payment.waiting')}</p>
              </div>
            )}
          </div>
          
          <div className="payment-instructions">
            <h3>{t('payment.instructions')}</h3>
            <ol>
              <li>{t('payment.instruction1')}</li>
              <li>{t('payment.instruction2')}</li>
              <li>{t('payment.instruction3')}</li>
              <li>{t('payment.instruction4')}</li>
            </ol>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="payment-card success-card">
          <div className="success-icon">✅</div>
          <h1 className="payment-title">{t('payment.success')}</h1>
          
          <div className="users-generated">
            <h3>{t('payment.your_logins')}</h3>
            
            {generatedUsers.map((user, index) => (
              <div key={index} className="user-credential">
                <div className="credential-row">
                  <span className="credential-label">Логин:</span>
                  <span className="credential-value">{user.login}</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(user.login)}
                  >
                    📋
                  </button>
                </div>
                <div className="credential-row">
                  <span className="credential-label">Пароль:</span>
                  <span className="credential-value">{user.password}</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(user.password)}
                  >
                    📋
                  </button>
                </div>
                {index < generatedUsers.length - 1 && <hr className="credential-divider" />}
              </div>
            ))}
          </div>
          
          <div className="payment-actions">
            <button onClick={goToLogin} className="login-btn">
              {t('payment.go_to_login')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentPage;