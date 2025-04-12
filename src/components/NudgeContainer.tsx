
import React from 'react';
import { Nudge } from '@/types/goals';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, AlertCircle, Lightbulb, Trophy, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NudgeContainerProps {
  nudges: Array<Nudge & { goalName: string; goalId: string }>;
  onDismiss: (goalId: string, nudgeId: string) => void;
}

const NudgeContainer: React.FC<NudgeContainerProps> = ({ nudges, onDismiss }) => {
  // Exit early if no nudges
  if (nudges.length === 0) return null;
  
  const getNudgeIcon = (type: Nudge['type']) => {
    switch (type) {
      case 'encouragement':
        return <Heart className="h-5 w-5 text-pink-500" />;
      case 'suggestion':
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'celebration':
        return <Trophy className="h-5 w-5 text-green-500" />;
      default:
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
    }
  };
  
  const getNudgeColor = (type: Nudge['type']) => {
    switch (type) {
      case 'encouragement':
        return "bg-finxpert-soft-pink border-pink-200";
      case 'suggestion':
        return "bg-amber-50 border-amber-200";
      case 'warning':
        return "bg-red-50 border-red-200";
      case 'celebration':
        return "bg-green-50 border-green-200";
      default:
        return "bg-finxpert-soft-purple border-finxpert-light";
    }
  };
  
  return (
    <div className="mb-6 space-y-3 animate-float">
      {nudges.map((nudge) => (
        <Card 
          key={nudge.id} 
          className={cn(
            "p-4 border shadow-sm", 
            getNudgeColor(nudge.type)
          )}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              {getNudgeIcon(nudge.type)}
              <div>
                <p className="text-sm font-medium mb-1">
                  {nudge.goalName} - 
                  <span className="ml-1 text-gray-600 font-normal">
                    {nudge.type === 'encouragement' ? 'Encouragement' : 
                     nudge.type === 'suggestion' ? 'Suggestion' : 
                     nudge.type === 'warning' ? 'Warning' : 'Celebration'}
                  </span>
                </p>
                <p className="text-sm">{nudge.message}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0"
              onClick={() => onDismiss(nudge.goalId, nudge.id)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NudgeContainer;
