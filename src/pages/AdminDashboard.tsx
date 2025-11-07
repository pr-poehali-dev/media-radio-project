import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Interview {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  audioUrl: string;
  duration: string;
  publishedAt: string;
  description: string;
}

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
}

const API_BASE = 'https://functions.poehali.dev';
const INTERVIEWS_URL = `${API_BASE}/b6d79023-63bc-4221-a0dc-e8ca92218ef5`;
const UPLOAD_URL = `${API_BASE}/e34e61ca-8ab7-40b5-8c53-6a01c400868e`;

export default function AdminDashboard({ token, onLogout }: AdminDashboardProps) {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    imageUrl: '',
    audioUrl: '',
    duration: '',
    description: ''
  });

  const loadInterviews = async (search = '') => {
    try {
      const url = search 
        ? `${INTERVIEWS_URL}?search=${encodeURIComponent(search)}`
        : INTERVIEWS_URL;
      
      const response = await fetch(url);
      const data = await response.json();
      setInterviews(data.interviews || []);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить интервью',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInterviews();
  }, []);

  const handleSearch = () => {
    loadInterviews(searchQuery);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        
        const response = await fetch(UPLOAD_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Token': token
          },
          body: JSON.stringify({
            image: base64,
            fileType: file.type
          })
        });

        const data = await response.json();
        
        if (response.ok) {
          setFormData({ ...formData, imageUrl: data.url });
          toast({
            title: 'Успешно',
            description: 'Фото загружено'
          });
        } else {
          throw new Error(data.error);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить фото',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId 
        ? { ...formData, id: editingId }
        : formData;

      const response = await fetch(INTERVIEWS_URL, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': token
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: editingId ? 'Интервью обновлено' : 'Интервью добавлено'
        });
        resetForm();
        loadInterviews();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить интервью',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (interview: Interview) => {
    setFormData({
      name: interview.name,
      role: interview.role,
      imageUrl: interview.imageUrl,
      audioUrl: interview.audioUrl,
      duration: interview.duration,
      description: interview.description
    });
    setEditingId(interview.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить это интервью?')) return;

    try {
      const response = await fetch(`${INTERVIEWS_URL}?id=${id}`, {
        method: 'DELETE',
        headers: {
          'X-Admin-Token': token
        }
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Интервью удалено'
        });
        loadInterviews();
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить интервью',
        variant: 'destructive'
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      imageUrl: '',
      audioUrl: '',
      duration: '',
      description: ''
    });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Управление интервью</h1>
          <div className="flex gap-2">
            <Button onClick={onLogout} variant="outline" size="sm">
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
            <Button onClick={() => window.location.href = '/'} variant="outline" size="sm">
              <Icon name="Home" size={16} className="mr-2" />
              На главную
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>{isEditing ? 'Редактировать' : 'Новое интервью'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Сергей Собянин"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Должность</label>
                  <Input
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Мэр Москвы"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Фото</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  {formData.imageUrl && (
                    <img src={formData.imageUrl} alt="Preview" className="mt-2 w-full h-32 object-cover rounded" />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Аудио URL</label>
                  <Input
                    value={formData.audioUrl}
                    onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                    placeholder="https://..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Длительность</label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="45:30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Описание</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Краткое описание интервью"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1" disabled={isUploading}>
                    {isEditing ? 'Обновить' : 'Добавить'}
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

          <div className="lg:col-span-2">
            <Card className="mb-4">
              <CardContent className="pt-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Поиск по имени или должности..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button onClick={handleSearch}>
                    <Icon name="Search" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {isLoading ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Загрузка...</p>
                </CardContent>
              </Card>
            ) : interviews.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Интервью не найдены</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {interviews.map((interview) => (
                  <Card key={interview.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img 
                          src={interview.imageUrl} 
                          alt={interview.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{interview.name}</h3>
                          <p className="text-sm text-muted-foreground">{interview.role}</p>
                          <p className="text-sm text-muted-foreground mt-1">{interview.duration}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(interview)}>
                            <Icon name="Pencil" size={14} />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(interview.id)}>
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
