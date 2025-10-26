import { useState } from 'react';
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
    image: 'https://cdn.poehali.dev/files/2d3e3912-b6eb-47c7-ba9c-d15fa1f09df0.jpg'
  },
  {
    id: 2,
    artist: 'Монеточка',
    title: 'Эволюция звука и новые горизонты',
    date: '22 октября 2025',
    excerpt: 'Артистка поделилась своими мыслями об изменениях в творчестве, влиянии западной музыки и планах на ближайшее будущее.',
    image: 'https://cdn.poehali.dev/files/2d3e3912-b6eb-47c7-ba9c-d15fa1f09df0.jpg'
  },
  {
    id: 3,
    artist: 'Скриптонит',
    title: 'Казахстанский рэп и мировая сцена',
    date: '20 октября 2025',
    excerpt: 'Рэпер рассказал о развитии хип-хоп культуры в Казахстане, работе с молодыми артистами и международном признании.',
    image: 'https://cdn.poehali.dev/files/2d3e3912-b6eb-47c7-ba9c-d15fa1f09df0.jpg'
  }
];

export default function Index() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack] = useState('Элджей - Hey, Guys');
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src="https://cdn.poehali.dev/files/2d3e3912-b6eb-47c7-ba9c-d15fa1f09df0.jpg" 
                alt="КонтентМедиаPRO"
                className="h-12 w-auto"
              />
            </div>
            
            <div className="flex items-center gap-8">
              <button 
                onClick={() => setActiveSection('home')}
                className={`text-sm font-medium transition-colors ${activeSection === 'home' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Главная
              </button>
              <button 
                onClick={() => setActiveSection('interviews')}
                className={`text-sm font-medium transition-colors ${activeSection === 'interviews' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Интервью
              </button>
              <button 
                onClick={() => setActiveSection('contacts')}
                className={`text-sm font-medium transition-colors ${activeSection === 'contacts' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Контакты
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {activeSection === 'home' && (
          <div className="container mx-auto px-6 animate-fade-in">
            <section className="py-20 text-center">
              <Badge className="mb-6 bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
                <Icon name="Radio" size={16} className="mr-2" />
                В ЭФИРЕ
              </Badge>
              
              <h1 className="text-6xl font-bold mb-4">
                <span className="text-foreground">КонтентМедиа</span>
                <span className="text-primary">PRO</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Музыка, которая вдохновляет
              </p>

              <Card className="max-w-2xl mx-auto bg-card border-border">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center ${isPlaying ? 'animate-pulse-glow' : ''}`}>
                        <Icon name="Radio" size={32} className="text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">Сейчас играет</p>
                        <p className="text-lg font-semibold">{currentTrack}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-primary hover:bg-primary/90 text-white px-8"
                    >
                      <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} className="mr-2" />
                      {isPlaying ? 'Пауза' : 'Слушать'}
                    </Button>
                    
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-border hover:bg-secondary"
                    >
                      <Icon name="Volume2" size={20} />
                    </Button>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-primary">24/7</p>
                        <p className="text-sm text-muted-foreground">Без перерыва</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">1000+</p>
                        <p className="text-sm text-muted-foreground">Треков</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">50+</p>
                        <p className="text-sm text-muted-foreground">Артистов</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="py-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Свежие интервью</h2>
                <p className="text-muted-foreground">Эксклюзивные беседы с артистами</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {interviews.map((interview) => (
                  <Card key={interview.id} className="bg-card border-border overflow-hidden hover:border-primary transition-all cursor-pointer group">
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                      <Icon name="Mic2" size={64} className="text-primary/40 group-hover:scale-110 transition-transform" />
                    </div>
                    <CardContent className="p-6">
                      <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">{interview.date}</Badge>
                      <h3 className="text-xl font-bold mb-2">{interview.artist}</h3>
                      <p className="text-lg text-muted-foreground mb-3">{interview.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-3">{interview.excerpt}</p>
                      <Button variant="link" className="mt-4 p-0 text-primary">
                        Читать полностью
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'interviews' && (
          <div className="container mx-auto px-6 animate-fade-in">
            <section className="py-16">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold mb-4">Интервью артистов</h2>
                <p className="text-xl text-muted-foreground">Глубокие беседы о музыке и творчестве</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {interviews.map((interview) => (
                  <Card key={interview.id} className="bg-card border-border overflow-hidden hover:border-primary transition-all cursor-pointer group">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                      <Icon name="Mic2" size={80} className="text-primary/40 group-hover:scale-110 transition-transform" />
                    </div>
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          <Icon name="Calendar" size={14} className="mr-2" />
                          {interview.date}
                        </Badge>
                        <Badge className="bg-secondary text-secondary-foreground">
                          <Icon name="Mic2" size={14} className="mr-2" />
                          Интервью
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{interview.artist}</h3>
                      <p className="text-xl text-muted-foreground mb-4">{interview.title}</p>
                      <p className="text-sm text-muted-foreground mb-6">{interview.excerpt}</p>
                      <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                        <Icon name="BookOpen" size={18} className="mr-2" />
                        Читать интервью
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="container mx-auto px-6 animate-fade-in">
            <section className="py-16 max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold mb-4">Свяжитесь с нами</h2>
                <p className="text-xl text-muted-foreground">Мы всегда рады новым идеям и сотрудничеству</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-card border-border p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Email</h3>
                      <p className="text-muted-foreground mb-2">Напишите нам по любым вопросам</p>
                      <a href="mailto:info@kontentmedia.pro" className="text-primary hover:underline">
                        info@kontentmedia.pro
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="bg-card border-border p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Телефон</h3>
                      <p className="text-muted-foreground mb-2">Звоните в рабочие часы</p>
                      <a href="tel:+74951234567" className="text-primary hover:underline">
                        +7 (495) 123-45-67
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="bg-card border-border p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Instagram" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Instagram</h3>
                      <p className="text-muted-foreground mb-2">Следите за нашими новостями</p>
                      <a href="https://instagram.com/kontentmediapro" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        @kontentmediapro
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="bg-card border-border p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Адрес</h3>
                      <p className="text-muted-foreground mb-2">Приходите к нам в студию</p>
                      <p className="text-primary">
                        Москва, ул. Тверская, 1
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 p-10 mt-8 text-center">
                <Icon name="Radio" size={48} className="text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Предложить интервью?</h3>
                <p className="text-muted-foreground mb-6">
                  Если вы артист или представитель артиста и хотите дать интервью для нашего радио, свяжитесь с нами
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить заявку
                </Button>
              </Card>
            </section>
          </div>
        )}
      </main>

      <footer className="border-t border-border py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <img 
                src="https://cdn.poehali.dev/files/2d3e3912-b6eb-47c7-ba9c-d15fa1f09df0.jpg" 
                alt="КонтентМедиаPRO"
                className="h-10 w-auto"
              />
            </div>
            
            <p className="text-muted-foreground text-sm">
              © 2025 КонтентМедиаPRO. Все права защищены.
            </p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Youtube" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Music" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
