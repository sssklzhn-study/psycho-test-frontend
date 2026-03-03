// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import API from '../api/axios';
// import LanguageSwitcher from './LanguageSwitcher';
// import './TestPage.css';

// function TestPage() {
//   const { t, i18n } = useTranslation(); // 👈 ДОБАВИЛИ i18n
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [showUnanswered, setShowUnanswered] = useState(false);
//   const navigate = useNavigate();

//   // 👇 ПЕРЕЗАГРУЖАЕМ ВОПРОСЫ ПРИ СМЕНЕ ЯЗЫКА
//   useEffect(() => {
//     loadQuestions();
//   }, [i18n.language]); // 👈 ЗАВИСИМОСТЬ ОТ ЯЗЫКА

//   useEffect(() => {
//     const answeredCount = Object.keys(answers).length;
//     setProgress(Math.round((answeredCount / questions.length) * 100));
    
//     if (questions.length > 0) {
//       const unansweredCount = questions.length - answeredCount;
//       setShowUnanswered(unansweredCount > 0 && unansweredCount <= 5);
//     }
//   }, [answers, questions]);

//   const loadQuestions = async () => {
//     try {
//       setLoading(true);
//       // 👇 ОТПРАВЛЯЕМ ЯЗЫК В ЗАГОЛОВКЕ
//       const response = await API.get('/questions', {
//         headers: {
//           'Accept-Language': i18n.language
//         }
//       });
//       setQuestions(response.data.questions);
//       console.log(`✅ Загружено ${response.data.questions.length} вопросов на языке ${i18n.language}`);
//     } catch (error) {
//       console.error('Ошибка загрузки вопросов:', error);
//       alert(t('test.loading.error') || 'Не удалось загрузить вопросы. Попробуйте позже.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getUnansweredQuestions = () => {
//     const unanswered = [];
//     questions.forEach((q, index) => {
//       if (answers[q.id] === undefined) {
//         unanswered.push(index + 1);
//       }
//     });
//     return unanswered;
//   };

//   const goToUnanswered = () => {
//     const unanswered = getUnansweredQuestions();
//     if (unanswered.length > 0) {
//       setCurrentIndex(unanswered[0] - 1);
//     }
//   };

//   const handleAnswer = (answer) => {
//     const currentQuestion = questions[currentIndex];
//     setAnswers({
//       ...answers,
//       [currentQuestion.id]: answer
//     });

//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   const handleSubmit = async () => {
//     const unansweredCount = questions.length - Object.keys(answers).length;
    
//     if (unansweredCount > 0) {
//       const confirm = window.confirm(
//         t('test.confirm.unanswered', { 
//           answered: Object.keys(answers).length, 
//           total: questions.length,
//           unanswered: unansweredCount
//         })
//       );
//       if (!confirm) return;
//     }

//     try {
//       setSubmitting(true);
      
//       const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
//         question_id: questionId,
//         answer: answer
//       }));

//       console.log('📤 Отправка ответов:', formattedAnswers.length);

//       const response = await API.post('/test/submit', {
//         answers: formattedAnswers
//       });

//       if (response.data.success) {
//         localStorage.setItem('isCompleted', 'true');
//         window.dispatchEvent(new Event('localStorageChange'));
        
//         console.log('💾 После сохранения:', {
//           userId: localStorage.getItem('userId'),
//           userLogin: localStorage.getItem('userLogin'),
//           isCompleted: localStorage.getItem('isCompleted'),
//           isAdmin: localStorage.getItem('isAdmin')
//         });
        
//         console.log('➡️ ПРИНУДИТЕЛЬНЫЙ ХАРД-РЕДИРЕКТ на /result');
//         window.location.href = '/result';
//       }
//     } catch (error) {
//       console.error('Ошибка отправки теста:', error);
//       alert('Не удалось отправить ответы. Проверьте соединение.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="test-loading">
//         <div className="spinner"></div>
//         <p>{t('test.loading')}</p>
//       </div>
//     );
//   }

//   const currentQuestion = questions[currentIndex];
//   const isAnswered = answers[currentQuestion?.id] !== undefined;
//   const progressPercent = (currentIndex / questions.length) * 100;
//   const unansweredQuestions = getUnansweredQuestions();
//   const unansweredCount = unansweredQuestions.length;

//   return (
//     <div className="test-container">
//       {/* <LanguageSwitcher /> */}
      
//       <div className="test-header">
//         <div className="progress-info">
//           <span className="question-counter">
//             {t('test.question', { number: currentIndex + 1, total: questions.length })}
//           </span>
//           <span className="progress-percent">{t('test.progress', { percent: progress })}</span>
//         </div>
//         <div className="progress-bar">
//           <div 
//             className="progress-fill" 
//             style={{ width: `${progressPercent}%` }}
//           ></div>
//         </div>
//       </div>

