import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: {
          // ========== ОБЩИЕ ==========
          "app.title": "Психологическое тестирование",
          "loading": "Загрузка...",
          "error": "Ошибка",
          "success": "Успешно",
          
          // ========== НАВИГАЦИЯ ==========
          "nav.logout": "Выйти",
          "nav.login": "Войти",
          "nav.profile": "Личный кабинет",
          "nav.home": "Главная",
          
          // ========== ГЛАВНАЯ СТРАНИЦА ==========
          "home.title": "Профессиональное психологическое тестирование",
          "home.subtitle": "6 шкал · Точная методика · 160 вопросов",
          "home.why_title": "Почему выбирают нас?",
          "home.feature1_title": "Научная методика",
          "home.feature1_desc": "Тест основан на профессиональных психологических методиках",
          "home.feature2_title": "6 шкал оценки",
          "home.feature2_desc": "Достоверность, психопатия, истероидность и другие",
          "home.feature3_title": "Анонимно и безопасно",
          "home.feature3_desc": "Все результаты хранятся только в вашем личном кабинете",
          "home.feature4_title": "Доступно везде",
          "home.feature4_desc": "Проходите тест с любого устройства в любое время",
          "home.how_title": "Как это работает?",
          "home.step1": "Оплатите тест",
          "home.step1_desc": "Через Kaspi QR (1000 ₸ за один тест)",
          "home.step2": "Получите доступ",
          "home.step2_desc": "В личном кабинете появятся логин и пароль",
          "home.step3": "Пройдите тест",
          "home.step3_desc": "Ответьте на 160 вопросов (займет 20-30 минут)",
          "home.step4": "Изучите результаты",
          "home.step4_desc": "Получите подробный отчет по всем 6 шкалам",
          "home.cta_title": "Готовы узнать себя лучше?",
          "home.cta_button": "Начать тестирование",
          "home.profile_button": "В личный кабинет",
          "home.rights": "Все права защищены",
          "home.greeting": "Здравствуйте, {{name}}",
          
          // ========== ЛОГИН ==========
          "login.title": "Психологическое тестирование",
          "login.subtitle": "Войдите с полученными логином и паролем",
          "login.username": "Логин",
          "login.password": "Пароль",
          "login.button": "Войти",
          "login.user.hint": "Для тестируемых: используйте выданные логин/пароль",
          "login.admin.hint": "Для администратора: admin / admin123",
          "login.placeholder.username": "Например: Тестируемый1",
          "login.placeholder.password": "8 значный пароль",
          "login.error.invalid": "Неверный логин или пароль",
          "login.no_account": "Нет логина?",
          "login.buy_access": "Оплатить доступ",
          
          // ========== РЕГИСТРАЦИЯ ==========
          "register.title": "Регистрация",
          "register.subtitle": "Создайте аккаунт для доступа к тестированию",
          "register.email": "Email",
          "register.password": "Пароль",
          "register.confirm_password": "Подтвердите пароль",
          "register.button": "Зарегистрироваться",
          "register.password_mismatch": "Пароли не совпадают",
          "register.password_short": "Пароль должен быть не менее 6 символов",
          "register.email_exists": "Этот email уже зарегистрирован",
          "register.invalid_email": "Некорректный email",
          "register.success_title": "Регистрация успешна!",
          "register.success_message": "На вашу почту отправлено письмо с подтверждением",
          "register.redirect": "Вы будете перенаправлены на страницу входа...",
          "register.has_account": "Уже есть аккаунт?",
          "register.no_account": "Нет аккаунта?",
          
          // ========== ТЕСТИРОВАНИЕ ==========
          "test.loading": "Загрузка вопросов...",
          "test.loading.error": "Не удалось загрузить вопросы. Попробуйте позже.",
          "test.question": "Вопрос {{number}} из {{total}}",
          "test.progress": "{{percent}}%",
          "test.yes": "Да",
          "test.no": "Нет",
          "test.prev": "← Предыдущий",
          "test.next": "Следующий →",
          "test.submit": "Завершить тест",
          "test.submitting": "Отправка...",
          "test.confirm.unanswered": "Вы ответили на {{answered}} из {{total}} вопросов. Осталось без ответа: {{unanswered}}.\n\nХотите завершить тест?",
          "test.unanswered.title": "Осталось без ответа: {{count}} вопросов",
          "test.unanswered.list": "Номера: {{numbers}}",
          "test.unanswered.go": "Перейти к первому неотвеченному",
          
          // ========== РЕЗУЛЬТАТЫ ==========
          "result.title": "Тестирование завершено!",
          "result.thanks": "Спасибо, {{name}}",
          "result.your_results": "Ваши результаты:",
          "result.scale.isk": "Достоверность",
          "result.scale.con": "Аутоагрессия",
          "result.scale.npn": "Нервно-психическая устойчивость",
          "result.scale.psi": "Психопатическая реакция",
          "result.scale.ist": "Истероидные проявления",
          "result.scale.ast": "Ранимость, чувствительность",
          "result.recommendation": "Итоговая рекомендация:",
          "result.recommended": "✅ Рекомендован",
          "result.conditional": "⚠️ Условно рекомендован",
          "result.not_recommended": "❌ Не рекомендован",
          "result.retest": "🔄 Рекомендуется повторное тестирование",
          "result.download_pdf": "📥 Скачать результаты (PDF)",
          "result.logout": "Выйти",
          "result.to_profile": "👤 В личный кабинет",
          
          // ========== ЛИЧНЫЙ КАБИНЕТ ==========
          "profile.title": "Личный кабинет",
          "profile.stats": "Моя статистика",
          "profile.total_tests": "Всего тестов",
          "profile.last_test": "Последний тест",
          "profile.last_recommendation": "Последняя рекомендация",
          "profile.history": "История тестирований",
          "profile.no_history": "У вас пока нет пройденных тестов",
          "profile.accesses": "Мои доступы",
          "profile.no_accesses": "У вас пока нет купленных доступов",
          "profile.buy_new": "Приобрести новый тест",
          "profile.buy_button": "Оплатить тест",
          "profile.copy_login": "Копировать логин",
          "profile.copy_password": "Копировать пароль",
          "profile.show_password": "Показать пароль",
          "profile.hide_password": "Скрыть пароль",
          "profile.completed": "Пройден",
          "profile.pending": "Ожидает",
          "profile.view_results": "Посмотреть результаты",
          "profile.download_pdf": "Скачать PDF",
          
          // ========== АДМИН ПАНЕЛЬ ==========
          "admin.title": "Панель администратора",
          "admin.dashboard": "📊 Дашборд",
          "admin.users": "👥 Пользователи",
          "admin.batches": "📦 Потоки",
          "admin.generate": "✨ Генерация",
          "admin.results": "📊 Результаты",
          // Добавьте в секцию profile (после profile.download_pdf)
"profile.stats.total": "Всего тестов",
"profile.stats.recommended": "Рекомендовано",
"profile.stats.conditional": "Условно",
"profile.stats.not_recommended": "Не рекомендовано",
"profile.history": "📋 История тестирований",
"profile.accesses": "🔑 Мои доступы",
"profile.buy_new": "💳 Приобрести новый тест",
"profile.completed": "✅ Пройден",
"profile.pending": "⏳ Ожидает",
"profile.pdf": "PDF",
"profile.pdf_error": "Не удалось создать PDF",
"profile.copied": "Скопировано!",
"profile.payment_error": "Не удалось создать заказ",
"profile.payment_success": "✅ Оплата прошла успешно! Новый доступ добавлен.",
"profile.test_count": "Количество тестов:",
"profile.amount": "Сумма к оплате",
"profile.pay_button": "Оплатить через Kaspi QR",
"profile.creating": "Создание...",
"profile.scan_qr": "Отсканируйте QR код в приложении Kaspi.kz",
"profile.waiting_payment": "Ожидание оплаты...",

// Добавьте в секцию admin (после admin.results.recommendation)
"admin.modal.title": "Ответы пользователя {{login}}",
"admin.modal.total_answers": "Всего ответов:",
"admin.modal.yes_answers": "Ответов \"Да\":",
"admin.modal.no_answers": "Ответов \"Нет\":",
"admin.modal.total_points": "Всего баллов:",
"admin.modal.test_results": "Результаты теста:",
"admin.modal.recommendation": "Рекомендация",
"admin.modal.question_number": "№",
"admin.modal.answer": "Ответ",
"admin.modal.points": "Баллы",
"admin.modal.date": "Дата",
          
          // Админ - Дашборд
          "admin.stats.total": "Всего пользователей",
          "admin.stats.completed": "Завершенные тесты",
          "admin.stats.pending": "Ожидают",
          "admin.stats.completion": "Завершаемость",
          "admin.chart.recommendations": "Распределение рекомендаций",
          "admin.chart.scores": "Средние баллы по шкалам",
          
          // Админ - Пользователи
          "admin.users.search": "🔍 Поиск по логину...",
          "admin.users.filter.status": "Все статусы",
          "admin.users.filter.completed": "Пройден",
          "admin.users.filter.pending": "Ожидает",
          "admin.users.filter.recommendation": "Все рекомендации",
          "admin.users.recommended": "Рекомендован",
          "admin.users.conditional": "Условно",
          "admin.users.not_recommended": "Не рекомендован",
          "admin.users.retest": "Ретест",
          "admin.users.sort.login": "По логину",
          "admin.users.sort.date": "По дате",
          "admin.users.sort.status": "По статусу",
          "admin.users.sort.recommendation": "По рекомендации",
          "admin.users.actions": "Действия",
          "admin.users.pdf": "PDF",
          "admin.users.excel": "Excel",
          "admin.users.status": "Статус",
          "admin.users.completion_date": "Дата завершения",
          "admin.users.recommendation_label": "Рекомендация",
          "admin.users.view_answers": "Просмотр ответов",
          
          // Админ - Генерация
          "admin.generate.title": "Генерация новых пользователей",
          "admin.generate.count": "Количество:",
          "admin.generate.button": "Создать пользователей",
          "admin.generate.creating": "Создание...",
          "admin.generate.success": "✅ Создано {{count}} пользователей",
          "admin.generate.generated": "Созданные пользователи:",
          "admin.generate.download_excel": "📊 Скачать Excel",
          "admin.generate.download_pdf": "📄 Скачать PDF",
          
          // Админ - Результаты
          "admin.results.summary": "Общая ведомость результатов",
          "admin.results.download_pdf": "📥 Скачать PDF ведомость",
          "admin.results.download_excel": "📊 Скачать Excel ведомость",
          "admin.results.login": "Логин",
          "admin.results.isk": "Достоверность",
          "admin.results.con": "Аутоагрессия",
          "admin.results.npn": "НПУ",
          "admin.results.psi": "Психопатия",
          "admin.results.ist": "Истероидность",
          "admin.results.ast": "Ранимость",
          "admin.results.recommendation": "Рекомендация",
          
          // ========== ОПЛАТА ==========
          "payment.title": "Оплата тестирования",
          "payment.count": "Количество тестируемых:",
          "payment.amount": "Сумма к оплате:",
          "payment.pay": "Оплатить через Kaspi QR",
          "payment.scan": "Отсканируйте QR код",
          "payment.waiting": "Ожидание оплаты...",
          "payment.success": "Оплата прошла успешно!",
          "payment.your_logins": "Ваши логины и пароли:",
          "payment.go_to_login": "Перейти к входу",
          "payment.no_login": "Нет логина?",
          "payment.buy_access": "Оплатить доступ",
          "payment.price_per_test": "Стоимость одного теста: 1000 ₸",
          "payment.instructions": "Как оплатить:",
          "payment.instruction1": "Откройте приложение Kaspi.kz",
          "payment.instruction2": "Нажмите на сканер QR кодов",
          "payment.instruction3": "Отсканируйте этот код",
          "payment.instruction4": "Подтвердите оплату",
          "payment.copied": "Скопировано!",
          "payment.error": "Не удалось создать заказ",
          
          // ========== ШКАЛЫ (ПОЛНЫЕ НАЗВАНИЯ) ==========
          "scale.isk.full": "Достоверность (Isk)",
          "scale.con.full": "Аутоагрессия (Con)",
          "scale.npn.full": "Нервно-психическая устойчивость (NPN)",
          "scale.psi.full": "Психопатическая реакция (Psi)",
          "scale.ist.full": "Истероидные проявления (Ist)",
          "scale.ast.full": "Ранимость, чувствительность (Ast)",

          // ========== HOME PAGE (НОВЫЕ ПЕРЕВОДЫ) ==========
"home.my_accesses": "Мои доступы",
"common.copied": "Скопировано!",
"home.purchase_new": "Приобрести новый тест",
"home.purchase_button": "🚀 Купить тест (1000 ₸)",
"home.no_accesses": "У вас пока нет активных доступов",
"home.start_test": "▶️ Пройти тест",
"home.completed": "✅ Пройден",
"home.copy_login": "📋",
"home.copy_password": "🔑",
"home.recent_results": "Последние результаты",
"home.no_results": "У вас пока нет пройденных тестов",
"home.all_results": "📋 Все результаты",
"home.view_profile": "👤 Личный кабинет",
"home.logout": "Выйти",
"home.guest_content": {
  "features_title": "Почему выбирают нас?",
  "features": {
    "scientific": {
      "title": "Научная методика",
      "desc": "Тест основан на профессиональных психологических методиках"
    },
    "scales": {
      "title": "6 шкал оценки",
      "desc": "Достоверность, психопатия, истероидность и другие"
    },
    "anonymous": {
      "title": "Анонимно и безопасно",
      "desc": "Все результаты хранятся в вашем личном кабинете"
    },
    "anywhere": {
      "title": "Доступно везде",
      "desc": "Проходите тест с любого устройства"
    }
  },
  "how_it_works": "Как это работает?",
  "steps": {
    "register": {
      "title": "Зарегистрируйтесь",
      "desc": "Создайте аккаунт за 1 минуту"
    },
    "buy": {
      "title": "Купите тест",
      "desc": "Через Kaspi QR (1000 ₸ за тест)"
    },
    "take": {
      "title": "Пройдите тест",
      "desc": "160 вопросов за 20-30 минут"
    },
    "results": {
      "title": "Изучите результаты",
      "desc": "Подробный отчет по всем шкалам"
    }
  },
  "cta": {
    "title": "Готовы узнать себя лучше?",
    "button": "📝 Зарегистрироваться"
  }
}

        }
      },
      kk: {
        translation: {
          // ========== ОБЩИЕ ==========
          "app.title": "Психологиялық тестілеу",
          "loading": "Жүктелуде...",
          "error": "Қате",
          "success": "Сәтті",
          
          // ========== НАВИГАЦИЯ ==========
          "nav.logout": "Шығу",
          "nav.login": "Кіру",
          "nav.profile": "Жеке кабинет",
          "nav.home": "Басты бет",
          
          // ========== ГЛАВНАЯ СТРАНИЦА ==========
          "home.title": "Кәсіби психологиялық тестілеу",
          "home.subtitle": "6 шкала · Дәл әдістеме · 160 сұрақ",
          "home.why_title": "Неліктен бізді таңдайды?",
          "home.feature1_title": "Ғылыми әдістеме",
          "home.feature1_desc": "Тест кәсіби психологиялық әдістемелерге негізделген",
          "home.feature2_title": "6 бағалау шкаласы",
          "home.feature2_desc": "Сенімділік, психопатия, истерия және т.б.",
          "home.feature3_title": "Анонимді және қауіпсіз",
          "home.feature3_desc": "Барлық нәтижелер тек сіздің жеке кабинетіңізде сақталады",
          "home.feature4_title": "Барлық жерде қолжетімді",
          "home.feature4_desc": "Тестті кез келген құрылғыдан кез келген уақытта тапсырыңыз",
          "home.how_title": "Бұл қалай жұмыс істейді?",
          "home.step1": "Тестті төлеңіз",
          "home.step1_desc": "Kaspi QR арқылы (бір тест 1000 ₸)",
          "home.step2": "Қолжетімділік алыңыз",
          "home.step2_desc": "Жеке кабинетте логин және пароль пайда болады",
          "home.step3": "Тестті тапсырыңыз",
          "home.step3_desc": "160 сұраққа жауап беріңіз (20-30 минут)",
          "home.step4": "Нәтижелерді зерттеңіз",
          "home.step4_desc": "Барлық 6 шкала бойынша егжей-тегжейлі есеп алыңыз",
          "home.cta_title": "Өзіңізді жақсырақ тануға дайынсыз ба?",
          "home.cta_button": "Тестілеуді бастау",
          "home.profile_button": "Жеке кабинетке өту",
          "home.rights": "Барлық құқықтар қорғалған",
          "home.greeting": "Сәлеметсіз бе, {{name}}",
          
          // ========== ЛОГИН ==========
          "login.title": "Психологиялық тестілеу",
          "login.subtitle": "Логин және құпия сөз арқылы кіріңіз",
          "login.username": "Логин",
          "login.password": "Құпия сөз",
          "login.button": "Кіру",
          "login.user.hint": "Тестілеушілер үшін: берілген логин/парольді пайдаланыңыз",
          "login.admin.hint": "Әкімші үшін: admin / admin123",
          "login.placeholder.username": "Мысалы: Тестируемый1",
          "login.placeholder.password": "8 таңбалы пароль",
          "login.error.invalid": "Қате логин немесе пароль",
          "login.no_account": "Логин жоқ па?",
          "login.buy_access": "Төлеу",
          
          // ========== РЕГИСТРАЦИЯ ==========
          "register.title": "Тіркелу",
          "register.subtitle": "Тестілеуге қол жеткізу үшін аккаунт жасаңыз",
          "register.email": "Электрондық пошта",
          "register.password": "Құпия сөз",
          "register.confirm_password": "Құпия сөзді растаңыз",
          "register.button": "Тіркелу",
          "register.password_mismatch": "Құпия сөздер сәйкес келмейді",
          "register.password_short": "Құпия сөз кемінде 6 таңба болуы керек",
          "register.email_exists": "Бұл электрондық пошта тіркелген",
          "register.invalid_email": "Жарамсыз электрондық пошта",
          "register.success_title": "Тіркелу сәтті аяқталды!",
          "register.success_message": "Сіздің поштаңызға растау хаты жіберілді",
          "register.redirect": "Сіз кіру бетіне қайта бағытталасыз...",
          "register.has_account": "Аккаунтыңыз бар ма?",
          "register.no_account": "Аккаунтыңыз жоқ па?",
          
          // Для kk секции:
"profile.stats.total": "Барлық тесттер",
"profile.stats.recommended": "Ұсынылады",
"profile.stats.conditional": "Шартты",
"profile.stats.not_recommended": "Ұсынылмайды",
"profile.history": "📋 Тестілеу тарихы",
"profile.accesses": "🔑 Менің қолжетімділіктерім",
"profile.buy_new": "💳 Жаңа тест сатып алу",
"profile.completed": "✅ Аяқталған",
"profile.pending": "⏳ Күтуде",
"profile.pdf": "PDF",
"profile.pdf_error": "PDF құру мүмкін болмады",
"profile.copied": "Көшірілді!",
"profile.payment_error": "Тапсырыс жасау мүмкін болмады",
"profile.payment_success": "✅ Төлем сәтті өтті! Жаңа қолжетімділік қосылды.",
"profile.test_count": "Тесттер саны:",
"profile.amount": "Төленетін сома",
"profile.pay_button": "Kaspi QR арқылы төлеу",
"profile.creating": "Жасалуда...",
"profile.scan_qr": "Kaspi.kz қосымшасында QR кодты сканерлеңіз",
"profile.waiting_payment": "Төлемді күту...",

"admin.modal.title": "{{login}} пайдаланушысының жауаптары",
"admin.modal.total_answers": "Барлық жауаптар:",
"admin.modal.yes_answers": "\"Иә\" жауаптары:",
"admin.modal.no_answers": "\"Жоқ\" жауаптары:",
"admin.modal.total_points": "Барлық ұпайлар:",
"admin.modal.test_results": "Тест нәтижелері:",
"admin.modal.recommendation": "Ұсыныс",
"admin.modal.question_number": "№",
"admin.modal.answer": "Жауап",
"admin.modal.points": "Ұпайлар",
"admin.modal.date": "Күні",

          // ========== ТЕСТИРОВАНИЕ ==========
          "test.loading": "Сұрақтар жүктелуде...",
          "test.loading.error": "Сұрақтарды жүктеу мүмкін болмады. Кейінірек қайталаңыз.",
          "test.question": "Сұрақ {{number}}/{{total}}",
          "test.progress": "{{percent}}%",
          "test.yes": "Иә",
          "test.no": "Жоқ",
          "test.prev": "← Алдыңғы",
          "test.next": "Келесі →",
          "test.submit": "Тестті аяқтау",
          "test.submitting": "Жіберу...",
          "test.confirm.unanswered": "Сіз {{total}} сұрақтың {{answered}} жауап бердіңіз. Жауап берілмеген: {{unanswered}}.\n\nТестті аяқтағыңыз келе ме?",
          "test.unanswered.title": "Жауап берілмеген: {{count}} сұрақ",
          "test.unanswered.list": "Нөмірлері: {{numbers}}",
          "test.unanswered.go": "Бірінші жауапсызға өту",
          
          // ========== РЕЗУЛЬТАТЫ ==========
          "result.title": "Тест аяқталды!",
          "result.thanks": "Рақмет, {{name}}",
          "result.your_results": "Сіздің нәтижелеріңіз:",
          "result.scale.isk": "Сенімділік",
          "result.scale.con": "Аутоагрессия",
          "result.scale.npn": "Нерв-психикалық тұрақтылық",
          "result.scale.psi": "Психопатиялық реакция",
          "result.scale.ist": "Истероидтық көріністер",
          "result.scale.ast": "Зейінділік, сезімталдық",
          "result.recommendation": "Қорытынды ұсыныс:",
          "result.recommended": "✅ Ұсынылады",
          "result.conditional": "⚠️ Шартты түрде ұсынылады",
          "result.not_recommended": "❌ Ұсынылмайды",
          "result.retest": "🔄 Қайта тестілеу ұсынылады",
          "result.download_pdf": "📥 Нәтижелерді жүктеу (PDF)",
          "result.logout": "Шығу",
          "result.to_profile": "👤 Жеке кабинетке өту",
          
          
          // ========== ЛИЧНЫЙ КАБИНЕТ ==========
          "profile.title": "Жеке кабинет",
          "profile.stats": "Менің статистикам",
          "profile.total_tests": "Барлық тесттер",
          "profile.last_test": "Соңғы тест",
          "profile.last_recommendation": "Соңғы ұсыныс",
          "profile.history": "Тестілеу тарихы",
          "profile.no_history": "Сізде әлі тестілеулер жоқ",
          "profile.accesses": "Менің қолжетімділіктерім",
          "profile.no_accesses": "Сізде әлі сатып алынған қолжетімділіктер жоқ",
          "profile.buy_new": "Жаңа тест сатып алу",
          "profile.buy_button": "Тест сатып алу",
          "profile.copy_login": "Логинді көшіру",
          "profile.copy_password": "Парольді көшіру",
          "profile.show_password": "Парольді көрсету",
          "profile.hide_password": "Парольді жасыру",
          "profile.completed": "Аяқталған",
          "profile.pending": "Күтуде",
          "profile.view_results": "Нәтижелерді көру",
          "profile.download_pdf": "PDF жүктеу",
          
          // ========== АДМИН ПАНЕЛЬ ==========
          "admin.title": "Әкімші панелі",
          "admin.dashboard": "📊 Басқару панелі",
          "admin.users": "👥 Пайдаланушылар",
          "admin.batches": "📦 Ағындар",
          "admin.generate": "✨ Жасау",
          "admin.results": "📊 Нәтижелер",
          
          // Админ - Дашборд
          "admin.stats.total": "Барлық пайдаланушылар",
          "admin.stats.completed": "Аяқталған тесттер",
          "admin.stats.pending": "Күтуде",
          "admin.stats.completion": "Аяқталу көрсеткіші",
          "admin.chart.recommendations": "Ұсыныстардың таралуы",
          "admin.chart.scores": "Шкалалар бойынша орташа баллдар",
          
          // Админ - Пользователи
          "admin.users.search": "🔍 Логин бойынша іздеу...",
          "admin.users.filter.status": "Барлық статустар",
          "admin.users.filter.completed": "Аяқталған",
          "admin.users.filter.pending": "Күтуде",
          "admin.users.filter.recommendation": "Барлық ұсыныстар",
          "admin.users.recommended": "Ұсынылады",
          "admin.users.conditional": "Шартты",
          "admin.users.not_recommended": "Ұсынылмайды",
          "admin.users.retest": "Қайта тест",
          "admin.users.sort.login": "Логин бойынша",
          "admin.users.sort.date": "Күні бойынша",
          "admin.users.sort.status": "Статус бойынша",
          "admin.users.sort.recommendation": "Ұсыныс бойынша",
          "admin.users.actions": "Әрекеттер",
          "admin.users.pdf": "PDF",
          "admin.users.excel": "Excel",
          "admin.users.status": "Статус",
          "admin.users.completion_date": "Аяқталу күні",
          "admin.users.recommendation_label": "Ұсыныс",
          "admin.users.view_answers": "Жауаптарды көру",
          
          // Админ - Генерация
          "admin.generate.title": "Жаңа пайдаланушыларды жасау",
          "admin.generate.count": "Саны:",
          "admin.generate.button": "Пайдаланушыларды жасау",
          "admin.generate.creating": "Жасалуда...",
          "admin.generate.success": "✅ {{count}} пайдаланушы жасалды",
          "admin.generate.generated": "Жасалған пайдаланушылар:",
          "admin.generate.download_excel": "📊 Excel жүктеу",
          "admin.generate.download_pdf": "📄 PDF жүктеу",
          
          // Админ - Результаты
          "admin.results.summary": "Нәтижелердің жалпы ведомосі",
          "admin.results.download_pdf": "📥 PDF ведомость жүктеу",
          "admin.results.download_excel": "📊 Excel ведомость жүктеу",
          "admin.results.login": "Логин",
          "admin.results.isk": "Сенімділік",
          "admin.results.con": "Аутоагрессия",
          "admin.results.npn": "НПТ",
          "admin.results.psi": "Психопатия",
          "admin.results.ist": "Истероидтық",
          "admin.results.ast": "Зейінділік",
          "admin.results.recommendation": "Ұсыныс",
          
          // ========== ОПЛАТА ==========
          "payment.title": "Тестілеу ақысы",
          "payment.count": "Тестілеушілер саны:",
          "payment.amount": "Төленетін сома:",
          "payment.pay": "Kaspi QR арқылы төлеу",
          "payment.scan": "QR кодты сканерлеңіз",
          "payment.waiting": "Төлемді күту...",
          "payment.success": "Төлем сәтті өтті!",
          "payment.your_logins": "Сіздің логиндер мен парольдер:",
          "payment.go_to_login": "Кіру бетіне өту",
          "payment.no_login": "Логин жоқ па?",
          "payment.buy_access": "Сатып алу",
          "payment.price_per_test": "Бір тест құны: 1000 ₸",
          "payment.instructions": "Қалай төлеуге болады:",
          "payment.instruction1": "Kaspi.kz қосымшасын ашыңыз",
          "payment.instruction2": "QR код сканерін басыңыз",
          "payment.instruction3": "Осы кодты сканерлеңіз",
          "payment.instruction4": "Төлемді растаңыз",
          "payment.copied": "Көшірілді!",
          "payment.error": "Тапсырыс жасау мүмкін болмады",
          
          // ========== ШКАЛЫ (ПОЛНЫЕ НАЗВАНИЯ) ==========
          "scale.isk.full": "Сенімділік (Isk)",
          "scale.con.full": "Аутоагрессия (Con)",
          "scale.npn.full": "Нерв-психикалық тұрақтылық (NPN)",
          "scale.psi.full": "Психопатиялық реакция (Psi)",
          "scale.ist.full": "Истероидтық көріністер (Ist)",
          "scale.ast.full": "Зейінділік, сезімталдық (Ast)",
          // ========== HOME PAGE (НОВЫЕ ПЕРЕВОДЫ) ==========
"home.my_accesses": "Менің қолжетімділіктерім",
"common.copied": "Көшірілді!",
"home.purchase_new": "Жаңа тест сатып алу",
"home.purchase_button": "🚀 Тест сатып алу (1000 ₸)",
"home.no_accesses": "Сізде әрекетті қолжетімділіктер жоқ",
"home.start_test": "▶️ Тестті бастау",
"home.completed": "✅ Аяқталған",
"home.copy_login": "📋",
"home.copy_password": "🔑",
"home.recent_results": "Соңғы нәтижелер",
"home.no_results": "Сізде әлі тестілеулер жоқ",
"home.all_results": "📋 Барлық нәтижелер",
"home.view_profile": "👤 Жеке кабинет",
"home.logout": "Шығу",
"home.guest_content": {
  "features_title": "Неліктен бізді таңдайды?",
  "features": {
    "scientific": {
      "title": "Ғылыми әдістеме",
      "desc": "Тест кәсіби психологиялық әдістемелерге негізделген"
    },
    "scales": {
      "title": "6 бағалау шкаласы",
      "desc": "Сенімділік, психопатия, истерия және т.б."
    },
    "anonymous": {
      "title": "Анонимді және қауіпсіз",
      "desc": "Барлық нәтижелер сіздің жеке кабинетіңізде сақталады"
    },
    "anywhere": {
      "title": "Барлық жерде қолжетімді",
      "desc": "Тестті кез келген құрылғыдан тапсырыңыз"
    }
  },
  "how_it_works": "Бұл қалай жұмыс істейді?",
  "steps": {
    "register": {
      "title": "Тіркеліңіз",
      "desc": "1 минутта аккаунт жасаңыз"
    },
    "buy": {
      "title": "Тест сатып алыңыз",
      "desc": "Kaspi QR арқылы (1000 ₸)"
    },
    "take": {
      "title": "Тестті тапсырыңыз",
      "desc": "20-30 минутта 160 сұрақ"
    },
    "results": {
      "title": "Нәтижелерді зерттеңіз",
      "desc": "Барлық шкалалар бойынша егжей-тегжейлі есеп"
    }
  },
  "cta": {
    "title": "Өзіңізді жақсырақ тануға дайынсыз ба?",
    "button": "📝 Тіркелу"
  }
}
        }
      }
    },
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;