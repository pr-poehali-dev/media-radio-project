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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://myradio24.org/54137');
      audioRef.current.preload = 'none';
      audioRef.current.crossOrigin = 'anonymous';
    }

    const fetchCurrentTrack = async () => {
      try {
        const response = await fetch('https://myradio24.org/54137/status-json.xsl');
        const data = await response.json();
        if (data && data.icestats && data.icestats.source) {
          const title = data.icestats.source.title || 'КонтентМедиаPRO';
          setCurrentTrack(title);
        }
      } catch (error) {
        setCurrentTrack('КонтентМедиаPRO - В эфире');
      }
    };

    fetchCurrentTrack();
    const interval = setInterval(fetchCurrentTrack, 15000);

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
            <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center ${isPlaying ? 'animate-pulse-glow' : ''}`}>
                    <Icon name="Radio" size={36} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <Badge className="mb-2 bg-primary/90 text-white">
                      <Icon name="Radio" size={12} className="mr-1" />
                      В ЭФИРЕ
                    </Badge>
                    <p className="text-sm text-muted-foreground">Сейчас играет</p>
                    <p className="text-base font-semibold line-clamp-1">{currentTrack}</p>
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
                    <p className="text-xl font-bold text-primary">50+</p>
                    <p className="text-xs text-muted-foreground">Артистов</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-lg font-bold mb-3">Свежие интервью</h2>
              <div className="space-y-3">
                {interviews.map((interview) => (
                  <Card key={interview.id} className="bg-card border-border overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon name="Mic2" size={32} className="text-primary/60" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Badge className="mb-2 bg-secondary text-secondary-foreground text-xs">{interview.date}</Badge>
                          <h3 className="font-bold text-sm mb-1">{interview.artist}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{interview.title}</p>
                          <Button variant="link" className="p-0 h-auto text-primary text-xs">
                            Читать
                            <Icon name="ChevronRight" size={14} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
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
                    <Icon name="Mail" size={22} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground mb-2">Напишите нам</p>
                    <a href="mailto:info@kontentmedia.pro" className="text-sm text-primary">
                      info@kontentmedia.pro
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={22} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">Телефон</h3>
                    <p className="text-sm text-muted-foreground mb-2">Звоните в рабочие часы</p>
                    <a href="tel:+74951234567" className="text-sm text-primary">
                      +7 (495) 123-45-67
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={22} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">Адрес</h3>
                    <p className="text-sm text-muted-foreground mb-2">Приходите в студию</p>
                    <p className="text-sm text-primary">Москва, ул. Тверская, 1</p>
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