//       {unansweredCount > 0 && (
//         <div className={`unanswered-warning ${showUnanswered ? 'pulse' : ''}`}>
//           <div className="unanswered-icon">⚠️</div>
//           <div className="unanswered-content">
//             <div className="unanswered-title">
//               {t('test.unanswered.title', { count: unansweredCount })}
//             </div>
//             {unansweredCount <= 10 && (
//               <div className="unanswered-list">
//                 {t('test.unanswered.list', { numbers: unansweredQuestions.join(', ') })}
//               </div>
//             )}
//             <button 
//               className="unanswered-go-btn"
//               onClick={goToUnanswered}
//             >
//               {t('test.unanswered.go')}
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="question-card" data-number={currentQuestion?.number}>
//         <h2 className="question-number">
//           {t('test.question', { number: currentQuestion?.number, total: questions.length })}
//         </h2>
//         <p className="question-text">{currentQuestion?.text}</p>

//         <div className="answer-buttons">
//           <button
//             className={`answer-btn yes ${answers[currentQuestion?.id] === true ? 'selected' : ''}`}
//             onClick={() => handleAnswer(true)}
//           >
//             {t('test.yes')}
//           </button>
//           <button
//             className={`answer-btn no ${answers[currentQuestion?.id] === false ? 'selected' : ''}`}
//             onClick={() => handleAnswer(false)}
//           >
//             {t('test.no')}
//           </button>
//         </div>

//         <div className="navigation-buttons">
//           <button
//             className="nav-btn prev"
//             onClick={handlePrevious}
//             disabled={currentIndex === 0}
//           >
//             {t('test.prev')}
//           </button>
          
//           {currentIndex === questions.length - 1 ? (
//             <button
//               className="nav-btn submit"
//               onClick={handleSubmit}
//               disabled={submitting}
//             >
//               {submitting ? t('test.submitting') : t('test.submit')}
//             </button>
//           ) : (
//             <button
//               className="nav-btn next"
//               onClick={() => setCurrentIndex(currentIndex + 1)}
//               disabled={!isAnswered}
//             >
//               {t('test.next')}
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="questions-map">
//         {questions.map((q, index) => {
//           const isUnanswered = answers[q.id] === undefined;
//           return (
//             <button
//               key={q.id}
//               className={`map-dot ${
//                 answers[q.id] !== undefined ? 'answered' : ''
//               } ${index === currentIndex ? 'current' : ''} 
//               ${isUnanswered && unansweredCount > 0 ? 'unanswered' : ''}`}
//               onClick={() => setCurrentIndex(index)}
//             >
//               {index + 1}
//               {isUnanswered && <span className="dot-badge">!</span>}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default TestPage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../api/axios';
import LanguageSwitcher from './LanguageSwitcher';
import './TestPage.css';

