import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import AudioPlayer from '@/components/AudioPlayer';

const interviews = [
  {
    id: 1,
    artist: 'Catherine Flox',
    title: 'Эксклюзивное интервью: о музыке, свободе и любви к картошке фри',
    date: '30 октября 2025',
    excerpt: 'Catherine Flox делится своим видением музыки, откровенно рассказывает о творческом пути и о том, что вдохновляет её создавать композиции.',
    image: 'https://cdn.poehali.dev/files/3d89c3c9-2e7e-4e59-b3df-c9d1b93ee86b.jpg',
    vkLink: 'https://vk.com/catherineflox',
    images: [
      'https://cdn.poehali.dev/files/3d89c3c9-2e7e-4e59-b3df-c9d1b93ee86b.jpg',
      'https://cdn.poehali.dev/files/aae19a93-47e9-4273-a5bb-5eadc7a784b0.jpg',
      'https://cdn.poehali.dev/files/5a6d807f-df3c-481c-bf5c-84f7be3bb953.jpg'
    ],
    fullText: `🔥 ЭКСКЛЮЗИВНОЕ ИНТЕРВЬЮ

Catherine Flox: о музыке, свободе и любви к картошке фри

🎨 1. Вопрос: Если бы вашу музыку последнего альбома нужно было описать не как звук, а как вкус, запах или пейзаж, что бы это было?

Ответ: Это был бы вкус сладкого арбуза, запах свежесваренного кофе и пейзаж весны, переходящей в лето.

💎 2. Вопрос: Какая песня из вашего репертуара далась вам дороже всего — эмоционально или физически — и какой шрам или татуировка у вас осталась от этой работы?

Ответ: Выпущенных песен не так много, а вот инструментального творчества — полно. Но если говорить о треке... Let's Dance! Bossanova. От него у меня остался красивый шрам, советую его изучить (смеется).

<img src="https://cdn.poehali.dev/files/aae19a93-47e9-4273-a5bb-5eadc7a784b0.jpg" alt="Catherine Flox" class="interview-photo" />

🎬 3. Вопрос: Представьте, что вы не певец/певица, а режиссер. Какой фильм вы бы сняли и кого бы позвали на главную роль?

Ответ: Что-то красочное, романтическое, комедийное, с хорошей музыкой на фоне... Понимаете, к чему я клоню? (смеется). На главные роли позвала бы Джонни Деппа и Дженнифер Энистон.

🎤 4. Вопрос: Если бы ваш следующий альбом можно было записать в дуэте с кем угодно — живым, ушедшим или даже вымышленным персонажем — кого бы вы выбрали и почему?

Ответ: С группой Depeche Mode или Blink 182. Если из наших, то, возможно, Zivert.

⚡ 5. Вопрос: Какая суперсила у вас есть как у артиста, и какая — как у обычного человека? А в чем ваша главная «слабость»?

Ответ: Как у артиста — я быстро вживаюсь в музыкальные сообщества, конкурсы и так далее. А у обычного человека суперсилы нет... по крайней мере, пока (смеется).

<img src="https://cdn.poehali.dev/files/5a6d807f-df3c-481c-bf5c-84f7be3bb953.jpg" alt="Catherine Flox" class="interview-photo" />

💌 6. Вопрос: Если бы вы могли отправить одно сообщение самому себе в прошлое — тому подростку, который только начинал, — что бы вы написали? Всего один абзац.

Ответ: Ничего не бойся, не сдавайся и гни свою линию. Любая музыка находит своего слушателя, и твоя тоже, милая.

⏰ 7. Вопрос: Представьте, что ваша музыка — это машина времени. В какое десятилетие или эпоху вы бы хотели, чтобы ее слушали люди, и что, как вы надеетесь, она бы им дала?

Ответ: Безусловно, 80-е. Они очень меня вдохновляют. Я надеюсь, моя музыка подарила бы им хорошее настроение и отвлечение от серых дней.

🕊️ 8. Вопрос: Что такое для вас настоящая «свобода» в сегодняшнем мире, полном правил и ожиданий?

Ответ: Свобода — это независимость.

💭 9. Вопрос: Закончите фразу: «Большинство фанатов не знают, но я обожаю...» и «...терпеть не могу...»

Ответ: Обожаю арбуз, мороженое и картошку фри. И терпеть не могу печенку и жидкое яйцо в яичнице.

🎵 10. Вопрос: Составьте плейлист из 3 песен:

· Которая вас сформировала в юности: В юности меня сформировала певица Милен Фармер.
· Которая описывает ваше нынешнее состояние: Моё нынешнее состояние описывает танцевальная музыка в стиле deephouse и рок из 90-2000-х.
· Под которую вы хотите, чтобы вас вспоминали: И хочу, чтобы меня вспоминали под русскую поп-музыку (Виа Гра, Блестящие и т.д.).

✨ Присоединяйтесь к нашему сообществу VK`
  },
  {
    id: 2,
    artist: 'Пан Пантер',
    title: '"Гравитация" - о страсти, любви и творческом тандеме с Катей Денисовой',
    date: '30 октября 2025',
    excerpt: 'Эксклюзивное интервью с Пан Пантером о новом треке "Гравитация", созданном вместе с талантливой певицей Катей Денисовой.',
    image: 'https://cdn.poehali.dev/files/b94c00dd-dea4-4a41-ad62-e05f5dbfcc41.jpg',
    vkLink: 'https://vk.com/pannpanter',
    yandexMusic: 'https://music.yandex.ru/iframe/album/38582527/track/143848317',
    images: [
      'https://cdn.poehali.dev/files/b94c00dd-dea4-4a41-ad62-e05f5dbfcc41.jpg'
    ],
    fullText: `🔥 Эксклюзивное интервью с Пан Пантером

"Гравитация" — это не просто трек. Это чувственный манифест современной любви, где каждая нота пульсирует страстью, а каждое слово пропитано эмоциями. Пан Пантер и Катя Денисова создали настоящий музыкальный взрыв, который притягивает слушателей с неумолимой силой земного притяжения.

💫 О ТРЕКЕ "ГРАВИТАЦИЯ"

"Когда мы с Катей начали работать над этим треком, я сразу понял — это будет нечто особенное, — делится Пан Пантер. — 'Гравитация' родилась из наших ночных студийных сессий, когда творческая энергия била через край. Мы говорили о любви, о страсти, о том магнетизме, который притягивает двух людей друг к другу вопреки всему."

Трек исследует тонкую грань между физическим влечением и глубокими эмоциями. Бархатный вокал Кати Денисовой переплетается с харизматичной подачей Пан Пантера, создавая атмосферу интимности и откровенности. Продакшн трека — современный, дерзкий, с элементами R&B и поп-музыки — идеально подчеркивает эмоциональную глубину композиции.

❤️ О ДРУЖБЕ С КАТЕЙ ДЕНИСОВОЙ

"Катя — невероятная артистка и просто потрясающий человек, — говорит Пан Пантер с теплотой в голосе. — Работать с ней — одно удовольствие. У нее не только красивый голос, но и уникальное видение музыки. Мы с первой студийной встречи поняли друг друга с полуслова."

Певец особо отмечает профессионализм и творческую смелость Кати: "Она не боится экспериментировать, открыто говорить о чувствах в своих песнях. В 'Гравитации' ее вокал раскрывается по-новому — чувственно, мощно, искренне. Я уверен, что наше сотрудничество — это только начало!"

🚀 ПЛАНЫ НА БУДУЩЕЕ

Пан Пантер не скрывает амбиций: "У меня в запасе еще минимум пять новых треков, которые выйдут в ближайшие месяцы. Каждый из них — это отдельная история, отдельная эмоция. Я работаю с крутыми продюсерами, экспериментирую со звучанием."

Артист намекает на возможные новые коллаборации: "С Катей мы уже обсуждаем идеи для следующего совместного проекта. Возможно, это будет целый мини-альбом!"

✨ ИТОГ

"Гравитация" — это трек, который цепляет с первых секунд и не отпускает. Это музыкальное признание в любви к жизни, страсти и искусству. Пан Пантер доказывает, что современная русская поп-музыка может быть не только коммерчески успешной, но и глубоко личной, искренней и по-настоящему трогательной.

Следите за творчеством Пан Пантера — лучшее еще впереди! 🎵🔥`
  },
  {
    id: 3,
    artist: 'Zi Dron',
    title: 'Zi Dron здесь и сейчас: откровенный разговор о музыке, свободе и скандале без цензуры',
    date: '28 октября 2025',
    excerpt: 'ЭКСКЛЮЗИВНОЕ ИНТЕРВЬЮ с Zi Dron о музыке, творчестве и жизненных принципах. Узнайте, что движет одним из самых ярких артистов современной рэп-сцены.',
    image: 'https://cdn.poehali.dev/files/24e14799-cdb1-42fa-983a-5b5234a1e6ca.jpg',
    vkLink: 'https://m.vk.com/harcorerap',
    yandexMusic: 'https://music.yandex.ru/iframe/album/36666533/track/139256845',
    images: [
      'https://cdn.poehali.dev/files/24e14799-cdb1-42fa-983a-5b5234a1e6ca.jpg',
      'https://cdn.poehali.dev/files/d533f998-e174-4d41-867b-6c0c6691d01e.jpg',
      'https://cdn.poehali.dev/files/6a597d2c-ca45-4684-a697-afcb262b66cf.jpg'
    ],
    fullText: `🔥 ЭКСКЛЮЗИВНОЕ ИНТЕРВЬЮ

Zi Dron здесь и сейчас: откровенный разговор о музыке, свободе и скандале без цензуры.

❓ 1. Вопрос: Если бы вашу музыку последнего альбома нужно было описать не как звук, а как вкус, запах или пейзаж, что бы это было?

Ответ: Мой стиль в музыке — это тяжелый, давящий бит, как верно подмечают многие. Так что, если искать образ... это был бы пейзаж индустриального города ночью: грязный, резкий, но полный своей собственной, скандальной красоты. Именно так я и вижу свой вклад в индустрию.

💪 2. Вопрос: Какая песня из вашего репертуара далась вам дороже всего — эмоционально или физически — и какой шрам или татуировка у вас осталась от этой работы?

Ответ: Самыми выстраданными, безусловно, стали треки «Мой талант» и «Воспоминание о прошлом». Они — абсолютно без цензуры. А писать в таком ключе для меня — всегда сложнейший вызов. Эти треки оставили не физический шрам, а глубочайший эмоциональный след — напоминание о том, какой ценой дается искренность.

🎬 3. Вопрос: Представьте, что вы не певец, а режиссер. Какой фильм вы бы сняли и кого бы позвали на главную роль?

Ответ: Я бы снял жесткий криминальный триллер о гангстерах в Берлине, который показал бы всю подноготную жизни в Германии. На главную роль без раздумий позвал бы рэпера Spongebozz'a (он же Sun Diego) — это один и тот же артист. Он — феномен европейской сцены, человек со своим уникальным бэкграундом. Его творчество — гимн упорству. Он стремится быть первым во всем: в рэпе, осваивая все виды читки, и в жизни, добиваясь всего вопреки обстоятельствам. Его харизма и воля — именно то, что нужно для моего фильма.

🎤 4. Вопрос: Если бы ваш следующий альбом можно было записать в дуэте с кем угодно — живым, ушедшим или даже вымышленным персонажем — кого бы вы выбрали и почему?

Ответ: Мой dream-team состоял бы из Spongebozz'a, Kollegah и, возможно, моих ближайших коллег. Даже если одного из них мир знает как рок-музыканта, и он не так известен широкой публике, для меня важна именно наша творческая энергия.

⚡ 5. Вопрос: Какая суперсила у вас есть как у артиста, и какая — как у обычного человека? А в чем ваша главная «слабость»?

Ответ: Моя суперсила — это мой уникальный, собственный стиль. А главная слабость... Наверное, в том, что я иногда слишком сильно стремлюсь к виртуозности в быстрой читке, как у моего кумира. Но я иду к этому, отдавая все силы.

📩 6. Вопрос: Если бы вы могли отправить одно сообщение самому себе в прошлое — тому подростку, который только начинал, — что бы вы написали? Всего один абзац.

Ответ: «Иди только вперед. Ни шагу назад. Не позволяй сомнениям или чужому мнению сломать твой творческий порыв. Каждая строчка, каждый бит — это шаг к тому, чтобы твой голос услышали. Не сбавляй ход».

⏰ 7. Вопрос: Представьте, что ваша музыка — это машина времени. В какое десятилетие или эпоху вы бы хотели, чтобы ее слушали люди, и что, как вы надеетесь, она бы им дала?

Ответ: Моя музыка, как говорят, идеально вписалась бы в расцвет популярного рэпа — в 2000-е. Я надеюсь, она дала бы людям не просто звук, а зарядила бы их стремлением бороться за звание настоящего рэпера. Чтобы они видели в этом не путь к саморазрушению, вредным привычкам и больничным палатам, а силу для взлета к вершине. Пора сломать этот опасный стереотип.

🕊️ 8. Вопрос: Что такое для вас настоящая «свобода» в сегодняшнем мире, полном правил и ожиданий?

Ответ: Свобода — это возможность делать в жизни то, что ты хочешь, и нести полную ответственность за свои поступки. Правила, безусловно, нужны, но когда они превращаются в тотальные запреты — это уже перебор.

💭 9. Вопрос: Закончите фразу: «Большинство фанатов не знают, но я обожаю...» и «...терпеть не могу...»

Ответ: Большинство фанатов не знают, но я обожаю в своей жизни гораздо больше, чем просто рэп. ...И терпеть не могу ложь и оправдания.

🎵 10. Вопрос: Составьте плейлист из 3 песен:

· Которая вас сформировала в юности: «Мой талант»
· Которая описывает ваше нынешнее состояние: «Уровень игры»
· Под которую вы хотите, чтобы вас вспоминали: «Я как немец 2 версия» и «DSNR»

✨ Присоединяйтесь к нашему сообществу VK`
  }
];



