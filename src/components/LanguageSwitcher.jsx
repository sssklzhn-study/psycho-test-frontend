// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import './LanguageSwitcher.css';

// function LanguageSwitcher() {
//   const { i18n } = useTranslation();
//   const [changing, setChanging] = useState(false);

//   const changeLanguage = async (lang) => {
//     if (lang === i18n.language || changing) return;
    
//     setChanging(true);
    
//     // Добавляем класс loading для кнопок
//     await i18n.changeLanguage(lang);
    
//     // Небольшая задержка для анимации
//     setTimeout(() => {
//       setChanging(false);
//     }, 500);
//   };

//   return (
//     <div className="language-switcher">
//       <button 
//         onClick={() => changeLanguage('ru')}
//         className={`${i18n.language === 'ru' ? 'active' : ''} ${changing ? 'loading' : ''}`}
//         disabled={changing}
//       >
//         <span>🇷🇺</span>
//         <span className="language-name">Русский</span>
//       </button>
//       <button 
//         onClick={() => changeLanguage('kk')}
//         className={`${i18n.language === 'kk' ? 'active' : ''} ${changing ? 'loading' : ''}`}
//         disabled={changing}
//       >
//         <span>🇰🇿</span>
//         <span className="language-name">Қазақша</span>
//       </button>
//     </div>
//   );
// }

// export default LanguageSwitcher;
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [changing, setChanging] = useState(false);

  const changeLanguage = async (lang) => {
    if (lang === i18n.language || changing) return;
    
    setChanging(true);
    
    await i18n.changeLanguage(lang);
    
    setTimeout(() => {
      setChanging(false);
    }, 500);
  };

  return (
    <div className="language-switcher">
      <button 
        onClick={() => changeLanguage('ru')}
        className={`${i18n.language === 'ru' ? 'active' : ''} ${changing ? 'loading' : ''}`}
        disabled={changing}
      >
        <span>🇷🇺</span>
        <span className="language-name">Русский</span>
      </button>
      <button 
        onClick={() => changeLanguage('kk')}
        className={`${i18n.language === 'kk' ? 'active' : ''} ${changing ? 'loading' : ''}`}
        disabled={changing}
      >
        <span>🇰🇿</span>
        <span className="language-name">Қазақша</span>
      </button>
    </div>
  );
}

export default LanguageSwitcher;