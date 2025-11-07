-- Создание таблицы для интервью
CREATE TABLE IF NOT EXISTS interviews (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    audio_url TEXT NOT NULL,
    duration VARCHAR(50) NOT NULL,
    published_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индекса для поиска
CREATE INDEX IF NOT EXISTS idx_interviews_name ON interviews(name);
CREATE INDEX IF NOT EXISTS idx_interviews_published_at ON interviews(published_at DESC);

-- Вставка начальных данных из существующих интервью
INSERT INTO interviews (id, name, role, image_url, audio_url, duration, published_at, description) VALUES
(1, 'Сергей Собянин', 'Мэр Москвы', 'https://storage.yandexcloud.net/poehali-images/6747a5b31bc9a75a12d3e2cb/placeholder_1732794801552.jpg', 'https://storage.yandexcloud.net/poehali-images/6747a5b31bc9a75a12d3e2cb/audio_1732794815866.mp3', '45:30', '2024-11-20 10:00:00', 'Обсуждаем развитие Москвы, транспортную систему и планы на будущее'),
(2, 'Анна Иванова', 'Предприниматель', 'https://storage.yandexcloud.net/poehali-images/6747a5b31bc9a75a12d3e2cb/placeholder_1732794838697.jpg', 'https://storage.yandexcloud.net/poehali-images/6747a5b31bc9a75a12d3e2cb/audio_1732794815866.mp3', '32:15', '2024-11-18 14:30:00', 'История создания успешного стартапа в сфере технологий'),
(3, 'Дмитрий Петров', 'Музыкант', 'https://storage.yandexcloud.net/poehali-images/6747a5b31bc9a75a12d3e2cb/placeholder_1732794856319.jpg', 'https://storage.yandexcloud.net/poehali-images/6747a5b31bc9a75a12d3e2cb/audio_1732794815866.mp3', '28:45', '2024-11-15 16:00:00', 'Разговор о современной музыке и творческом процессе'),
(4, 'Елена Смирнова', 'Писатель', 'https://storage.yandexcloud.net/poehali-images/6747a5b31bc9a75a12d3e2cb/placeholder_1732794872063.jpg', 'https://storage.yandexcloud.net/poehali-images/6747a5b31bc9a75a12d3e2cb/audio_1732794815866.mp3', '41:20', '2024-11-12 11:15:00', 'Обсуждаем новую книгу и литературные тренды'),
(5, 'Михаил Козлов', 'Спортсмен', 'https://storage.yandexcloud.net/poehali-images/6747a5b31bc9a75a12d3e2cb/placeholder_1732794887463.jpg', 'https://storage.yandexcloud.net/poehali-images/6747a5b31bc9a75a12d3e2cb/audio_1732794815866.mp3', '36:50', '2024-11-10 09:00:00', 'История спортивных достижений и подготовки к соревнованиям');