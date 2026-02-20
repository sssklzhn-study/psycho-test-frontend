import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Встраиваем русский шрифт (base64)
// Это Times New Roman с поддержкой кириллицы
const rusFont = 'AAEAAAASAQAABAAgR0RFRgIRAA...'; // Здесь должен быть base64 шрифта

/**
 * Генерация PDF со списком пользователей - ПРОСТАЯ ВЕРСИЯ
 */
export const generateUsersPDF = (users, filename = 'users') => {
  try {
    const doc = new jsPDF();
    
    // Заголовок на английском
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('USERS LIST', 14, 22);
    
    // Дата
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, 14, 32);
    
    // Данные для таблицы
    const tableData = users.map((user, index) => {
      // Заменяем русские логины на TestN
      const login = user.login?.replace('Тестируемый', 'Test') || '-';
      return [
        index + 1,
        login,
        user.password || '********'
      ];
    });
    
    // Таблица
    autoTable(doc, {
      startY: 40,
      head: [['No.', 'Login', 'Password']],
      body: tableData,
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      styles: {
        fontSize: 10,
        cellPadding: 5,
        halign: 'left'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });
    
    doc.save(`${filename}_${new Date().toISOString().split('T')[0]}.pdf`);
    return true;
  } catch (error) {
    console.error('Ошибка генерации PDF:', error);
    return false;
  }
};

/**
 * Генерация общей ведомости - ПРОСТАЯ ВЕРСИЯ
 */
export const generateSummaryPDF = (users, filename = 'summary') => {
  try {
    const doc = new jsPDF('landscape');
    
    // Заголовок на английском
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('RESULTS SUMMARY', 14, 22);
    
    // Дата
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, 14, 32);
    
    // Фильтруем только завершенные тесты
    const completedUsers = users.filter(user => 
      user.isCompleted && user.login !== 'admin' && user.results
    );
    
    // Данные для таблицы - ТОЛЬКО АНГЛИЙСКИЙ
    const tableData = completedUsers.map(user => {
      const login = user.login?.replace('Тестируемый', 'Test') || '-';
      const rec = user.results?.recommendation || '-';
      
      let recShort = '-';
      if (rec.includes('не рекомендован')) recShort = 'NO';
      else if (rec.includes('рекомендован')) recShort = 'OK';
      else if (rec.includes('условно')) recShort = 'MAYBE';
      else if (rec.includes('ретест')) recShort = 'RETEST';
      
      return [
        login,
        user.results?.scores?.Isk || 0,
        user.results?.scores?.Con || 0,
        user.results?.scores?.NPN || 0,
        user.results?.scores?.Psi || 0,
        user.results?.scores?.Ist || 0,
        user.results?.scores?.Ast || 0,
        recShort
      ];
    });
    
    // Таблица
    autoTable(doc, {
      startY: 40,
      head: [['Login', 'Isk', 'Con', 'NPN', 'Psi', 'Ist', 'Ast', 'Rec']],
      body: tableData,
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      styles: {
        fontSize: 9,
        cellPadding: 4,
        halign: 'center'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });
    
    doc.save(`${filename}_${new Date().toISOString().split('T')[0]}.pdf`);
    return true;
  } catch (error) {
    console.error('Ошибка генерации PDF:', error);
    return false;
  }
};

/**
 * Генерация индивидуальной ведомости - ПРОСТАЯ ВЕРСИЯ
 */
export const generateIndividualPDF = (user, filename = 'result') => {
  try {
    const doc = new jsPDF();
    
    // Заголовок на английском
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('INDIVIDUAL TEST REPORT', 14, 22);
    
    // Информация о пользователе
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    const login = user.login?.replace('Тестируемый', 'Test') || '-';
    doc.text(`Login: ${login}`, 14, 40);
    
    // Дата
    let dateStr = '-';
    if (user.completedAt) {
      if (user.completedAt.seconds) {
        dateStr = new Date(user.completedAt.seconds * 1000).toLocaleString('en-GB');
      } else {
        dateStr = new Date(user.completedAt).toLocaleString('en-GB');
      }
    }
    doc.text(`Date: ${dateStr}`, 14, 50);
    
    // Результаты теста
    if (user.results) {
      const scores = user.results.scores || {};
      
      // Таблица результатов - ТОЛЬКО АНГЛИЙСКИЙ
      const tableData = [
        ['Isk (Truthfulness)', scores.Isk || 0, '17'],
        ['Con (Autoaggression)', scores.Con || 0, '14'],
        ['NPN (Neuro-psychic)', scores.NPN || 0, '67'],
        ['Psi (Psychopathy)', scores.Psi || 0, '30'],
        ['Ist (Hysteria)', scores.Ist || 0, '30'],
        ['Ast (Sensitivity)', scores.Ast || 0, '19']
      ];
      
      // Таблица
      autoTable(doc, {
        startY: 70,
        head: [['Scale', 'Score', 'Max']],
        body: tableData,
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 10,
          cellPadding: 5
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        }
      });
      
      // Получаем последнюю Y позицию
      const lastY = doc.lastAutoTable?.finalY || 150;
      
      // Рекомендация
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('FINAL RECOMMENDATION:', 14, lastY + 20);
      
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      
      const recommendation = user.results.recommendation || '-';
      
      // Переводим на английский
      let recText = '-';
      if (recommendation.includes('не рекомендован')) recText = 'NOT RECOMMENDED';
      else if (recommendation.includes('рекомендован')) recText = 'RECOMMENDED';
      else if (recommendation.includes('условно')) recText = 'CONDITIONALLY RECOMMENDED';
      else if (recommendation.includes('ретест')) recText = 'RETEST REQUIRED';
      else recText = recommendation;
      
      // Цвет
      if (recText.includes('NOT')) doc.setTextColor(255, 0, 0);
      else if (recText.includes('RECOMMENDED') && !recText.includes('NOT')) doc.setTextColor(0, 128, 0);
      else if (recText.includes('CONDITIONALLY')) doc.setTextColor(255, 165, 0);
      else doc.setTextColor(0, 0, 255);
      
      doc.text(recText, 14, lastY + 40);
    }
    
    // Сохраняем
    const safeLogin = user.login?.replace('Тестируемый', 'Test') || 'user';
    doc.save(`${filename}_${safeLogin}_${new Date().toISOString().split('T')[0]}.pdf`);
    return true;
  } catch (error) {
    console.error('Ошибка генерации индивидуального PDF:', error);
    return false;
  }
};