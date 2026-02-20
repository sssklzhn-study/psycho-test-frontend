import React from 'react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer 
} from 'recharts';
import { useTranslation } from 'react-i18next';

const COLORS = ['#4caf50', '#ff9800', '#f44336', '#2196f3'];

function AdminDashboard({ users }) {
  const { t } = useTranslation();
  
  // Исключаем админа из статистики
  const filteredUsers = users.filter(u => u.login !== 'admin');
  
  // Подсчет статистики
  const totalUsers = filteredUsers.length;
  const completedTests = filteredUsers.filter(u => u.isCompleted).length;
  const pendingTests = totalUsers - completedTests;
  
  // Статистика по рекомендациям
  const recommendations = {
    recommended: filteredUsers.filter(u => u.results?.recommendation === 'рекомендован').length,
    conditional: filteredUsers.filter(u => u.results?.recommendation === 'условно рекомендован').length,
    notRecommended: filteredUsers.filter(u => u.results?.recommendation === 'не рекомендован').length,
    retest: filteredUsers.filter(u => u.results?.recommendation === 'ретест').length
  };

  // Данные для круговой диаграммы
  const pieData = [
    { name: t('admin.users.recommended'), value: recommendations.recommended },
    { name: t('admin.users.conditional'), value: recommendations.conditional },
    { name: t('admin.users.not_recommended'), value: recommendations.notRecommended },
    { name: t('admin.users.retest'), value: recommendations.retest }
  ].filter(item => item.value > 0);

  // Средние баллы по шкалам
  const completedUsers = filteredUsers.filter(u => u.isCompleted && u.results);
  
  const avgScores = {
    isk: Math.round(completedUsers.reduce((acc, u) => acc + (u.results?.scores?.Isk || 0), 0) / (completedUsers.length || 1)),
    con: Math.round(completedUsers.reduce((acc, u) => acc + (u.results?.scores?.Con || 0), 0) / (completedUsers.length || 1)),
    npn: Math.round(completedUsers.reduce((acc, u) => acc + (u.results?.scores?.NPN || 0), 0) / (completedUsers.length || 1)),
    psi: Math.round(completedUsers.reduce((acc, u) => acc + (u.results?.scores?.Psi || 0), 0) / (completedUsers.length || 1)),
    ist: Math.round(completedUsers.reduce((acc, u) => acc + (u.results?.scores?.Ist || 0), 0) / (completedUsers.length || 1)),
    ast: Math.round(completedUsers.reduce((acc, u) => acc + (u.results?.scores?.Ast || 0), 0) / (completedUsers.length || 1))
  };

  const barData = [
    { name: 'Isk', value: avgScores.isk, max: 17 },
    { name: 'Con', value: avgScores.con, max: 14 },
    { name: 'NPN', value: avgScores.npn, max: 67 },
    { name: 'Psi', value: avgScores.psi, max: 30 },
    { name: 'Ist', value: avgScores.ist, max: 30 },
    { name: 'Ast', value: avgScores.ast, max: 19 }
  ];

  return (
    <div className="dashboard">
      {/* Статистика в карточках */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value">{totalUsers}</div>
            <div className="stat-label">{t('admin.stats.total')}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{completedTests}</div>
            <div className="stat-label">{t('admin.stats.completed')}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-value">{pendingTests}</div>
            <div className="stat-label">{t('admin.stats.pending')}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{totalUsers ? ((completedTests / totalUsers) * 100).toFixed(1) : 0}%</div>
            <div className="stat-label">{t('admin.stats.completion')}</div>
          </div>
        </div>
      </div>

      {/* Графики */}
      <div className="charts-grid">
        {/* Круговая диаграмма рекомендаций */}
        <div className="chart-card">
          <h3>{t('admin.chart.recommendations')}</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Столбчатая диаграмма средних баллов */}
        <div className="chart-card">
          <h3>{t('admin.chart.scores')}</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#0a2540" name={t('admin.chart.scores')} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;