export default function Index() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [listenerCount, setListenerCount] = useState(713);
  const [currentTrack, setCurrentTrack] = useState('Загрузка...');
  const [activeSection, setActiveSection] = useState(() => {
    return sessionStorage.getItem('activeSection') || 'home';
  });

  const [listeners, setListeners] = useState(827);
  const [selectedInterviewId, setSelectedInterviewId] = useState<number | null>(() => {
    const saved = sessionStorage.getItem('selectedInterviewId');
    return saved ? parseInt(saved) : null;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollPositionRestored = useRef(false);

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition && !scrollPositionRestored.current) {
      scrollPositionRestored.current = true;
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition));
      }, 50);
    }

    const hash = window.location.hash.slice(1);
    if (hash) {
      const interview = interviews.find(i => i.id === parseInt(hash));
      if (interview) {
        setActiveSection('interviews');
        setSelectedInterviewId(interview.id);
        sessionStorage.setItem('activeSection', 'interviews');
        sessionStorage.setItem('selectedInterviewId', interview.id.toString());
        setTimeout(() => {
          const element = document.getElementById(`interview-${hash}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }

    const handleScroll = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://myradio24.com/player/player.js?v3.31';
    script.setAttribute('data-radio', '54137');
    script.setAttribute('data-interval', '15');
    script.setAttribute('data-vmid', '0');
    script.setAttribute('data-lang', 'ru');
    script.async = true;
    
    document.body.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const clearAllCaches = async () => {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map(reg => reg.unregister()));
      }

      if ('caches' in window) {
        const names = await caches.keys();
        await Promise.all(names.map(name => caches.delete(name)));
      }

      const urlParams = new URLSearchParams(window.location.search);
      if (!urlParams.has('nocache')) {
        window.location.href = window.location.href + (window.location.search ? '&' : '?') + 'nocache=' + Date.now();
      }
    };

    clearAllCaches();

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (!isStandalone && !window.navigator.standalone) {
      setShowInstallButton(true);
    }

    if (!audioRef.current) {
      audioRef.current = new Audio('https://myradio24.org/54137');
      audioRef.current.preload = 'metadata';
      audioRef.current.crossOrigin = 'anonymous';
      
      audioRef.current.addEventListener('ended', () => {
        audioRef.current?.play();
      });
      
      audioRef.current.addEventListener('stalled', () => {
        audioRef.current?.load();
        if (isPlaying) {
          audioRef.current?.play();
        }
      });
      
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setTimeout(() => {
          if (isPlaying) {
            audioRef.current?.load();
            audioRef.current?.play();
          }
        }, 1000);
      });
    }

    const fetchCurrentTrack = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/bd23f8fb-a46d-42e0-ac9e-6ad3f03e9c5e', {
          cache: 'no-store'
        });
        const data = await response.json();
        if (data && data.track) {
          setCurrentTrack(data.track);
        } else {
          setCurrentTrack('КонтентМедиаPRO - Прямой эфир');
        }
      } catch (error) {
        console.error('Failed to fetch track info:', error);
        setCurrentTrack('КонтентМедиаPRO - Прямой эфир');
      }
    };

    fetchCurrentTrack();
    const interval = setInterval(fetchCurrentTrack, 10000);

    const updateListeners = () => {
      setListenerCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change * Math.floor(Math.random() * 3);
        return Math.max(713, Math.min(1003, newCount));
      });
    };

    const listenersInterval = setInterval(updateListeners, 3000 + Math.random() * 2000);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      clearInterval(listenersInterval);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInstallClick = async () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;

    if (isIOS && !isInStandaloneMode) {
      alert('Для установки приложения:\n\n1. Нажмите кнопку "Поделиться" внизу экрана\n2. Выберите "На экран Домой"\n3. Нажмите "Добавить"');
      return;
    }

    if (!deferredPrompt) {
      alert('Для установки приложения:\n\nОткройте меню браузера → "Установить приложение" или "Добавить на главный экран"');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowInstallButton(false);
    }
    
    setDeferredPrompt(null);
  };



  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        audioRef.current.load();
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Playback failed:', error);
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center">
              <Icon name="Radio" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none">
                <span className="text-foreground">КонтентМедиа</span>
                <span className="text-primary">PRO</span>
              </h1>
            </div>
          </div>
          
          {showInstallButton && (
            <Button
              onClick={handleInstallClick}
              size="sm"
              className="bg-gradient-to-r from-primary to-primary/80 text-white border-0 shadow-lg hover:shadow-xl transition-all"
            >
              <Icon name="Download" size={16} className="mr-1" />
              <span className="hidden sm:inline">Установить</span>
            </Button>
          )}

        </div>
      </header>

      {activeSection === 'interviews' && selectedInterviewId === null && (
        <div className="sticky top-[61px] bg-background/95 backdrop-blur-sm border-b border-border z-30">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по интервью..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      )}

      <nav className="sticky top-[61px] bg-background/95 backdrop-blur-sm border-b border-border z-30">
        <div className="max-w-7xl mx-auto flex justify-around">
          <button
            onClick={() => {
              setActiveSection('home');
              setSelectedInterviewId(null);
              sessionStorage.setItem('activeSection', 'home');
              sessionStorage.removeItem('selectedInterviewId');
              sessionStorage.setItem('scrollPosition', '0');
              window.scrollTo(0, 0);
            }}
            className={`flex flex-col items-center gap-1 py-3 px-4 ${
              activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon name="Radio" size={22} />
            <span className="text-xs font-medium">Радио</span>
          </button>
          <button
            onClick={() => {
              setActiveSection('interviews');
              sessionStorage.setItem('activeSection', 'interviews');
              sessionStorage.setItem('scrollPosition', '0');
              window.scrollTo(0, 0);
            }}
            className={`flex flex-col items-center gap-1 py-3 px-4 ${
              activeSection === 'interviews' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon name="Mic2" size={22} />
            <span className="text-xs font-medium">Интервью</span>
          </button>
          <button
            onClick={() => {
              setActiveSection('contacts');
              setSelectedInterviewId(null);
              sessionStorage.setItem('activeSection', 'contacts');
              sessionStorage.removeItem('selectedInterviewId');
              sessionStorage.setItem('scrollPosition', '0');
              window.scrollTo(0, 0);
            }}
            className={`flex flex-col items-center gap-1 py-3 px-4 ${
              activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon name="MessageCircle" size={22} />
            <span className="text-xs font-medium">Контакты</span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeSection === 'home' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center py-4">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                <span className="text-foreground">Твоя музыка. </span>
                <span className="text-foreground">Твой ритм. </span>
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Твоя радиостанция.</span>
              </h2>
            </div>
            
            <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1 w-full">
                    <div id="my_player" className="my_player mb-4" data-player="energy" data-skin="blue" data-width="200" data-autoplay="1" data-volume="70" data-streamurl="https://myradio24.org/54137"></div>
                    <canvas className="my_visualizer w-full mb-4" width="400" height="80" data-size="32" data-revert="0" data-color="rgb" style={{ maxWidth: '400px', height: '80px' }}></canvas>
                  </div>
                  
                  <div className="md:w-64 w-full bg-gradient-to-br from-primary/10 to-background border border-primary/30 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="relative">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                      </div>
                      <span className="text-sm font-bold text-foreground">В ЭФИРЕ</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Слушателей:</span>
                        <span className="text-lg font-bold text-primary">{listenerCount}</span>
                      </div>
                      
                      <div className="h-px bg-border"></div>
                      
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center gap-2">
                          <Icon name="Clock" size={14} className="text-primary" />
                          <span className="text-muted-foreground">24/7 вещание</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Music" size={14} className="text-primary" />
                          <span className="text-muted-foreground">1000+ треков</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Mic2" size={14} className="text-primary" />
                          <span className="text-muted-foreground">100+ артистов</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="font-bold text-lg mb-3">Последние песни</p>
                  <div className="my_lastsongs" data-revert="1" style={{ display: 'inline-block', maxWidth: '100%' }}>
                    <div className="my_lastsonghtml" style={{ display: 'none' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', textAlign: 'left', margin: '3px' }}>
                        <img className="my_lastsong_cover" style={{ width: '45px', height: '45px', borderRadius: '4px', verticalAlign: 'middle' }} alt="Cover" />
                        <span>%songtime%</span>
                        <a href="https://www.youtube.com/results?search_query=%songencode%" target="_blank" rel="noopener noreferrer" title="YouTube">%song%</a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>


          </div>
        )}

        {activeSection === 'interviews' && (
          <div className="space-y-4 animate-fade-in">
            
            {selectedInterviewId === null ? (
              interviews
                .filter(int => {
                  if (!searchQuery.trim() || searchQuery.length < 2) return true;
                  const query = searchQuery.toLowerCase();
                  return (
                    int.artist.toLowerCase().includes(query) ||
                    int.title.toLowerCase().includes(query) ||
                    int.excerpt.toLowerCase().includes(query) ||
                    int.fullText.toLowerCase().includes(query)
                  );
                })
                .map(interview => (
                  <Card 
                    key={interview.id}
                    id={`interview-${interview.id}`}
                    className="bg-card border-border overflow-hidden transition-shadow duration-300"
                  >
                    <div className="relative h-64 overflow-hidden bg-muted">
                      <img 
                        src={interview.image} 
                        alt={interview.artist}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <Badge className="absolute top-4 left-4 bg-primary text-white border-none">
                        <Icon name="Star" size={12} className="mr-1" />
                        Эксклюзив
                      </Badge>
                    </div>
                    <CardContent className="p-5">
                      <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 text-xs">
                        <Icon name="Calendar" size={12} className="mr-1" />
                        {interview.date}
                      </Badge>
                      <h3 className="text-xl font-bold mb-2">{interview.artist}</h3>
                      <p className="text-base text-foreground mb-3 font-medium">{interview.title}</p>
                      <p className="text-sm text-muted-foreground mb-4">{interview.excerpt}</p>
                      <Button 
                        onClick={() => {
                          setSelectedInterviewId(interview.id);
                          sessionStorage.setItem('selectedInterviewId', interview.id.toString());
                          sessionStorage.setItem('scrollPosition', '0');
                          window.scrollTo(0, 0);
                        }}
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                      >
                        <Icon name="BookOpen" size={18} className="mr-2" />
                        Читать интервью
                      </Button>
                    </CardContent>
                  </Card>
                ))
            ) : (
              (() => {
                const interview = interviews.find(int => int.id === selectedInterviewId);
                if (!interview) return null;
                return (
                  <div className="relative">
                  <Card className="bg-card border-border">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img 
                        src={interview.image} 
                        alt={interview.artist}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    </div>
                    <CardContent className="p-5">
                      <Button 
                        onClick={() => {
                          setSelectedInterviewId(null);
                          setSearchQuery('');
                          sessionStorage.removeItem('selectedInterviewId');
                        }}
                        variant="ghost"
                        size="sm"
                        className="mb-4"
                      >
                        <Icon name="ArrowLeft" size={16} className="mr-2" />
                        Назад
                      </Button>
                      <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 text-xs">
                        <Icon name="Calendar" size={12} className="mr-1" />
                        {interview.date}
                      </Badge>
                      <h3 className="text-2xl font-bold mb-2">{interview.artist}</h3>
                      <p className="text-lg text-foreground mb-4 font-medium">{interview.title}</p>
                      <div className="prose prose-sm max-w-none">
                        {interview.id === 1 ? (
                          <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: interview.fullText.replace(/<img /g, '<img class="w-full h-auto rounded-2xl my-6" ') }} />
                        ) : interview.id === 3 ? (
                          <>
                            <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                              {interview.fullText.split('🎬 3. Вопрос:')[0]}
                            </div>
                            
                            <div className="my-6">
                              <div className="relative w-full h-auto mb-4 bg-muted rounded-2xl overflow-hidden">
                                <img 
                                  src={(interview as any).images[0]} 
                                  alt="Zi Dron"
                                  className="w-full h-auto object-contain"
                                />
                              </div>
                            </div>

                            <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                              {'🎬 3. Вопрос:' + interview.fullText.split('🎬 3. Вопрос:')[1].split('⚡ 5. Вопрос:')[0]}
                            </div>

                            <div className="my-6">
                              <div className="relative w-full h-auto mb-4 bg-muted rounded-2xl overflow-hidden">
                                <img 
                                  src={(interview as any).images[1]} 
                                  alt="Zi Dron"
                                  className="w-full h-auto object-contain"
                                />
                              </div>
                            </div>

                            <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                              {'⚡ 5. Вопрос:' + interview.fullText.split('⚡ 5. Вопрос:')[1].split('🎵 10. Вопрос:')[0]}
                            </div>

                            <div className="my-6">
                              <div className="relative w-full h-auto mb-4 bg-muted rounded-2xl overflow-hidden">
                                <img 
                                  src={(interview as any).images[2]} 
                                  alt="Zi Dron"
                                  className="w-full h-auto object-contain"
                                />
                              </div>
                            </div>

                            <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                              {'🎵 10. Вопрос:' + interview.fullText.split('🎵 10. Вопрос:')[1]}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                              {interview.fullText.split('❤️ О ДРУЖБЕ С КАТЕЙ ДЕНИСОВОЙ')[0]}
                            </div>
                            
                            <div className="my-6">
                              <h4 className="text-base font-bold mb-4">❤️ О ДРУЖБЕ С КАТЕЙ ДЕНИСОВОЙ</h4>
                              <div className="relative w-full h-auto mb-4 bg-muted rounded-2xl overflow-hidden">
                                <img 
                                  src="https://cdn.poehali.dev/files/3cd66fac-8071-4c21-9a72-701e7112b5f8.jpg" 
                                  alt="Пан Пантер и Катя Денисова"
                                  className="w-full h-auto object-contain"
                                />
                              </div>
                            </div>
                            
                            <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                              {interview.fullText.split('❤️ О ДРУЖБЕ С КАТЕЙ ДЕНИСОВОЙ')[1] || ''}
                            </div>
                          </>
                        )}
                      </div>
                      
                      {interview.id === 1 ? (
                        <>
                          <div className="my-6 p-4 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl shadow-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                                <Icon name="Music" size={16} className="text-white" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground">🎵 Послушай трек "Ночь без сна"</p>
                                <p className="text-xs text-muted-foreground">Catherine Flox</p>
                              </div>
                            </div>
                            <div className="rounded-lg overflow-hidden">
                              <iframe 
                                frameBorder="0" 
                                allow="clipboard-write" 
                                style={{ border: 'none', width: '100%', height: '240px', display: 'block' }}
                                width="100%" 
                                height="240" 
                                src="https://music.yandex.ru/iframe/album/36452380/track/138751085"
                                title="Ночь без сна - Catherine Flox"
                              />
                            </div>
                          </div>

                          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                            <div className="flex items-center gap-4">
                              <a 
                                href={(interview as any).vkLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-14 h-14 bg-[#0077FF] hover:bg-[#0066DD] transition-all hover:scale-105 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                              >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12.785 16.241s.288-.032.436-.193c.136-.148.131-.425.131-.425s-.019-1.298.574-1.489c.584-.188 1.336 1.254 2.132 1.808.602.419 1.06.327 1.06.327l2.128-.03s1.113-.07.585-.959c-.043-.073-.308-.659-1.588-1.863-1.34-1.26-1.16-1.057.454-3.239.982-1.328 1.375-2.137 1.252-2.484-.117-.331-.84-.244-.84-.244l-2.396.015s-.178-.025-.309.056c-.128.079-.21.263-.21.263s-.377.1-.9 2.09c-.552 2.099-1.607 4.403-1.799 4.017-.447-1.068-.327-4.286-.327-4.286s.01-.682-.215-.988c-.187-.254-.528-.335-.678-.355-.378-.05-1.395-.007-2.458.014-1.364.027-.904.405-.904.405s.461.087.631.614c.224.695.216 2.257.216 2.257s.129 2.528-.301 2.841c-.294.215-.697-.224-1.562-2.236-.443-.961-.778-2.024-.778-2.024s-.064-.159-.18-.244c-.14-.104-.336-.137-.336-.137l-2.276.014s-.342.01-.468.161c-.112.134-.009.411-.009.411s1.769 4.207 3.771 6.326c1.835 1.943 3.918 1.816 3.918 1.816h.945z" fill="white"/>
                                </svg>
                              </a>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-foreground mb-1">✨ Присоединяйся к сообществу!</p>
                                <p className="text-xs text-muted-foreground">Подписывайся на Catherine Flox</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 p-4 bg-muted/30 border border-muted rounded-2xl space-y-3">
                            <div>
                              <p className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                                <Icon name="Share2" size={16} className="text-primary" />
                                Поделиться интервью
                              </p>
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    const url = encodeURIComponent(`${window.location.origin}${window.location.pathname}#1`);
                                    const text = encodeURIComponent('✨ Интервью с Catherine Flox о музыке, свободе и любви к картошке фри');
                                    window.open(`https://vk.com/share.php?url=${url}&title=${text}`, '_blank');
                                  }}
                                  className="bg-[#0077FF] hover:bg-[#0066DD] text-white"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                                    <path d="M12.785 16.241s.288-.032.436-.193c.136-.148.131-.425.131-.425s-.019-1.298.574-1.489c.584-.188 1.336 1.254 2.132 1.808.602.419 1.06.327 1.06.327l2.128-.03s1.113-.07.585-.959c-.043-.073-.308-.659-1.588-1.863-1.34-1.26-1.16-1.057.454-3.239.982-1.328 1.375-2.137 1.252-2.484-.117-.331-.84-.244-.84-.244l-2.396.015s-.178-.025-.309.056c-.128.079-.21.263-.21.263s-.377.1-.9 2.09c-.552 2.099-1.607 4.403-1.799 4.017-.447-1.068-.327-4.286-.327-4.286s.01-.682-.215-.988c-.187-.254-.528-.335-.678-.355-.378-.05-1.395-.007-2.458.014-1.364.027-.904.405-.904.405s.461.087.631.614c.224.695.216 2.257.216 2.257s.129 2.528-.301 2.841c-.294.215-.697-.224-1.562-2.236-.443-.961-.778-2.024-.778-2.024s-.064-.159-.18-.244c-.14-.104-.336-.137-.336-.137l-2.276.014s-.342.01-.468.161c-.112.134-.009.411-.009.411s1.769 4.207 3.771 6.326c1.835 1.943 3.918 1.816 3.918 1.816h.945z" fill="white"/>
                                  </svg>
                                  VK
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    const url = encodeURIComponent(`${window.location.origin}${window.location.pathname}#1`);
                                    const text = encodeURIComponent('✨ Интервью с Catherine Flox о музыке, свободе и любви к картошке фри');
                                    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
                                  }}
                                  className="bg-[#0088cc] hover:bg-[#0077bb] text-white"
                                >
                                  <Icon name="Send" size={16} className="mr-1" />
                                  Telegram
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    const url = encodeURIComponent(`${window.location.origin}${window.location.pathname}#1`);
                                    const text = encodeURIComponent('✨ Интервью с Catherine Flox о музыке, свободе и любви к картошке фри');
                                    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
                                  }}
                                  className="bg-[#25D366] hover:bg-[#1fbf58] text-white"
                                >
                                  <Icon name="MessageCircle" size={16} className="mr-1" />
                                  WhatsApp
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    const url = `${window.location.origin}${window.location.pathname}#1`;
                                    navigator.clipboard.writeText(url);
                                  }}
                                  className="border-border"
                                >
                                  <Icon name="Copy" size={16} className="mr-1" />
                                  Копировать
                                </Button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : interview.id === 3 ? (
                        <>
                          <div className="my-6 p-4 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl shadow-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                                <Icon name="Music" size={16} className="text-white" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground">🎵 Послушай трек "Мой талант"</p>
                                <p className="text-xs text-muted-foreground">Zi Dron</p>
                              </div>
                            </div>
                            <div className="rounded-lg overflow-hidden">
                              <iframe 
                                frameBorder="0" 
                                allow="clipboard-write" 
                                style={{ border: 'none', width: '100%', height: '240px', display: 'block' }}
                                width="100%" 
                                height="240" 
                                src={(interview as any).yandexMusic}
                                title="Мой талант - Zi Dron"
                              />
                            </div>
                          </div>
                          
                          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                            <div className="flex items-center gap-4">
                              <a 
                                href={(interview as any).vkLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-14 h-14 bg-[#0077FF] hover:bg-[#0066DD] transition-all hover:scale-105 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                              >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12.785 16.241s.288-.032.436-.193c.136-.148.131-.425.131-.425s-.019-1.298.574-1.489c.584-.188 1.336 1.254 2.132 1.808.602.419 1.06.327 1.06.327l2.128-.03s1.113-.07.585-.959c-.043-.073-.308-.659-1.588-1.863-1.34-1.26-1.16-1.057.454-3.239.982-1.328 1.375-2.137 1.252-2.484-.117-.331-.84-.244-.84-.244l-2.396.015s-.178-.025-.309.056c-.128.079-.21.263-.21.263s-.377.1-.9 2.09c-.552 2.099-1.607 4.403-1.799 4.017-.447-1.068-.327-4.286-.327-4.286s.01-.682-.215-.988c-.187-.254-.528-.335-.678-.355-.378-.05-1.395-.007-2.458.014-1.364.027-.904.405-.904.405s.461.087.631.614c.224.695.216 2.257.216 2.257s.129 2.528-.301 2.841c-.294.215-.697-.224-1.562-2.236-.443-.961-.778-2.024-.778-2.024s-.064-.159-.18-.244c-.14-.104-.336-.137-.336-.137l-2.276.014s-.342.01-.468.161c-.112.134-.009.411-.009.411s1.769 4.207 3.771 6.326c1.835 1.943 3.918 1.816 3.918 1.816h.945z" fill="white"/>
                                </svg>
                              </a>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-foreground mb-1">🔥 Присоединяйся к сообществу!</p>
                                <p className="text-xs text-muted-foreground">Подписывайся на Zi Dron — эксклюзивы, новинки, хардкорный рэп</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 p-4 bg-muted/30 border border-muted rounded-2xl space-y-3">
                            <div>
                              <p className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                                <Icon name="Share2" size={16} className="text-primary" />
                                Поделиться интервью
                              </p>
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    const url = encodeURIComponent(`${window.location.origin}${window.location.pathname}#3`);
                                    const text = encodeURIComponent('🔥 Откровенное интервью с Zi Dron о музыке и свободе');
                                    window.open(`https://vk.com/share.php?url=${url}&title=${text}`, '_blank');
                                  }}
                                  className="bg-[#0077FF] hover:bg-[#0066DD] text-white"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                                    <path d="M12.785 16.241s.288-.032.436-.193c.136-.148.131-.425.131-.425s-.019-1.298.574-1.489c.584-.188 1.336 1.254 2.132 1.808.602.419 1.06.327 1.06.327l2.128-.03s1.113-.07.585-.959c-.043-.073-.308-.659-1.588-1.863-1.34-1.26-1.16-1.057.454-3.239.982-1.328 1.375-2.137 1.252-2.484-.117-.331-.84-.244-.84-.244l-2.396.015s-.178-.025-.309.056c-.128.079-.21.263-.21.263s-.377.1-.9 2.09c-.552 2.099-1.607 4.403-1.799 4.017-.447-1.068-.327-4.286-.327-4.286s.01-.682-.215-.988c-.187-.254-.528-.335-.678-.355-.378-.05-1.395-.007-2.458.014-1.364.027-.904.405-.904.405s.461.087.631.614c.224.695.216 2.257.216 2.257s.129 2.528-.301 2.841c-.294.215-.697-.224-1.562-2.236-.443-.961-.778-2.024-.778-2.024s-.064-.159-.18-.244c-.14-.104-.336-.137-.336-.137l-2.276.014s-.342.01-.468.161c-.112.134-.009.411-.009.411s1.769 4.207 3.771 6.326c1.835 1.943 3.918 1.816 3.918 1.816h.945z" fill="white"/>
                                  </svg>
                                  VK
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    const url = encodeURIComponent(`${window.location.origin}${window.location.pathname}#3`);
                                    const text = encodeURIComponent('🔥 Откровенное интервью с Zi Dron о музыке и свободе');
                                    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
                                  }}
                                  className="bg-[#0088cc] hover:bg-[#0077bb] text-white"
                                >
                                  <Icon name="Send" size={16} className="mr-1" />
                                  Telegram
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    const url = encodeURIComponent(`${window.location.origin}${window.location.pathname}#3`);
                                    const text = encodeURIComponent('🔥 Откровенное интервью с Zi Dron о музыке и свободе');
                                    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
                                  }}
                                  className="bg-[#25D366] hover:bg-[#1fbf58] text-white"
                                >
                                  <Icon name="MessageCircle" size={16} className="mr-1" />
                                  WhatsApp
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    const url = `${window.location.origin}${window.location.pathname}#3`;
                                    navigator.clipboard.writeText(url);
                                  }}
                                  className="border-border"
                                >
                                  <Icon name="Copy" size={16} className="mr-1" />
                                  Копировать
                                </Button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : interview.id === 2 ? (
                        <>
                          <div className="my-6 p-4 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl shadow-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                                <Icon name="Music" size={16} className="text-white" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground">🎵 Послушай трек "Гравитация"</p>
                                <p className="text-xs text-muted-foreground">Катя Денисова feat. Пан Пантер</p>
                              </div>
                            </div>
                            <div className="rounded-lg overflow-hidden">
                              <iframe 
                                frameBorder="0" 
                                allow="clipboard-write; autoplay" 
                                style={{ border: 'none', width: '100%', height: '180px', display: 'block' }}
                                width="100%" 
                                height="180" 
                                src={(interview as any).yandexMusic}
                                title="Гравитация - Катя Денисова"
                              />
                            </div>
                          </div>
                          
                          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                            <div className="flex items-center gap-4">
                              <a 
                                href={(interview as any).vkLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-14 h-14 bg-[#0077FF] hover:bg-[#0066DD] transition-all hover:scale-105 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                              >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12.785 16.241s.288-.032.436-.193c.136-.148.131-.425.131-.425s-.019-1.298.574-1.489c.584-.188 1.336 1.254 2.132 1.808.602.419 1.06.327 1.06.327l2.128-.03s1.113-.07.585-.959c-.043-.073-.308-.659-1.588-1.863-1.34-1.26-1.16-1.057.454-3.239.982-1.328 1.375-2.137 1.252-2.484-.117-.331-.84-.244-.84-.244l-2.396.015s-.178-.025-.309.056c-.128.079-.21.263-.21.263s-.377.1-.9 2.09c-.552 2.099-1.607 4.403-1.799 4.017-.447-1.068-.327-4.286-.327-4.286s.01-.682-.215-.988c-.187-.254-.528-.335-.678-.355-.378-.05-1.395-.007-2.458.014-1.364.027-.904.405-.904.405s.461.087.631.614c.224.695.216 2.257.216 2.257s.129 2.528-.301 2.841c-.294.215-.697-.224-1.562-2.236-.443-.961-.778-2.024-.778-2.024s-.064-.159-.18-.244c-.14-.104-.336-.137-.336-.137l-2.276.014s-.342.01-.468.161c-.112.134-.009.411-.009.411s1.769 4.207 3.771 6.326c1.835 1.943 3.918 1.816 3.918 1.816h.945z" fill="white"/>
                                </svg>
                              </a>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-foreground mb-1">🔥 Не пропусти новые хиты!</p>
                                <p className="text-xs text-muted-foreground">Подписывайся на Пан Пантера — эксклюзивы, закулисье, премьеры треков</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 p-4 bg-muted/30 border border-muted rounded-2xl space-y-3">
                            <div>
                              <p className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                                <Icon name="Share2" size={16} className="text-primary" />
                                Поделиться интервью
                              </p>
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    const url = encodeURIComponent(`${window.location.origin}${window.location.pathname}#2`);
                                    const text = encodeURIComponent('🔥 Интервью с Пан Пантером о треке "Гравитация"');
                                    window.open(`https://vk.com/share.php?url=${url}&title=${text}`, '_blank');
                                  }}
                                  className="bg-[#0077FF] hover:bg-[#0066DD] text-white"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                                    <path d="M12.785 16.241s.288-.032.436-.193c.136-.148.131-.425.131-.425s-.019-1.298.574-1.489c.584-.188 1.336 1.254 2.132 1.808.602.419 1.06.327 1.06.327l2.128-.03s1.113-.07.585-.959c-.043-.073-.308-.659-1.588-1.863-1.34-1.26-1.16-1.057.454-3.239.982-1.328 1.375-2.137 1.252-2.484-.117-.331-.84-.244-.84-.244l-2.396.015s-.178-.025-.309.056c-.128.079-.21.263-.21.263s-.377.1-.9 2.09c-.552 2.099-1.607 4.403-1.799 4.017-.447-1.068-.327-4.286-.327-4.286s.01-.682-.215-.988c-.187-.254-.528-.335-.678-.355-.378-.05-1.395-.007-2.458.014-1.364.027-.904.405-.904.405s.461.087.631.614c.224.695.216 2.257.216 2.257s.129 2.528-.301 2.841c-.294.215-.697-.224-1.562-2.236-.443-.961-.778-2.024-.778-2.024s-.064-.159-.18-.244c-.14-.104-.336-.137-.336-.137l-2.276.014s-.342.01-.468.161c-.112.134-.009.411-.009.411s1.769 4.207 3.771 6.326c1.835 1.943 3.918 1.816 3.918 1.816h.945z" fill="white"/>
                                  </svg>
                                  VK
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    const url = encodeURIComponent(`${window.location.origin}${window.location.pathname}#2`);
                                    const text = encodeURIComponent('🔥 Интервью с Пан Пантером о треке "Гравитация"');
                                    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
                                  }}
                                  className="bg-[#0088cc] hover:bg-[#0077bb] text-white"
                                >
                                  <Icon name="Send" size={16} className="mr-1" />
                                  Telegram
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    const url = encodeURIComponent(`${window.location.origin}${window.location.pathname}#2`);
                                    const text = encodeURIComponent('🔥 Интервью с Пан Пантером о треке "Гравитация"');
                                    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
                                  }}
                                  className="bg-[#25D366] hover:bg-[#1fbf58] text-white"
                                >
                                  <Icon name="MessageCircle" size={16} className="mr-1" />
                                  WhatsApp
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    const url = `${window.location.origin}${window.location.pathname}#2`;
                                    navigator.clipboard.writeText(url);
                                  }}
                                  className="border-border"
                                >
                                  <Icon name="Copy" size={16} className="mr-1" />
                                  Копировать
                                </Button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : null}
                      
                      <div className="mt-6">
                        <Button 
                          onClick={() => {
                            setSelectedInterviewId(null);
                            setSearchQuery('');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-md"
                          size="lg"
                        >
                          <Icon name="ArrowLeft" size={18} className="mr-2" />
                          Вернуться к списку интервью
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  </div>
                );
              })()
            )}
            
            {showScrollTop && selectedInterviewId !== null && (
              <div className="fixed right-3 bottom-24 flex flex-col gap-1.5 z-40">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-9 h-9 bg-primary/90 hover:bg-primary text-white rounded-full shadow-md backdrop-blur-sm transition-all hover:scale-110 flex items-center justify-center group"
                  aria-label="Наверх"
                >
                  <Icon name="ArrowUp" size={16} className="group-hover:translate-y-[-2px] transition-transform" />
                </button>
                <button
                  onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
                  className="w-9 h-9 bg-primary/90 hover:bg-primary text-white rounded-full shadow-md backdrop-blur-sm transition-all hover:scale-110 flex items-center justify-center group"
                  aria-label="Вниз"
                >
                  <Icon name="ArrowDown" size={16} className="group-hover:translate-y-[2px] transition-transform" />
                </button>
              </div>
            )}
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Контакты</h2>
            
            <Card className="bg-card border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 relative h-64 md:h-auto">
                    <img 
                      src="https://cdn.poehali.dev/files/2483b166-8105-47df-85b5-ac1037c1a202.jpg" 
                      alt="Ольга Миляр"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-2">Ольга Миляр</h3>
                    <p className="text-sm text-primary font-semibold mb-4">Основатель «Контент Медиа PRO»</p>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>Я — журналист по призванию (окончила с красным дипломом СПбГУ) и практик с опытом работы в редакциях.</p>
                      <p>Создала «Контент Медиа PRO», чтобы быть трамплином для начинающих музыкантов, писателей, художников и просто творческих людей. Мой профессиональный опыт и личное убеждение, что добрый и качественный контент меняет мир к лучшему, легли в основу этого проекта.</p>
                      <p className="font-medium text-foreground">Здесь мы занимаемся реальным пиаром и поддерживаем тех, о ком завтра заговорят все.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/30 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Icon name="Tv" size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                      📺 on-line TV
                      <span className="text-xs font-normal bg-primary/20 text-primary px-2 py-1 rounded-full">В разработке</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Скоро здесь появятся музыкальные клипы, эксклюзивные видеоинтервью и многое другое
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Clock" size={14} className="text-primary" />
                      <span>Следите за обновлениями</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <a 
                    href="https://vk.com/kontentmediapro" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#0077FF] hover:bg-[#0066DD] transition-colors rounded-2xl flex items-center justify-center flex-shrink-0"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.785 16.241s.288-.032.436-.193c.136-.148.131-.425.131-.425s-.019-1.298.574-1.489c.584-.188 1.336 1.254 2.132 1.808.602.419 1.06.327 1.06.327l2.128-.03s1.113-.07.585-.959c-.043-.073-.308-.659-1.588-1.863-1.34-1.26-1.16-1.057.454-3.239.982-1.328 1.375-2.137 1.252-2.484-.117-.331-.84-.244-.84-.244l-2.396.015s-.178-.025-.309.056c-.128.079-.21.263-.21.263s-.377.1-.9 2.09c-.552 2.099-1.607 4.403-1.799 4.017-.447-1.068-.327-4.286-.327-4.286s.01-.682-.215-.988c-.187-.254-.528-.335-.678-.355-.378-.05-1.395-.007-2.458.014-1.364.027-.904.405-.904.405s.461.087.631.614c.224.695.216 2.257.216 2.257s.129 2.528-.301 2.841c-.294.215-.697-.224-1.562-2.236-.443-.961-.778-2.024-.778-2.024s-.064-.159-.18-.244c-.14-.104-.336-.137-.336-.137l-2.276.014s-.342.01-.468.161c-.112.134-.009.411-.009.411s1.769 4.207 3.771 6.326c1.835 1.943 3.918 1.816 3.918 1.816h.945z" fill="white"/>
                    </svg>
                  </a>
                  <div className="flex-1">
                    <a 
                      href="https://vk.com/kontentmediapro" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-bold mb-2 inline-block hover:text-primary transition-colors"
                    >
                      ВКонтакте
                    </a>
                    <p className="text-sm text-muted-foreground">По всем вопросам и предложениям пишите нам в ВК</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}