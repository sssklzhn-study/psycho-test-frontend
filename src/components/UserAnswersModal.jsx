import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../api/axios';
import './UserAnswersModal.css';

function UserAnswersModal({ userId, userLogin, onClose }) {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    yes: 0,
    no: 0,
    totalPoints: 0
  });

  useEffect(() => {
    loadAnswers();
  }, [userId]);

  const loadAnswers = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/admin/user-answers/${userId}`);
      setAnswers(response.data.answers || []);
      setResults(response.data.results);
      
      // Подсчет статистики
      const yesCount = response.data.answers.filter(a => a.answer === true).length;
      const noCount = response.data.answers.filter(a => a.answer === false).length;
      const totalPoints = response.data.answers.reduce((sum, a) => sum + (a.points || 0), 0);
      
      setStats({
        total: response.data.answers.length,
        yes: yesCount,
        no: noCount,
        totalPoints: totalPoints
      });
      
    } catch (error) {
      console.error('Ошибка загрузки ответов:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{t('admin.modal.title', { login: userLogin })}</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>

        {loading ? (
          <div className="modal-loading">{t('loading')}</div>
        ) : (
          <>
            {/* Статистика */}
            <div className="answers-stats">
              <div className="stat-item">
                <span className="stat-label">{t('admin.modal.total_answers')}</span>
                <span className="stat-value">{stats.total}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">{t('admin.modal.yes_answers')}</span>
                <span className="stat-value">{stats.yes}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">{t('admin.modal.no_answers')}</span>
                <span className="stat-value">{stats.no}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">{t('admin.modal.total_points')}</span>
                <span className="stat-value">{stats.totalPoints}</span>
              </div>
            </div>

            {/* Результаты теста */}
            {results && (
              <div className="test-results">
                <h3>{t('admin.modal.test_results')}</h3>
                <div className="results-grid">
                  {Object.entries(results.scores || {}).map(([key, value]) => (
                    <div key={key} className="result-item">
                      <span className="result-key">{key}:</span>
                      <span className="result-value">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="recommendation">
                  <strong>{t('admin.modal.recommendation')}:</strong> {results.recommendation}
                </div>
              </div>
            )}

            {/* Таблица ответов */}
            <div className="answers-table-container">
              <table className="answers-table">
                <thead>
                  <tr>
                    <th>{t('admin.modal.question_number')}</th>
                    <th>{t('admin.modal.answer')}</th>
                    <th>{t('admin.modal.points')}</th>
                    <th>{t('admin.modal.date')}</th>
                  </tr>
                </thead>
                <tbody>
                  {answers.map((ans, idx) => (
                    <tr key={idx}>
                      <td>{ans.questionNumber}</td>
                      <td>
                        <span className={`answer-badge ${ans.answer ? 'yes' : 'no'}`}>
                          {ans.answerText}
                        </span>
                      </td>
                      <td>{ans.points}</td>
                      <td>
                        {ans.submittedAt 
                          ? new Date(ans.submittedAt.seconds * 1000).toLocaleString() 
                          : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserAnswersModal;