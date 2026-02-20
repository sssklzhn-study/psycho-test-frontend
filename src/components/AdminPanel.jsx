import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../api/axios';
import AdminDashboard from './AdminDashboard';
import LanguageSwitcher from './LanguageSwitcher';
import UserAnswersModal from './UserAnswersModal';
import './AdminPanel.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { generateUsersPDF, generateSummaryPDF, generateIndividualPDF } from '../utils/pdfGenerator';

function AdminPanel() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generateCount, setGenerateCount] = useState(5);
  const [generatedUsers, setGeneratedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Состояния для модального окна с ответами
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAnswersModal, setShowAnswersModal] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
    loadResults();
    loadBatches();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await API.get('/admin/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
    }
  };

  const loadResults = async () => {
    try {
      const response = await API.get('/admin/results');
      console.log('📊 Загружено результатов:', response.data.results.length);
    } catch (error) {
      console.error('Ошибка загрузки результатов:', error);
    }
  };

  const loadBatches = async () => {
    try {
      const response = await API.get('/admin/batches');
      setBatches(response.data.batches || []);
    } catch (error) {
      console.error('Ошибка загрузки потоков:', error);
    }
  };

  const createNewBatch = async () => {
    try {
      const response = await API.post('/admin/new-batch');
      if (response.data.success) {
        alert(`✅ Поток #${response.data.batch} создан`);
        loadBatches();
      }
    } catch (error) {
      console.error('Ошибка создания потока:', error);
      alert('❌ Ошибка при создании потока');
    }
  };

  const generateUsers = async () => {
    try {
      setLoading(true);
      const response = await API.post('/admin/generate-users', {
        count: generateCount
      });

      if (response.data.success) {
        setGeneratedUsers(response.data.users);
        loadUsers();
        loadBatches();
        alert(t('admin.generate.success', { count: response.data.count }));
      }
    } catch (error) {
      console.error('Ошибка генерации:', error);
      alert('❌ Ошибка при создании пользователей');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSummaryPDF = () => {
    const success = generateSummaryPDF(users);
    if (!success) {
      alert('❌ Не удалось создать PDF ведомость');
    }
  };

  const handleDownloadUserPDF = (user) => {
    const success = generateIndividualPDF(user);
    if (!success) {
      alert('❌ Не удалось создать PDF результат');
    }
  };

  const handleDownloadUsersPDF = () => {
    const dataToExport = generatedUsers.length > 0 ? generatedUsers : users.filter(u => u.login !== 'admin');
    const success = generateUsersPDF(dataToExport, 'users');
    if (!success) {
      alert('❌ Не удалось создать PDF список пользователей');
    }
  };

  const exportToExcel = (data, filename) => {
    try {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) {
      console.error('Ошибка экспорта в Excel:', error);
      alert('❌ Не удалось экспортировать в Excel');
    }
  };

  const exportGeneratedUsers = (format) => {
    if (!generatedUsers.length && !users.length) {
      alert('❌ Нет данных для экспорта');
      return;
    }

    const dataToExport = generatedUsers.length > 0 ? generatedUsers : users.filter(u => u.login !== 'admin');
    
    const exportData = dataToExport.map((user, index) => ({
      '№': index + 1,
      'Логин': user.login || '',
      'Пароль': user.password || '********',
      'Статус': user.isCompleted ? t('admin.users.filter.completed') : t('admin.users.filter.pending'),
      'Дата создания': user.createdAt 
        ? new Date(user.createdAt.seconds * 1000).toLocaleDateString('ru-RU') 
        : new Date().toLocaleDateString('ru-RU')
    }));

    if (format === 'excel') {
      exportToExcel(exportData, 'users');
    } else if (format === 'pdf') {
      handleDownloadUsersPDF();
    }
  };

  const exportResultsToExcel = () => {
    const completedUsers = users.filter(user => user.isCompleted && user.login !== 'admin');
    
    if (!completedUsers.length) {
      alert('❌ Нет завершенных тестов для экспорта');
      return;
    }

    const exportData = completedUsers.map((user, index) => ({
      '№': index + 1,
      'Логин': user.login,
      'Достоверность': user.results?.interpretations?.Isk || '-',
      'Аутоагрессия': user.results?.interpretations?.Con || '-',
      'НПУ': user.results?.interpretations?.NPN || '-',
      'Психопатия': user.results?.interpretations?.Psi || '-',
      'Истероидность': user.results?.interpretations?.Ist || '-',
      'Ранимость': user.results?.interpretations?.Ast || '-',
      'Рекомендация': user.results?.recommendation || '-',
      'Дата завершения': user.completedAt 
        ? new Date(user.completedAt.seconds * 1000).toLocaleDateString('ru-RU')
        : '-'
    }));

    exportToExcel(exportData, 'results_summary');
  };

  const exportIndividualToExcel = (user) => {
    if (!user.results) {
      alert('❌ Нет данных для экспорта');
      return;
    }

    const scores = user.results.scores || {};
    const interpretations = user.results.interpretations || {};
    
    const exportData = [
      {
        'Параметр': t('login.username'),
        'Значение': user.login || '-',
        'Интерпретация': ''
      },
      {
        'Параметр': 'Дата завершения',
        'Значение': user.completedAt 
          ? new Date(user.completedAt.seconds * 1000).toLocaleString('ru-RU')
          : '-',
        'Интерпретация': ''
      },
      {
        'Параметр': t('scale.isk.full'),
        'Значение': `${scores.Isk || 0}/17`,
        'Интерпретация': interpretations.Isk || '-'
      },
      {
        'Параметр': t('scale.con.full'),
        'Значение': `${scores.Con || 0}/14`,
        'Интерпретация': interpretations.Con || '-'
      },
      {
        'Параметр': t('scale.npn.full'),
        'Значение': `${scores.NPN || 0}/67`,
        'Интерпретация': interpretations.NPN || '-'
      },
      {
        'Параметр': t('scale.psi.full'),
        'Значение': `${scores.Psi || 0}/30`,
        'Интерпретация': interpretations.Psi || '-'
      },
      {
        'Параметр': t('scale.ist.full'),
        'Значение': `${scores.Ist || 0}/30`,
        'Интерпретация': interpretations.Ist || '-'
      },
      {
        'Параметр': t('scale.ast.full'),
        'Значение': `${scores.Ast || 0}/19`,
        'Интерпретация': interpretations.Ast || '-'
      },
      {
        'Параметр': t('result.recommendation'),
        'Значение': user.results.recommendation || '-',
        'Интерпретация': ''
      }
    ];

    exportToExcel(exportData, `individual_${user.login}`);
  };

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <LanguageSwitcher />
      <div className="admin-header">
        <h1 className="admin-title">{t('admin.title')}</h1>
        <button onClick={logout} className="logout-btn">
          {t('nav.logout')}
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 {t('admin.dashboard')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 {t('admin.users')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'batches' ? 'active' : ''}`}
          onClick={() => setActiveTab('batches')}
        >
          📦 Потоки
        </button>
        <button
          className={`tab-btn ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => setActiveTab('generate')}
        >
          ✨ {t('admin.generate')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
        >
          📊 {t('admin.results')}
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'dashboard' && (
          <AdminDashboard users={users} />
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <h2>{t('admin.users')}</h2>
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>{t('login.username')}</th>
                    <th>Поток</th>
                    <th>{t('admin.users.status')}</th>
                    <th>Дата завершения</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter(user => user.login !== 'admin')
                    .map((user) => (
                      <tr key={user.id}>
                        <td>{user.login}</td>
                        <td>#{user.batch || 1}</td>
                        <td>
                          <span className={`status-badge ${user.isCompleted ? 'completed' : 'pending'}`}>
                            {user.isCompleted ? t('admin.users.filter.completed') : t('admin.users.filter.pending')}
                          </span>
                        </td>
                        <td>
                          {user.completedAt 
                            ? new Date(user.completedAt.seconds * 1000).toLocaleString('ru-RU')
                            : '-'
                          }
                        </td>
                        <td>
                          {/* 👇 ДОБАВЛЕНА КНОПКА ДЛЯ ПРОСМОТРА ОТВЕТОВ */}
                          {user.isCompleted && (
                            <>
                              <button
                                className="action-btn view-btn"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowAnswersModal(true);
                                }}
                                title="Просмотр ответов"
                                style={{ marginRight: '5px' }}
                              >
                                👁️
                              </button>
                              <button
                                className="action-btn pdf-btn"
                                onClick={() => handleDownloadUserPDF(user)}
                                style={{ marginRight: '5px' }}
                                title={t('admin.users.pdf')}
                              >
                                📄
                              </button>
                              <button
                                className="action-btn excel-btn"
                                onClick={() => exportIndividualToExcel(user)}
                                title={t('admin.users.excel')}
                              >
                                📊
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'batches' && (
          <div className="batches-section">
            <div className="batches-header">
              <h2>Управление потоками</h2>
              <button onClick={createNewBatch} className="new-batch-btn">
                ➕ Новый поток
              </button>
            </div>
            
            {batches.length === 0 ? (
              <p className="no-batches">Нет созданных потоков</p>
            ) : (
              <div className="batches-grid">
                {batches.map((batch) => (
                  <div key={batch.batchNumber} className="batch-card">
                    <div className="batch-number">Поток #{batch.batchNumber}</div>
                    <div className="batch-stats">
                      <div className="stat">
                        <span className="stat-label">Всего:</span>
                        <span className="stat-value">{batch.total}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">✅ Завершено:</span>
                        <span className="stat-value">{batch.completed}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">⏳ Ожидает:</span>
                        <span className="stat-value">{batch.pending}</span>
                      </div>
                    </div>
                    <div className="batch-progress">
                      <div 
                        className="progress-fill"
                        style={{ width: `${batch.total ? (batch.completed / batch.total) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'generate' && (
          <div className="generate-section">
            <h2>{t('admin.generate.title')}</h2>
            
            <div className="generate-form">
              <label>{t('admin.generate.count')}</label>
              <input
                type="number"
                min="1"
                max="50"
                value={generateCount}
                onChange={(e) => setGenerateCount(parseInt(e.target.value) || 1)}
                className="generate-input"
              />
              <button
                onClick={generateUsers}
                disabled={loading}
                className="generate-btn"
              >
                {loading ? t('admin.generate.creating') : t('admin.generate.button')}
              </button>
            </div>

            {generatedUsers.length > 0 && (
              <div className="generated-users">
                <h3>{t('admin.generate.generated')}</h3>
                
                <div className="export-buttons">
                  <button
                    onClick={() => exportGeneratedUsers('excel')}
                    className="export-excel-btn"
                  >
                    📊 {t('admin.generate.download_excel')}
                  </button>
                  <button
                    onClick={() => exportGeneratedUsers('pdf')}
                    className="export-pdf-btn"
                  >
                    📄 {t('admin.generate.download_pdf')}
                  </button>
                </div>

                <div className="users-table-wrapper">
                  <table className="generated-table">
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>{t('login.username')}</th>
                        <th>{t('login.password')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generatedUsers.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.login}</td>
                          <td className="password">{user.password}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'results' && (
          <div className="results-section">
            <h2>{t('admin.results.summary')}</h2>
            
            <div className="results-actions">
              <button
                onClick={handleDownloadSummaryPDF}
                className="download-pdf-btn"
              >
                📥 {t('admin.results.download_pdf')}
              </button>
              <button
                onClick={exportResultsToExcel}
                className="download-excel-btn"
              >
                📊 {t('admin.results.download_excel')}
              </button>
            </div>

            <div className="results-table-wrapper">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>{t('admin.results.login')}</th>
                    <th>Поток</th>
                    <th>{t('admin.results.isk')}</th>
                    <th>{t('admin.results.con')}</th>
                    <th>{t('admin.results.npn')}</th>
                    <th>{t('admin.results.psi')}</th>
                    <th>{t('admin.results.ist')}</th>
                    <th>{t('admin.results.ast')}</th>
                    <th>{t('admin.results.recommendation')}</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter(user => user.isCompleted && user.login !== 'admin')
                    .map((user) => (
                      <tr key={user.id}>
                        <td>{user.login}</td>
                        <td>#{user.batch || 1}</td>
                        <td>{user.results?.interpretations?.Isk || '-'}</td>
                        <td>{user.results?.interpretations?.Con || '-'}</td>
                        <td>{user.results?.interpretations?.NPN || '-'}</td>
                        <td>{user.results?.interpretations?.Psi || '-'}</td>
                        <td>{user.results?.interpretations?.Ist || '-'}</td>
                        <td>{user.results?.interpretations?.Ast || '-'}</td>
                        <td>
                          <span className={`recommendation-badge ${user.results?.recommendation?.replace(/\s+/g, '-')}`}>
                            {user.results?.recommendation || '-'}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 👇 МОДАЛЬНОЕ ОКНО ДЛЯ ПРОСМОТРА ОТВЕТОВ */}
      {showAnswersModal && selectedUser && (
        <UserAnswersModal
          userId={selectedUser.id}
          userLogin={selectedUser.login}
          onClose={() => {
            setShowAnswersModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}

export default AdminPanel;