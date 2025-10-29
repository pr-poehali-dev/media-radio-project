import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import AudioPlayer from '@/components/AudioPlayer';

const interviews = [
  {
    id: 1,
    slug: 'catherine-flox',
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

Ответ: «Не бойся пробовать что-то новое!»

🍟 7. Вопрос: Что для вас значит успех в музыке сейчас? Это количество прослушиваний, эмоциональный отклик, что-то ещё?

Ответ: Это отклик, творческая реализация, вдохновение идти дальше и двигаться вперёд. Ещё успех — это возможность заниматься любимым делом в нужное время, в нужном месте и с нужными людьми.

🌌 8. Вопрос: Если бы вы создавали саундтрек к своему дню, какие три песни туда бы вошли?

Ответ: Это были бы мои песни — Now, Night и Let's dance! Bossanova (рекламу мне за это не платят).

🎁 9. Вопрос: Есть ли у вас какой-то нелепый или странный ритуал перед выступлением или записью?

Ответ: Есть картошку фри, смотря в зеркало (смеется). Шучу, таких странных ритуалов нет.

✨ 10. Вопрос: Какое музыкальное открытие последнего года вас больше всего впечатлило?

Ответ: Сотрудничество с лейблом ZOMB!

🌍 11. Вопрос: Представьте, что вы стали продюсером молодого артиста. Какой главный совет вы дали бы ему в самом начале карьеры?

Ответ: «Не останавливайся!»

🎉 Финальный вопрос: Если бы вы могли устроить один идеальный концерт — без ограничений по месту, сцене или зрителям — где бы это было и какая была бы атмосфера?

Ответ: Был бы закат... или рассвет — вдохновляющее время суток! На свежем воздухе, летом. А музыка и атмосфера — неважно, главное, чтобы мне нравилось!

—

📌 Подписывайтесь на Catherine Flox в социальных сетях и следите за новыми релизами!`,
  },
  {
    id: 2,
    slug: 'pan-pantera',
    artist: 'Пан Пантера',
    title: 'Интервью: музыка, вдохновение и эксперименты',
    date: '28 октября 2025',
    excerpt: 'Пан Пантера рассказывает о своем творческом пути, музыкальных экспериментах и планах на будущее.',
    image: 'https://cdn.poehali.dev/files/3e1e06a6-ba95-44cc-9b24-0c20db67e42f.jpg',
    vkLink: 'https://vk.com/pannpanter',
    fullText: `🎤 Интервью с Пан Пантера

Пан Пантера делится своими мыслями о музыке, творчестве и жизни артиста.

Следите за новыми релизами и новостями!`,
  },
  {
    id: 3,
    slug: 'zi-dron',
    artist: 'Zi Dron',
    title: 'Zi Dron: путь в музыке и творческие эксперименты',
    date: '25 октября 2025',
    excerpt: 'Zi Dron откровенно говорит о своем творческом пути, вдохновении и планах на будущее.',
    image: 'https://cdn.poehali.dev/files/1eba9ebc-6426-476c-9a07-03ad9ab1c15e.jpg',
    vkLink: 'https://vk.com/zidron',
    images: [
      'https://cdn.poehali.dev/files/1eba9ebc-6426-476c-9a07-03ad9ab1c15e.jpg',
      'https://cdn.poehali.dev/files/b5a74a12-7e8e-4bf5-92c8-d83f39695bec.jpg',
      'https://cdn.poehali.dev/files/5f99f0fb-61f8-4ea9-a30f-7a06ed9f27e0.jpg'
    ],
    fullText: `🎤 Интервью с Zi Dron

<img src="https://cdn.poehali.dev/files/b5a74a12-7e8e-4bf5-92c8-d83f39695bec.jpg" alt="Zi Dron" class="interview-photo" />

Zi Dron рассказывает о своем музыкальном пути и творческих экспериментах.

<img src="https://cdn.poehali.dev/files/5f99f0fb-61f8-4ea9-a30f-7a06ed9f27e0.jpg" alt="Zi Dron" class="interview-photo" />

Следите за обновлениями!`,
  }
];

export default function InterviewPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const interview = interviews.find(i => i.slug === slug);

  useEffect(() => {
    if (!interview) {
      navigate('/');
    }
  }, [interview, navigate]);

  useEffect(() => {
    if (interview) {
      document.title = `${interview.artist} - Контент Медиа PRO`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', interview.excerpt);
      }
    }
  }, [interview]);

  if (!interview) {
    return null;
  }

  const togglePlay = () => setIsPlaying(!isPlaying);

  const formatText = (text: string) => {
    return text.split('\n').map((paragraph, index) => {
      if (paragraph.trim().startsWith('<img')) {
        const imgMatch = paragraph.match(/src="([^"]+)"\s*alt="([^"]*)"/);
        if (imgMatch) {
          return (
            <img
              key={index}
              src={imgMatch[1]}
              alt={imgMatch[2]}
              className="w-full h-auto rounded-lg my-6 shadow-lg"
            />
          );
        }
      }
      
      if (paragraph.trim() === '') return <br key={index} />;
      
      const isHeading = paragraph.trim().startsWith('🔥') || 
                       paragraph.trim().match(/^[A-Z][^:]+:/);
      
      return (
        <p
          key={index}
          className={`mb-4 ${
            isHeading ? 'font-bold text-lg mt-6' : 'text-muted-foreground leading-relaxed'
          }`}
        >
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <Icon name="ArrowLeft" size={16} />
            Назад
          </Button>
          <h1 className="text-xl font-bold">Контент Медиа PRO</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article>
          <div className="mb-6">
            <Badge className="mb-3">{interview.date}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{interview.title}</h1>
            <p className="text-lg text-muted-foreground">{interview.excerpt}</p>
          </div>

          <img
            src={interview.image}
            alt={interview.artist}
            className="w-full h-auto rounded-xl shadow-2xl mb-8"
          />

          <Card className="bg-card border-border mb-8">
            <CardContent className="p-6">
              <div className="prose prose-invert max-w-none">
                {formatText(interview.fullText)}
              </div>

              {interview.id === 1 && (
                <div className="mt-8 border-t border-border pt-6">
                  <iframe 
                    frameBorder="0" 
                    allow="clipboard-write" 
                    style={{border: 'none', width: '100%', height: '240px'}} 
                    width="100%" 
                    height="240" 
                    src="https://music.yandex.ru/iframe/album/36452380/track/138751085"
                    title="Яндекс.Музыка"
                  />
                </div>
              )}

              {interview.id === 2 && (
                <div className="mt-8 border-t border-border pt-6">
                  <iframe 
                    frameBorder="0" 
                    allow="clipboard-write" 
                    style={{border: 'none', width: '100%', height: '240px'}} 
                    width="100%" 
                    height="240" 
                    src="https://music.yandex.ru/iframe/album/38582527/track/143848317"
                    title="Яндекс.Музыка"
                  />
                </div>
              )}

              <div className="mt-6 flex items-center gap-4 pt-6 border-t border-border">
                <a
                  href={interview.vkLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-[#0077FF] hover:bg-[#0066DD] transition-colors rounded-xl text-white font-medium"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.785 16.241s.288-.032.436-.193c.136-.148.131-.425.131-.425s-.019-1.298.574-1.489c.584-.188 1.336 1.254 2.132 1.808.602.419 1.06.327 1.06.327l2.128-.03s1.113-.07.585-.959c-.043-.073-.308-.659-1.588-1.863-1.34-1.26-1.16-1.057.454-3.239.982-1.328 1.375-2.137 1.252-2.484-.117-.331-.84-.244-.84-.244l-2.396.015s-.178-.025-.309.056c-.128.079-.21.263-.21.263s-.377.1-.9 2.09c-.552 2.099-1.607 4.403-1.799 4.017-.447-1.068-.327-4.286-.327-4.286s.01-.682-.215-.988c-.187-.254-.528-.335-.678-.355-.378-.05-1.395-.007-2.458.014-1.364.027-.904.405-.904.405s.461.087.631.614c.224.695.216 2.257.216 2.257s.129 2.528-.301 2.841c-.294.215-.697-.224-1.562-2.236-.443-.961-.778-2.024-.778-2.024s-.064-.159-.18-.244c-.14-.104-.336-.137-.336-.137l-2.276.014s-.342.01-.468.161c-.112.134-.009.411-.009.411s1.769 4.207 3.771 6.326c1.835 1.943 3.918 1.816 3.918 1.816h.945z" fill="white"/>
                  </svg>
                  Подписаться в ВК
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <Icon name="Home" size={18} />
              Вернуться на главную
            </Button>
          </div>
        </article>
      </main>

      <AudioPlayer 
        isPlaying={isPlaying}
        currentTrack={currentTrack}
        onTogglePlay={togglePlay}
      />
    </div>
  );
}
