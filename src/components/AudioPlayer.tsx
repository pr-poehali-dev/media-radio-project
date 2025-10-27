import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AudioPlayerProps {
  isPlaying: boolean;
  currentTrack: string;
  onTogglePlay: () => void;
}

export default function AudioPlayer({ isPlaying, currentTrack, onTogglePlay }: AudioPlayerProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Radio" className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className={`h-2 w-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-muted'}`} />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                {isPlaying ? 'В эфире' : 'Offline'}
              </span>
            </div>
            <p className="text-sm font-medium truncate">{currentTrack}</p>
          </div>

          <Button
            onClick={onTogglePlay}
            size="icon"
            className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 flex-shrink-0"
          >
            {isPlaying ? (
              <Icon name="Pause" className="h-6 w-6" />
            ) : (
              <Icon name="Play" className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}