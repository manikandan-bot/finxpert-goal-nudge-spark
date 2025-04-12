
import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Goal } from '@/types/goals';

interface GoalAchievementsProps {
  goals: Goal[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'calendar' | 'sparkles';
  date: Date;
}

const GoalAchievements: React.FC<GoalAchievementsProps> = ({ goals }) => {
  // Generate achievements based on goals
  const generateAchievements = (goals: Goal[]): Achievement[] => {
    const achievements: Achievement[] = [];
    
    // Check for completed goals
    const completedGoals = goals.filter(goal => goal.currentAmount >= goal.targetAmount);
    completedGoals.forEach(goal => {
      achievements.push({
        id: `completed-${goal.id}`,
        title: `${goal.name} goal completed!`,
        description: `You successfully reached your target of ₹${goal.targetAmount.toLocaleString()}`,
        icon: 'trophy',
        date: new Date(),
      });
    });
    
    // Check for saving milestones
    const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
    if (totalSaved > 0) {
      achievements.push({
        id: 'savings-milestone',
        title: 'Savings Milestone',
        description: `You've successfully saved ₹${totalSaved.toLocaleString()} across all goals!`,
        icon: 'sparkles',
        date: new Date(),
      });
    }
    
    // Check for approaching goals
    const approachingGoals = goals.filter(goal => {
      const progress = goal.currentAmount / goal.targetAmount;
      return progress >= 0.8 && progress < 1;
    });
    
    approachingGoals.forEach(goal => {
      achievements.push({
        id: `approaching-${goal.id}`,
        title: 'Almost There!',
        description: `You're about to complete your ${goal.name} goal!`,
        icon: 'calendar',
        date: new Date(),
      });
    });
    
    return achievements;
  };
  
  const achievements = generateAchievements(goals);
  
  if (achievements.length === 0) {
    return null;
  }
  
  const iconMap = {
    'trophy': <Trophy className="h-6 w-6 text-amber-500" />,
    'calendar': <Calendar className="h-6 w-6 text-blue-500" />,
    'sparkles': <Sparkles className="h-6 w-6 text-purple-500" />
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          <span className="bg-gradient-to-r from-finxpert-primary to-finxpert-vivid-purple text-transparent bg-clip-text">
            🎉 Achievements
          </span>
        </h2>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {achievements.map((achievement) => (
          <motion.div 
            key={achievement.id}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
          >
            <Card className={cn(
              "p-6 overflow-hidden relative bg-gradient-to-br from-white to-finxpert-light dark:from-gray-900 dark:to-gray-800 border-finxpert-light shadow-md hover:shadow-lg transition-all duration-300",
              "after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-finxpert-primary/10 after:to-finxpert-vivid-purple/10 after:opacity-30"
            )}>
              <div className="flex items-center space-x-4 mb-3">
                <div className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-inner">
                  {iconMap[achievement.icon]}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">{achievement.title}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2 relative z-10">{achievement.description}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {achievement.date.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
              
              <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-5">
                {iconMap[achievement.icon]}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default GoalAchievements;
