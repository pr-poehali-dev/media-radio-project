import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const interviews = [
  {
    id: 1,
    artist: 'Дмитрий Маликов',
    title: 'О новом альбоме и творческом кризисе',
    date: '24 октября 2025',
    excerpt: 'Известный музыкант рассказал о своих творческих планах, работе над новым материалом и том, как преодолевает кризисные моменты.',
  },
  {
    id: 2,
    artist: 'Монеточка',
    title: 'Эволюция звука и новые горизонты',
    date: '22 октября 2025',
    excerpt: 'Артистка поделилась своими мыслями об изменениях в творчестве, влиянии западной музыки и планах на ближайшее будущее.',
  },
  {
    id: 3,
    artist: 'Скриптонит',
    title: 'Казахстанский рэп и мировая сцена',
    date: '20 октября 2025',
    excerpt: 'Рэпер рассказал о развитии хип-хоп культуры в Казахстане, работе с молодыми артистами и международном признании.',
  }
];

export default function Index() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('Загрузка...');
  const [activeSection, setActiveSection] = useState('home');
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [listeners, setListeners] = useState(827);
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
            <h2 className="text-2xl font-bold">Интервью артистов</h2>
            {interviews.map((interview) => (
              <Card key={interview.id} className="bg-card border-border">
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon name="Mic2" size={40} className="text-primary/60" />
                    </div>
                    <div className="flex-1">
                      <Badge className="mb-2 bg-primary/10 text-primary border-primary/20 text-xs">
                        <Icon name="Calendar" size={12} className="mr-1" />
                        {interview.date}
                      </Badge>
                      <h3 className="text-lg font-bold mb-1">{interview.artist}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{interview.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{interview.excerpt}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Контакты</h2>
            
            <Card className="bg-card border-border">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon name="MessageCircle" size={22} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-2">ВКонтакте</h3>
                    <p className="text-sm text-muted-foreground mb-3">По всем вопросам и предложениям пишите нам в ВК</p>
                    <a 
                      href="https://vk.com/kontentmediapro" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      vk.com/kontentmediapro
                      <Icon name="ExternalLink" size={14} />
                    </a>
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

          <nav className="flex items-center justify-around pt-2 border-t border-border">
            <button
              onClick={() => setActiveSection('home')}
              className={`flex flex-col items-center gap-1 py-2 px-4 ${
                activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Home" size={22} />
              <span className="text-xs font-medium">Главная</span>
            </button>
            <button
              onClick={() => setActiveSection('interviews')}
              className={`flex flex-col items-center gap-1 py-2 px-4 ${
                activeSection === 'interviews' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Mic2" size={22} />
              <span className="text-xs font-medium">Интервью</span>
            </button>
            <button
              onClick={() => setActiveSection('contacts')}
              className={`flex flex-col items-center gap-1 py-2 px-4 ${
                activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="MessageCircle" size={22} />
              <span className="text-xs font-medium">Контакты</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}