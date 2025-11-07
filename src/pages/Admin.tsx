import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Interview {
  id: number;
  artist: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  vkLink: string;
  publishedAt: Date;
  initialViews: number;
  viewsPerHour: number;
  images: string[];
  yandexMusic: string;
  fullText: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuth') === '06243020kako';
  });
  const [password, setPassword] = useState('');
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<Partial<Interview>>({
    id: Date.now(),
    artist: '',
    title: '',
    date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
    excerpt: '',
    image: '',
    vkLink: '',
    publishedAt: new Date(),
    initialViews: 0,
    viewsPerHour: 1,
    images: [],
    yandexMusic: '',
    fullText: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '06243020kako') {
      localStorage.setItem('adminAuth', password);
      setIsAuthenticated(true);
    } else {
      alert('Неверный пароль');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setPassword('');
  };

  useEffect(() => {
    const savedInterviews = localStorage.getItem('interviews');
    if (savedInterviews) {
      const parsed = JSON.parse(savedInterviews);
      parsed.forEach((item: any) => {
        item.publishedAt = new Date(item.publishedAt);
      });
      console.log('Загружено интервью:', parsed.length);
      console.log('Все ID:', parsed.map((i: any) => ({ id: i.id, artist: i.artist })));
      setInterviews(parsed);
    }
  }, []);

  const saveInterviews = (data: Interview[]) => {
    localStorage.setItem('interviews', JSON.stringify(data));
    setInterviews(data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newInterview: Interview = {
      id: editingId || Date.now(),
      artist: formData.artist || '',
      title: formData.title || '',
      date: formData.date || '',
      excerpt: formData.excerpt || '',
      image: formData.image || '',
      vkLink: formData.vkLink || '',
      publishedAt: formData.publishedAt || new Date(),
      initialViews: formData.initialViews || 0,
      viewsPerHour: formData.viewsPerHour || 1,
      images: formData.images || [],
      yandexMusic: formData.yandexMusic || '',
      fullText: formData.fullText || ''
    };

    if (editingId) {
      const updated = interviews.map(item => 
        item.id === editingId ? newInterview : item
      );
      saveInterviews(updated);
    } else {
      saveInterviews([...interviews, newInterview]);
    }

    resetForm();
  };

  const handleEdit = (interview: Interview) => {
    setFormData(interview);
    setEditingId(interview.id);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Удалить это интервью?')) {
      saveInterviews(interviews.filter(item => item.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      id: Date.now(),
      artist: '',
      title: '',
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      excerpt: '',
      image: '',
      vkLink: '',
      publishedAt: new Date(),
      initialViews: 0,
      viewsPerHour: 1,
      images: [],
      yandexMusic: '',
      fullText: ''
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleImageAdd = () => {
    const url = prompt('Введите URL изображения:');
    if (url) {
      setFormData({
        ...formData,
        images: [...(formData.images || []), url]
      });
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData({
      ...formData,
      images: (formData.images || []).filter((_, i) => i !== index)
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Вход в админ-панель</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Пароль</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  required
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full">
                <Icon name="Lock" size={16} className="mr-2" />
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Админ-панель: Интервью</h1>
          <div className="flex gap-2">
            <Button onClick={handleLogout} variant="outline" size="sm">
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
            <Button onClick={() => window.location.href = '/'} variant="outline">
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              На главную
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Поиск интервью</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по исполнителю или заголовку..."
                className="flex-1"
              />
              <Button 
                onClick={() => setSearchQuery('')}
                variant="outline"
                disabled={!searchQuery}
              >
                <Icon name="X" size={16} />
              </Button>
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                Всего: {interviews.length}
              </div>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {interviews
                .filter(interview => {
                  if (!searchQuery) return true;
                  const query = searchQuery.toLowerCase();
                  return interview.artist.toLowerCase().includes(query) || 
                         interview.title.toLowerCase().includes(query);
                })
                .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
                .map(interview => (
                  <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{interview.artist}</div>
                      <div className="text-sm text-muted-foreground truncate">{interview.title}</div>
                      <div className="text-xs text-muted-foreground">{interview.date} • ID: {interview.id}</div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button 
                        onClick={() => handleEdit(interview)}
                        size="sm"
                        variant="outline"
                      >
                        <Icon name="Pencil" size={14} className="mr-1" />
                        Редактировать
                      </Button>
                      <Button 
                        onClick={() => handleDelete(interview.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              {interviews.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  Нет интервью
                </div>
              )}
              {interviews.length > 0 && searchQuery && interviews.filter(interview => {
                const query = searchQuery.toLowerCase();
                return interview.artist.toLowerCase().includes(query) || 
                       interview.title.toLowerCase().includes(query);
              }).length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  Ничего не найдено
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? 'Редактировать интервью' : 'Добавить новое интервью'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">ID интервью (для якорной ссылки #id)</label>
                  <Input
                    type="number"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: parseInt(e.target.value) })}
                    placeholder="Например: 6"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Имя артиста</label>
                  <Input
                    value={formData.artist}
                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                    placeholder="Например: Иван Иванов"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Заголовок</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Например: Иван Иванов: «Музыка как терапия»"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Дата публикации</label>
                  <Input
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="5 ноября 2025"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Краткое описание (для карточки)</label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Короткое описание интервью..."
                    rows={2}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Главное изображение (URL)</label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ссылка на VK</label>
                  <Input
                    value={formData.vkLink}
                    onChange={(e) => setFormData({ ...formData, vkLink: e.target.value })}
                    placeholder="https://vk.com/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Яндекс.Музыка (iframe URL)</label>
                  <Input
                    value={formData.yandexMusic}
                    onChange={(e) => setFormData({ ...formData, yandexMusic: e.target.value })}
                    placeholder="https://music.yandex.ru/iframe/album/12345"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Дополнительные изображения</label>
                  <div className="space-y-2">
                    {(formData.images || []).map((img, index) => (
                      <div key={index} className="flex gap-2">
                        <Input value={img} readOnly />
                        <Button 
                          type="button" 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleImageRemove(index)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={handleImageAdd} className="w-full">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить изображение
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Полный текст интервью</label>
                  <Textarea
                    value={formData.fullText}
                    onChange={(e) => setFormData({ ...formData, fullText: e.target.value })}
                    placeholder="Полный текст интервью с вопросами и ответами. Используй теги: <img src='...' alt='...' class='interview-photo' /> для изображений"
                    rows={10}
                    required
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    💡 Подсказка: используй &lt;img src="URL" alt="описание" class="interview-photo" /&gt; для вставки изображений в текст
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    <Icon name="Save" size={16} className="mr-2" />
                    {isEditing ? 'Сохранить изменения' : 'Добавить интервью'}
                  </Button>
                  {isEditing && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Отмена
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Список интервью ({interviews.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {interviews.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Интервью пока нет. Добавь первое!
                  </p>
                ) : (
                  interviews.map((interview) => (
                    <div 
                      key={interview.id} 
                      className="p-4 border rounded-lg space-y-2 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary">#{interview.id}</Badge>
                            <p className="font-bold text-sm truncate">{interview.artist}</p>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{interview.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{interview.date}</p>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEdit(interview)}
                          >
                            <Icon name="Pencil" size={14} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDelete(interview.id)}
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </div>
                      {interview.image && (
                        <img 
                          src={interview.image} 
                          alt={interview.artist}
                          className="w-full h-32 object-cover rounded"
                        />
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Icon name="Info" size={18} />
                  Как использовать
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2 text-muted-foreground">
                <p>• <strong>ID</strong> — уникальный номер для якорной ссылки (например, #6)</p>
                <p>• <strong>Изображения</strong> — вставляй прямые ссылки на фото (https://...)</p>
                <p>• <strong>Яндекс.Музыка</strong> — копируй iframe URL из Яндекса</p>
                <p>• <strong>Полный текст</strong> — пиши интервью, используй &lt;img&gt; для фото внутри текста</p>
                <p>• Все интервью сохраняются в браузере (localStorage)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}