import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const interview = {
  id: 1,
  artist: 'Пан Пантер',
  title: '"Гравитация" - о страсти, любви и творческом тандеме с Катей Денисовой',
  date: '27 октября 2025',
  excerpt: 'Эксклюзивное интервью с Пан Пантером о новом треке "Гравитация", созданном вместе с талантливой певицей Катей Денисовой.',
  image: 'https://cdn.poehali.dev/files/b94c00dd-dea4-4a41-ad62-e05f5dbfcc41.jpg',
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
};

export default function Index() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('Загрузка...');
  const [activeSection, setActiveSection] = useState('home');
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [listeners, setListeners] = useState(827);
  const [showFullInterview, setShowFullInterview] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://myradio24.org/54137');
      audioRef.current.preload = 'none';
      audioRef.current.crossOrigin = 'anonymous';
    }

    const fetchCurrentTrack = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/bd23f8fb-a46d-42e0-ac9e-6ad3f03e9c5e');
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
      setListeners(prev => {
        const change = Math.random() < 0.5 ? -1 : 1;
        const newValue = prev + change;
        return Math.max(827, Math.min(900, newValue));
      });
    };

    const listenersInterval = setInterval(updateListeners, 3000 + Math.random() * 2000);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      document.documentElement.classList.add('standalone');
    }

    return () => {
      clearInterval(interval);
      clearInterval(listenersInterval);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    if ('mediaSession' in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack,
        artist: 'КонтентМедиаPRO',
        album: 'Прямой эфир',
        artwork: [
          { src: 'https://cdn.poehali.dev/files/2d3e3912-b6eb-47c7-ba9c-d15fa1f09df0.jpg', sizes: '512x512', type: 'image/jpeg' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', async () => {
        await audioRef.current?.play();
        setIsPlaying(true);
        navigator.mediaSession.playbackState = 'playing';
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        audioRef.current?.pause();
        setIsPlaying(false);
        navigator.mediaSession.playbackState = 'paused';
      });
    }
  }, [currentTrack]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        if ('mediaSession' in navigator) {
          navigator.mediaSession.playbackState = 'playing';
        }
        
        if ('wakeLock' in navigator) {
          try {
            await (navigator as any).wakeLock.request('screen');
          } catch (err) {
            console.log('Wake Lock not available');
          }
        }
      } catch (error) {
        console.error('Playback failed:', error);
        setIsPlaying(false);
      }
    }
  };

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
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
          
          {installPrompt && (
            <Button onClick={handleInstallClick} size="sm" variant="outline">
              <Icon name="Download" size={16} className="mr-2" />
              Установить
            </Button>
          )}
        </div>
      </header>

      <nav className="sticky top-[61px] bg-background/95 backdrop-blur-sm border-b border-border z-30">
        <div className="max-w-7xl mx-auto flex justify-around">
          <button
            onClick={() => setActiveSection('home')}
            className={`flex flex-col items-center gap-1 py-3 px-4 ${
              activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon name="Home" size={22} />
            <span className="text-xs font-medium">Главная</span>
          </button>
          <button
            onClick={() => setActiveSection('interviews')}
            className={`flex flex-col items-center gap-1 py-3 px-4 ${
              activeSection === 'interviews' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon name="Mic2" size={22} />
            <span className="text-xs font-medium">Интервью</span>
          </button>
          <button
            onClick={() => setActiveSection('contacts')}
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
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center ${isPlaying ? 'animate-pulse-glow' : ''}`}>
                    <Icon name="Radio" size={36} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <Badge className="mb-2 bg-primary/90 text-white w-fit">
                      <Icon name="Radio" size={12} className="mr-1" />
                      В ЭФИРЕ
                    </Badge>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-xs text-muted-foreground">Сейчас слушает: <span className="text-foreground font-semibold">{listeners}</span></p>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">Сейчас играет:</p>
                    <p className="text-base font-bold line-clamp-2 leading-tight">{currentTrack}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="text-xl font-bold text-primary">24/7</p>
                    <p className="text-xs text-muted-foreground">Эфир</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-primary">1000+</p>
                    <p className="text-xs text-muted-foreground">Треков</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-primary">100+</p>
                    <p className="text-xs text-muted-foreground">Артистов</p>
                  </div>
                </div>
              </CardContent>
            </Card>


          </div>
        )}

        {activeSection === 'interviews' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Интервью артистов</h2>
            
            {!showFullInterview ? (
              <Card className="bg-card border-border overflow-hidden">
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
                    onClick={() => setShowFullInterview(true)}
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    <Icon name="BookOpen" size={18} className="mr-2" />
                    Читать интервью
                  </Button>
                </CardContent>
              </Card>
            ) : (
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
                    onClick={() => setShowFullInterview(false)}
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
                      {interview.fullText.split('❤️ О ДРУЖБЕ С КАТЕЙ ДЕНИСОВОЙ')[1]}
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <a 
                        href="https://vk.com/pannpanter" 
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
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Контакты</h2>
            
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
                    <h3 className="font-bold mb-2">ВКонтакте</h3>
                    <p className="text-sm text-muted-foreground">По всем вопросам и предложениям пишите нам в ВК</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center ${isPlaying ? 'animate-pulse-glow' : ''}`}>
                <Icon name="Radio" size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Сейчас играет</p>
                <p className="text-sm font-semibold truncate">{currentTrack}</p>
              </div>
            </div>
            <Button
              onClick={togglePlay}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white w-14 h-14 rounded-full p-0"
            >
              <Icon name={isPlaying ? 'Pause' : 'Play'} size={24} />
            </Button>
          </div>


        </div>
      </div>
    </div>
  );
}