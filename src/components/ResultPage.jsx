import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../api/axios';
import LanguageSwitcher from './LanguageSwitcher';
import { generateIndividualPDF } from '../utils/pdfGenerator';
import './ResultPage.css';

function ResultPage() {
  const { t } = useTranslation();
  console.log('🔥🔥🔥 RESULT PAGE УСПЕШНО ЗАГРУЗИЛАСЬ! 🔥🔥🔥');
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [hasRetest, setHasRetest] = useState(false);
  const [retestScales, setRetestScales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('📋 ResultPage useEffect сработал');
    loadResults();
    
    const userData = {
      login: localStorage.getItem('userLogin'),
      completedAt: localStorage.getItem('completedAt'),
      results: null
    };
    setUser(userData);
  }, []);

  // Функция для проверки наличия ретеста
  const checkForRetest = (interpretations) => {
    if (!interpretations) return false;
    
    const retestFound = [];
    let hasRetestAny = false;
    
    Object.entries(interpretations).forEach(([key, value]) => {
      if (value.includes('ретест')) {
        hasRetestAny = true;
        retestFound.push(key);
      }
    });
    
    setHasRetest(hasRetestAny);
    setRetestScales(retestFound);
    return hasRetestAny;
  };

  const loadResults = async () => {
    try {
      const userId = localStorage.getItem('userId');
      console.log('📥 Загружаем результаты для userId:', userId);
      
      const response = await API.get(`/test/result/${userId}`);
      console.log('✅ Результаты получены:', response.data);
      setResults(response.data);
      
      // Проверяем на ретест
      checkForRetest(response.data.interpretations);
      
      setUser(prev => ({
        ...prev,
        results: response.data,
        completedAt: response.data.completedAt
      }));
    } catch (error) {
      console.error('❌ Ошибка загрузки:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!user || !user.results) {
      alert('Данные еще не загружены');
      return;
    }
    
    const success = generateIndividualPDF(user);
    if (!success) {
      alert('Не удалось создать PDF');
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="result-loading">
        <div className="spinner"></div>
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="result-container">
        <div className="result-card">
          <h1 className="result-title">{t('error')}</h1>
          <p className="error-message">{error}</p>
          <button onClick={logout} className="logout-result-btn">
            {t('nav.logout')}
          </button>
        </div>
      </div>
    );
  }

  // Функция для получения названия шкалы по ключу
  const getScaleName = (key) => {
    switch(key) {
      case 'Isk': return t('result.scale.isk');
      case 'Con': return t('result.scale.con');
      case 'NPN': return t('result.scale.npn');
      case 'Psi': return t('result.scale.psi');
      case 'Ist': return t('result.scale.ist');
      case 'Ast': return t('result.scale.ast');
      default: return key;
    }
  };

  return (
    <div className="result-container">
      {/* <LanguageSwitcher /> */}
      <div className="result-card">
        <h1 className="result-title">{t('result.title')}</h1>
        <p className="result-subtitle">
          {t('result.thanks', { name: localStorage.getItem('userLogin') })}
        </p>

        <div className="result-summary">
          <h2>{t('result.your_results')}</h2>
          
          {hasRetest ? (
            // ЕСЛИ ЕСТЬ РЕТЕСТ - ПОКАЗЫВАЕМ ТОЛЬКО ПРЕДУПРЕЖДЕНИЕ
            <div className="retest-warning">
              <div className="warning-icon">⚠️</div>
              <h3>Требуется повторное тестирование</h3>
              <p>По результатам теста выявлены недостоверные ответы по следующим шкалам:</p>
              
              <div className="retest-scales">
                {retestScales.map(scale => (
                  <div key={scale} className="retest-scale-item">
                    <span className="retest-scale-name">{getScaleName(scale)}</span>
                    <span className="retest-scale-value">{results?.interpretations?.[scale]}</span>
                  </div>
                ))}
              </div>
              
              <p className="retest-note">
                Пожалуйста, пройдите тест повторно через 2 недели для получения достоверных результатов.
              </p>
            </div>
          ) : (
            // ЕСЛИ НЕТ РЕТЕСТА - ПОКАЗЫВАЕМ ВСЕ ШКАЛЫ
            <div className="result-grid">
              <div className="result-item">
                <span className="result-label">{t('result.scale.isk')}:</span>
                <span className="result-value">
                  {results?.interpretations?.Isk || '-'}
                </span>
              </div>

              <div className="result-item">
                <span className="result-label">{t('result.scale.con')}:</span>
                <span className="result-value">
                  {results?.interpretations?.Con || '-'}
                </span>
              </div>

              <div className="result-item">
                <span className="result-label">{t('result.scale.npn')}:</span>
                <span className="result-value">
                  {results?.interpretations?.NPN || '-'}
                </span>
              </div>

              <div className="result-item">
                <span className="result-label">{t('result.scale.psi')}:</span>
                <span className="result-value">
                  {results?.interpretations?.Psi || '-'}
                </span>
              </div>

              <div className="result-item">
                <span className="result-label">{t('result.scale.ist')}:</span>
                <span className="result-value">
                  {results?.interpretations?.Ist || '-'}
                </span>
              </div>

              <div className="result-item">
                <span className="result-label">{t('result.scale.ast')}:</span>
                <span className="result-value">
                  {results?.interpretations?.Ast || '-'}
                </span>
              </div>
            </div>
          )}

          <div className="result-recommendation">
            <h3>{t('result.recommendation')}</h3>
            <p className={`recommendation-text ${results?.recommendation}`}>
              {results?.recommendation === 'рекомендован' && t('result.recommended')}
              {results?.recommendation === 'условно рекомендован' && t('result.conditional')}
              {results?.recommendation === 'не рекомендован' && t('result.not_recommended')}
              {results?.recommendation === 'ретест' && t('result.retest')}
            </p>
          </div>
        </div>

        <div className="result-actions">
          <button onClick={downloadPDF} className="download-btn">
            {t('result.download_pdf')}
          </button>
          <button onClick={logout} className="logout-result-btn">
            {t('nav.logout')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;