function TestPage() {
  const { t, i18n } = useTranslation();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showUnanswered, setShowUnanswered] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false); // 👈 ЖАҢА СТЕЙТ
  const navigate = useNavigate();

  useEffect(() => {
    loadQuestions();
  }, [i18n.language]);

  useEffect(() => {
    const answeredCount = Object.keys(answers).length;
    setProgress(Math.round((answeredCount / questions.length) * 100));
    
    if (questions.length > 0) {
      const unansweredCount = questions.length - answeredCount;
      setShowUnanswered(unansweredCount > 0 && unansweredCount <= 5);
      
      // 👇 БАРЛЫҚ СҰРАҚҚА ЖАУАП БЕРІЛГЕНІН ТЕКСЕРУ
      if (answeredCount === questions.length && questions.length > 0) {
        setShowSubmitButton(true);
      } else {
        setShowSubmitButton(false);
      }
    }
  }, [answers, questions]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const response = await API.get('/questions', {
        headers: {
          'Accept-Language': i18n.language
        }
      });
      setQuestions(response.data.questions);
      console.log(`✅ Загружено ${response.data.questions.length} вопросов на языке ${i18n.language}`);
    } catch (error) {
      console.error('Ошибка загрузки вопросов:', error);
      alert(t('test.loading.error') || 'Не удалось загрузить вопросы. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const getUnansweredQuestions = () => {
    const unanswered = [];
    questions.forEach((q, index) => {
      if (answers[q.id] === undefined) {
        unanswered.push(index + 1);
      }
    });
    return unanswered;
  };

  const goToUnanswered = () => {
    const unanswered = getUnansweredQuestions();
    if (unanswered.length > 0) {
      setCurrentIndex(unanswered[0] - 1);
    }
  };

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentIndex];
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: answer
    };
    setAnswers(updatedAnswers);

    // 👇 ЕГЕР БҰЛ СОҢҒЫ СҰРАҚ БОЛСА, КЕЛЕСІ СҰРАҚҚА ӨТПЕЙДІ
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    // ЕГЕР СОҢҒЫ СҰРАҚ БОЛСА, ЖАУАП САҚТАЛЫП, КНОПКА ШЫҒАДЫ
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    const unansweredCount = questions.length - Object.keys(answers).length;
    
    if (unansweredCount > 0) {
      const confirm = window.confirm(
        t('test.confirm.unanswered', { 
          answered: Object.keys(answers).length, 
          total: questions.length,
          unanswered: unansweredCount
        })
      );
      if (!confirm) {
        // Бірінші жауапсыз сұраққа өту
        const firstUnanswered = questions.findIndex(q => answers[q.id] === undefined);
        if (firstUnanswered !== -1) {
          setCurrentIndex(firstUnanswered);
        }
        return;
      }
    }

    try {
      setSubmitting(true);
      
      const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        question_id: questionId,
        answer: answer
      }));

      console.log('📤 Отправка ответов:', formattedAnswers.length);

      const response = await API.post('/test/submit', {
        answers: formattedAnswers
      });

      if (response.data.success) {
        localStorage.setItem('isCompleted', 'true');
        window.dispatchEvent(new Event('localStorageChange'));
        
        console.log('➡️ РЕДИРЕКТ на /result');
        window.location.href = '/result';
      }
    } catch (error) {
      console.error('Ошибка отправки теста:', error);
      alert('Не удалось отправить ответы. Проверьте соединение.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="test-loading">
        <div className="spinner"></div>
        <p>{t('test.loading')}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isAnswered = answers[currentQuestion?.id] !== undefined;
  const progressPercent = (currentIndex / questions.length) * 100;
  const unansweredQuestions = getUnansweredQuestions();
  const unansweredCount = unansweredQuestions.length;
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="test-container">
      {/* <LanguageSwitcher /> */}
      
      <div className="test-header">
        <div className="progress-info">
          <span className="question-counter">
            {t('test.question', { number: currentIndex + 1, total: questions.length })}
          </span>
          <span className="progress-percent">{t('test.progress', { percent: progress })}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {unansweredCount > 0 && (
        <div className={`unanswered-warning ${showUnanswered ? 'pulse' : ''}`}>
          <div className="unanswered-icon">⚠️</div>
          <div className="unanswered-content">
            <div className="unanswered-title">
              {t('test.unanswered.title', { count: unansweredCount })}
            </div>
            {unansweredCount <= 10 && (
              <div className="unanswered-list">
                {t('test.unanswered.list', { numbers: unansweredQuestions.join(', ') })}
              </div>
            )}
            <button 
              className="unanswered-go-btn"
              onClick={goToUnanswered}
            >
              {t('test.unanswered.go')}
            </button>
          </div>
        </div>
      )}

      <div className="question-card" data-number={currentQuestion?.number}>
        <h2 className="question-number">
          {t('test.question', { number: currentQuestion?.number, total: questions.length })}
        </h2>
        <p className="question-text">{currentQuestion?.text}</p>

        <div className="answer-buttons">
          <button
            className={`answer-btn yes ${answers[currentQuestion?.id] === true ? 'selected' : ''}`}
            onClick={() => handleAnswer(true)}
          >
            {t('test.yes')}
          </button>
          <button
            className={`answer-btn no ${answers[currentQuestion?.id] === false ? 'selected' : ''}`}
            onClick={() => handleAnswer(false)}
          >
            {t('test.no')}
          </button>
        </div>

        <div className="navigation-buttons">
          <button
            className="nav-btn prev"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            {t('test.prev')}
          </button>
          
          {/* 👈 ЖАҢА ЛОГИКА: ЕГЕР БАРЛЫҚ СҰРАҚҚА ЖАУАП БЕРІЛСЕ, "ЗАВЕРШИТЬ ТЕСТ" КНОПКАСЫ ШЫҒАДЫ */}
          {showSubmitButton ? (
            <button
              className="nav-btn submit"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? t('test.submitting') : t('test.submit')}
            </button>
          ) : (
            <button
              className="nav-btn next"
              onClick={() => setCurrentIndex(currentIndex + 1)}
              disabled={!isAnswered || !isLastQuestion}
            >
              {isLastQuestion ? t('test.next') : t('test.next')}
            </button>
          )}
        </div>
      </div>

      <div className="questions-map">
        {questions.map((q, index) => {
          const isUnanswered = answers[q.id] === undefined;
          return (
            <button
              key={q.id}
              className={`map-dot ${
                answers[q.id] !== undefined ? 'answered' : ''
              } ${index === currentIndex ? 'current' : ''} 
              ${isUnanswered && unansweredCount > 0 ? 'unanswered' : ''}`}
              onClick={() => setCurrentIndex(index)}
            >
              {index + 1}
              {isUnanswered && <span className="dot-badge">!</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TestPage;