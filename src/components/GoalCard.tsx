
import React, { useState } from 'react';
import { Goal } from '@/types/goals';
import { formatCurrency, calculateProgress, formatDaysRemaining, getDaysRemaining, getMotivationalMessage, needsAttention } from '@/utils/goalUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LucideIcon, AlertCircle, Calendar, Trophy, TrendingUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import GoalActions from './GoalActions';

interface GoalCardProps {
  goal: Goal;
  onUpdate: (goal: Goal) => void;
}

const iconMap: Record<string, LucideIcon> = {
  shield: AlertCircle,
  calendar: Calendar,
  trophy: Trophy,
  target: TrendingUp,
};

const GoalCard: React.FC<GoalCardProps> = ({ goal, onUpdate }) => {
  const [showActions, setShowActions] = useState(false);
  
  const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
  const daysRemaining = getDaysRemaining(goal.deadline);
  const requiresAttention = needsAttention(goal);
  const motivationalMessage = getMotivationalMessage(progress);
  
  const handleUpdate = (updatedGoal: Goal) => {
    onUpdate(updatedGoal);
    setShowActions(false);
  };
  
  return (
    <Card className="goal-card">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${requiresAttention ? 'bg-red-100' : 'bg-finxpert-soft-purple'}`}>
              {React.createElement(iconMap[goal.icon || 'target'] || TrendingUp, { 
                className: `w-5 h-5 ${requiresAttention ? 'text-red-500' : 'text-finxpert-primary'}` 
              })}
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-lg">{goal.name}</h3>
              <p className="text-sm text-gray-500">{goal.description}</p>
            </div>
          </div>
          
          {requiresAttention && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-medium">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Needs Attention
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>You're falling behind schedule. Consider increasing your savings.</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2 bg-gray-100" 
            indicatorClassName="progress-bg animate-progress-fill" 
            style={{ "--progress-width": `${progress}%` } as React.CSSProperties}
          />
        </div>
        
        <div className="flex justify-between items-center mb-4 text-sm">
          <div>
            <p className="text-gray-500">Current</p>
            <p className="font-semibold">{formatCurrency(goal.currentAmount)}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500">Target</p>
            <p className="font-semibold">{formatCurrency(goal.targetAmount)}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDaysRemaining(daysRemaining)}
          </div>
          
          {progress >= 25 && progress < 100 && (
            <Badge className="bg-finxpert-vivid-purple hover:bg-finxpert-vivid-purple/90">
              {progress >= 75 ? "Almost There!" : progress >= 50 ? "Halfway There!" : "25% Reached!"}
            </Badge>
          )}
          
          {progress >= 100 && (
            <Badge className="bg-green-600 hover:bg-green-600/90">
              Goal Reached! 🎉
            </Badge>
          )}
        </div>
        
        <div className="text-sm italic text-center mb-4 text-finxpert-secondary">
          "{motivationalMessage}"
        </div>
        
        <div className="flex space-x-2 mt-2">
          <Button 
            onClick={() => setShowActions(!showActions)} 
            className="w-full bg-finxpert-primary hover:bg-finxpert-vivid-purple"
          >
            {showActions ? "Cancel" : "Update Goal"}
          </Button>
        </div>
        
        {showActions && <GoalActions goal={goal} onUpdate={handleUpdate} />}
      </CardContent>
    </Card>
  );
};

export default GoalCard;
